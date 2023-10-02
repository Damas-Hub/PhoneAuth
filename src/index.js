import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import CountryPicker from "react-native-country-picker-modal";

const Otp = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const fullPhoneNumber = `+${selectedCountry.callingCode}${phoneNumber}`; // Combine country code and phone number
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(fullPhoneNumber, recaptchaVerifier.current)
      .then((verificationId) => setVerificationId(verificationId))
      .catch((error) => {
        // Error handling
        console.log("Error sending verification:", error);
      });
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
        Alert.alert("Login successful. Welcome to Homepage");
      })
      .catch((error) => {
        // Error handling
        console.log("Error confirming verification code:", error);
        alert("Error confirming verification code.");
      });
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.otpText}>Login Using OTP</Text>
      <View style={styles.countryPickerContainer}>
        <CountryPicker
          withFlag
          withFilter
          withCountryNameButton
          withAlphaFilter
          withCallingCode
          countryCode={selectedCountry ? selectedCountry.cca2 : "US"} // Default to US
          onSelect={(country) => setSelectedCountry(country)}
          theme={{
            backgroundColor: "#fff", // Set background color to white
            primaryColor: "#000", // Set primary color to black
            onBackgroundTextColor: "#000", // Set text color to black
            onPrimaryColor: "#fff", // Set primary color to white
          }}
        />
      </View>
      <TextInput
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.sendVerification}
        onPress={sendVerification}
      >
        <Text style={styles.buttonText}>Send Verification</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Confirm Code"
        onChangeText={setCode}
        keyboardType="number-pad"
        autoCompleteType="tel"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm Verification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  countryPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingHorizontal: 10,
    fontSize: 24,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    color: "#fff",
    marginBottom: 20,
  },
  sendVerification: {
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  otpText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    margin: 20,
  },
});
