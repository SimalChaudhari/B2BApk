import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/cssFile';
import { setUser } from '../../../redux/authReducer';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const OTPVerification = ({ route, navigation }) => {
    const { email } = route.params; // Retrieve the email passed from the RegistrationScreen
    const [otp, setOtp] = useState(''); // State for OTP input
    const [loading, setLoading] = useState(false); // State for verifying OTP
    const [resendLoading, setResendLoading] = useState(false); // State for resending OTP
    const [timer, setTimer] = useState(30); // Timer state for OTP validity
    const [resendDisabled, setResendDisabled] = useState(true); // State to manage resend button

    const dispatch = useDispatch(); // Redux dispatch for user state management

    // Start timer for 30 seconds
    useEffect(() => {
        if (timer > 0) {
            const timerId = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timerId); // Cleanup interval on unmount
        } else {
            setResendDisabled(false); // Enable resend button after 30 seconds
        }
    }, [timer]);

    // Function to handle OTP verification
    const handleVerifyOTP = async () => {
        if (!otp) {
            Toast.show({
                type: 'error',
                text1: 'Input Error',
                text2: 'OTP is required.',
            });
            return; // Exit the function if the OTP field is empty
        }

        setLoading(true); // Set loading to true while verifying OTP

        // Send a POST request to verify the OTP
        try {
            const response = await axios.post("http://192.168.1.112:8181/verify-otp", { email, otp });
            console.log("API Response:", response.data);

            const { token, user, user_id } = response.data; // Destructure token and user from response

            // Store user data and token in AsyncStorage
            await AsyncStorage.setItem("authToken", token);
            await AsyncStorage.setItem("userId", user_id);
            await AsyncStorage.setItem("userData", JSON.stringify(user)); // Store the user data
            dispatch(setUser(user)); // Dispatch user data to Redux

            // Display a success message
            Toast.show({
                type: 'success',
                text1: 'Verification Successful',
                text2: 'Your OTP has been verified successfully.',
            });

            // Navigate to Home screen or another appropriate screen
            navigation.navigate('Home'); // Adjust as necessary
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Verification Error',
                text2: 'Enter Correct OTP.',
            });
        } finally {
            setLoading(false); // Reset loading state after API call
        }
    };

    // Function to resend OTP
    const handleResendOTP = async () => {
        setResendLoading(true); // Set loading to true while resending
        setResendDisabled(true); // Disable resend button

        try {
            const response = await axios.post("http://192.168.1.112:8181/resend-otp", { email });
            console.log(response);
            Toast.show({
                type: 'success',
                text1: 'OTP Resent',
                text2: 'A new OTP has been sent to your email.',
            });
            setTimer(30); // Reset timer when resending OTP
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Resend Error',
                text2: 'An error occurred while resending the OTP.',
            });
        } finally {
            setResendLoading(false); // Reset loading state after API call
            setResendDisabled(false); // Enable resend button after process is done
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>OTP Verification</Text>

            {/* OTP Input */}
            <View style={styles.inputContainer}>
                <FontAwesome5 name="lock" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={setOtp} // Update the OTP state
                />
            </View>

            {/* Verify Button */}
            <>
                {resendLoading ? (
                    <Text>Sending you new OTP on Email.</Text>
                ) : (
                    <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleVerifyOTP} disabled={loading || resendLoading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Verify OTP</Text>
                        )}
                    </TouchableOpacity>
                )}
            </>
            {/*<TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleVerifyOTP} disabled={loading || resendLoading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Verify OTP</Text>
                )}
            </TouchableOpacity>*/}

            {/* Timer Display */}
            <Text style={{ marginVertical: 10 }}>
                {timer > 0 ? `Resend OTP in ${timer} seconds` : ""}
            </Text>

            {/* Conditionally render the Resend OTP Button */}
            {timer === 0 && (
                <Text
                    style={[ { marginTop: 10 }]} // Add some margin for the button
                    onPress={handleResendOTP}
                    disabled={loading || resendLoading} // Disable if either loading state is true
                >
                    {resendLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.ResendButtonText}>Resend OTP</Text>
                    )}
                </Text>
            )}
        </View>
    );
};

export default OTPVerification;
