import { Pressable, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'; // Import Toast
import styles from '../../assets/cssFile';

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isNameInvalid, setIsNameInvalid] = useState(false); // State for name validation
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); // State for email validation
  const [isNameTooShort, setIsNameTooShort] = useState(false); // State for name length validation

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    // Reset previous validation states
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsNameTooShort(false); // Reset name length validation

    // Validation for required fields
    // if (!userName || !email) {
    //   setIsNameInvalid(true);
    //   setIsEmailInvalid(true);
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Input Error',
    //     text2: 'Name and Email fields are required.',
    //   });
    //   return; // Exit the function if any field is empty
    // }

    // Validation for name length
    if (userName.length < 3) {
      setIsNameTooShort(true); // Set invalid name length state
      Toast.show({
        type: 'error',
        text1: 'Input Error',
        text2: 'Name must be at least 3 characters long.',
      });
      return; // Exit the function if name is too short
    }

    // Validation for email
    if (!validateEmail(email)) {
      setIsEmailInvalid(true); // Set invalid email state
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address.',
      });
      return; // Exit the function if email is invalid
    }

    const user = {
      name: userName,
      email: email,
    };

    // Set loading to true before sending the request
    setLoading(true);

    // Send a POST request to the backend API to register the user
    axios
      .post("http://192.168.1.112:8181/register", user)
      .then(async (response) => {
        console.log(response);

        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'You have been registered successfully.',
        });

        // Navigate to OTPVerification, passing the email
        navigation.navigate('OTPVerification', { email: user.email }); // Pass email to OTPVerification

        // Reset the form fields
        setUserName("");
        setEmail(""); // Reset email field
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Registration Error',
          text2: 'An error occurred while registering.',
        });
        console.log("Registration failed", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state after API call
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Create an Account</Text>

      {/* Full Name Input */}
      <View
        style={[styles.inputContainer, isNameInvalid || isNameTooShort ? { borderColor: 'red', borderWidth: 1 } : {}]} // Conditional border style for name
      >
        <FontAwesome5 name="user-alt" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          autoCapitalize="words"
          value={userName}
          onChangeText={(text) => {
            setUserName(text); // Update the name state
            if (text.trim() !== "") {
              setIsNameInvalid(false); // Reset invalid state if valid
            }
            if (text.length >= 3) {
              setIsNameTooShort(false); // Reset too short state if valid
            }
          }} // Update name state and validate
        />
      </View>

      {/* Email Input */}
      <View 
        style={[styles.inputContainer, isEmailInvalid ? { borderColor: 'red', borderWidth: 1 } : {}]} // Conditional border style for email
      >
        <Ionicons name="mail" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text); // Update the email state
            // Validate email as user types
            if (validateEmail(text)) {
              setIsEmailInvalid(false); // Reset invalid state if valid
            } else {
              setIsEmailInvalid(true); // Set invalid state if invalid
            }
          }} // Update email state and validate
        />
      </View>

      {/* Register Button */}
      <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? ( // Show loading indicator if loading is true
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </Pressable>

      {/* Sign In Section */}
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterScreen;
