import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/cssFile';
import { setUser } from '../../../redux/authReducer';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const [isEmailInvalid, setIsEmailInvalid] = useState(false); // State

    // Check login status when component mounts
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main");
                }
            } catch (err) {
                console.log("Error checking login status:", err);
            }
        };
        checkLoginStatus();
    }, [navigation]);

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return emailRegex.test(email);
    };

    // Handle login
    const handleLogin = async () => {
        // Clear previous errors
        setIsEmailInvalid(false); // Reset email validation state

        if (!email) {
            // Alert.alert("Input Error", "Email is required.");
            Toast.show({
                type: 'error',
                text1: 'Input Error',
                text2: 'Email is required.',
            });
            return; // Exit if the email is empty
        }

        if (!validateEmail(email)) {
            Toast.show({
                type: 'error',
                text1: 'Input Error',
                text2: 'Invalid email format.',
            });
            setIsEmailInvalid(true); // Set email validation state if format is invalid
            return; // Exit if the email format is invalid
        }

        const userData = { email };
        console.log('Attempting to login with:', userData); // Log the user object
        setLoading(true); // Set loading to true

        try {
            const response = await axios.post("http://192.168.1.112:8181/login", userData);
            console.log('Response data:', response.data); // Log the response data

            const { token, user } = response.data; // Correctly destructure response

            // Check if token and user data are valid
            if (token && user) {
                // Instead of storing data directly in AsyncStorage,
                // navigate to the OTP verification page
                navigation.navigate("OTPVerification", {
                    userId: user._id, // Pass user ID for OTP verification
                    email: email, // Pass email for reference
                });
            } else {
                throw new Error('Invalid response data'); // Handle invalid response
            }
        } catch (error) {
            console.error("Login error:", error?.response ? error?.response?.data : error?.message);
            // Alert.alert("Login Error", "Invalid Email or Phone Number.");
            setIsEmailInvalid(true); // Set email validation state if format is invalid
            Toast.show({
                type: 'error',
                text1: 'Login Error',
                text2: 'Invalid Email or Phone Number.',
            });
        } finally {
            setLoading(false); // Reset loading state after API call
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Your Logo</Text>

            {/* Email Input */}
            <View 
            // style={styles.inputContainer}
            style={[styles.inputContainer, isEmailInvalid ? { borderColor: 'red', borderWidth: 1 } : {}]} // Conditional border style
            >
                <FontAwesome5 name="user-alt" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email or Phone Number"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text); // Update email state
                        if (validateEmail(text)) {
                            setIsEmailInvalid(false); // Reset invalid state if valid
                        }
                    }} // Update email state and validate
                    // onChangeText={setEmail} // Update email state
                />
            </View>

            {/* Login Button */}
            <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>


            {/* Sign Up Section */}
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>New here?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Create an account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
