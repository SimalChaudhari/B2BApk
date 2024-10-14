import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddresses } from "../../../redux/authReducer"; // Adjust the import path as necessary
import Entypo from "react-native-vector-icons/Entypo";
import Toast from "react-native-toast-message";
import styles from "../../assets/cssFile";

const AddAddressScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const userId = user?._id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    houseNo: "",
    landmark: "",
    street: "",
    mobileNo: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [focus, setFocus] = useState({}); // State to manage focus of inputs

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://192.168.1.112:8181/addresses/${userId}`);
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const handleAddAddress = async () => {
    const isEmptyField = Object.values(newAddress).some(field => field.trim() === '');

    if (isEmptyField) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields',
      });
      return; // Prevent submission if any field is empty
    }

    setLoading(true); // Set loading to true when starting the add address process

    try {
      const response = await axios.post("http://192.168.1.112:8181/addresses", {
        userId,
        address: newAddress,
      });
      console.log(response.data.message);

      const addressesResponse = await axios.get(`http://192.168.1.112:8181/addresses/${userId}`);
      const updatedAddresses = addressesResponse.data.addresses;

      // Dispatch the updated addresses to the authReducer
      dispatch(updateUserAddresses(updatedAddresses)); // Use the new action

      fetchAddresses(); // Refresh the addresses after adding a new one
      setNewAddress({
        name: '',
        houseNo: '',
        landmark: '',
        street: '',
        mobileNo: '',
        city: '',
        country: '',
        postalCode: '',
      }); // Clear the form

      // Show success message
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Address added successfully!',
      });

      // Navigate back after a delay to allow the toast to show
      setTimeout(() => {
        navigation.navigate('Confirm');
      }, 1000); // Delay for 1 second (optional)

    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleError = (error) => {
    if (error.response) {
      console.log("Error adding address:", error.response.data);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Failed to add address: ${error.response.data.message || 'Please try again.'}`,
      });
    } else if (error.request) {
      console.log("No response received:", error.request);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No response from the server. Please check your network connection and try again.',
      });
    } else {
      console.log("Error setting up request:", error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Unexpected error: ${error.message}`,
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View style={{ padding: 10 }}>
        <Text style={styles.heading}>Add Your Address</Text>

        {/* Add Address Form */}
        <View style={styles.form}>
          <TextInput
            label="Name"
            value={newAddress.name}
            onFocus={() => setFocus({ ...focus, name: true })}
            onBlur={() => setFocus({ ...focus, name: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            theme={{
              colors: {
                primary: focus.name ? 'orange' : '#000', // Change primary color on focus
                text: focus.name ? '#6200ee' : '#000', // Change text color on focus
                placeholder: focus.name ? '#6200ee' : '#000', // Change placeholder color on focus
                underlineColor: 'transparent',
                background: 'white', // Optional, set background color if needed
              },
            }}
          />
          <TextInput
            label="House No"
            value={newAddress.houseNo}
            onFocus={() => setFocus({ ...focus, houseNo: true })}
            onBlur={() => setFocus({ ...focus, houseNo: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, houseNo: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            theme={{
              colors: {
                primary: focus.houseNo ? 'orange' : '#000',
                text: focus.houseNo ? '#6200ee' : '#000',
                placeholder: focus.houseNo ? '#6200ee' : '#000',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
          />
          <TextInput
            label="Landmark"
            value={newAddress.landmark}
            onFocus={() => setFocus({ ...focus, landmark: true })}
            onBlur={() => setFocus({ ...focus, landmark: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, landmark: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            theme={{
              colors: {
                primary: focus.landmark ? 'orange' : '#000',
                text: focus.landmark ? '#6200ee' : '#000',
                placeholder: focus.landmark ? '#6200ee' : '#000',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
          />
          <TextInput
            label="Street"
            value={newAddress.street}
            onFocus={() => setFocus({ ...focus, street: true })}
            onBlur={() => setFocus({ ...focus, street: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            theme={{
              colors: {
                primary: focus.street ? 'orange' : '#000',
                text: focus.street ? '#6200ee' : '#000',
                placeholder: focus.street ? '#6200ee' : '#000',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
          />
          <TextInput
            label="Mobile No"
            value={newAddress.mobileNo}
            onFocus={() => setFocus({ ...focus, mobileNo: true })}
            onBlur={() => setFocus({ ...focus, mobileNo: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, mobileNo: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            keyboardType="phone-pad"
            theme={{
              colors: {
                primary: focus.mobileNo ? 'orange' : '#000',
                text: focus.mobileNo ? '#6200ee' : '#000',
                placeholder: focus.mobileNo ? '#6200ee' : '#000',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
          />
          <TextInput
            label="City"
            value={newAddress.city}
            onFocus={() => setFocus({ ...focus, city: true })}
            onBlur={() => setFocus({ ...focus, city: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            theme={{
              colors: {
                primary: focus.city ? 'orange' : '#000',
                text: focus.city ? '#6200ee' : '#000',
                placeholder: focus.city ? '#6200ee' : '#000',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
          />
          <TextInput
            label="Country"
            value={newAddress.country}
            onFocus={() => setFocus({ ...focus, country: true })}
            onBlur={() => setFocus({ ...focus, country: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, country: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            theme={{
              colors: {
                primary: focus.country ? 'orange' : '#000',
                text: focus.country ? '#6200ee' : '#000',
                placeholder: focus.country ? '#6200ee' : '#000',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
          />
          <TextInput
            label="Postal Code"
            value={newAddress.postalCode}
            onFocus={() => setFocus({ ...focus, postalCode: true })}
            onBlur={() => setFocus({ ...focus, postalCode: false })}
            onChangeText={(text) => setNewAddress({ ...newAddress, postalCode: text })}
            mode="outlined"
            style={styles.AddAddressinput}
            keyboardType="numeric"
            theme={{
              colors: {
                primary: focus.postalCode ? 'orange' : '#000',
                text: focus.postalCode ? '#6200ee' : '#000',
                placeholder: focus.postalCode ? '#20ee' : '#000',
                underlineColor: 'transparent',
                background: 'white',
              },
            }}
          />

          <Pressable style={styles.addButton} onPress={handleAddAddress} disabled={loading}>
            <Text style={styles.addButtonText}>
              {loading ? "Adding..." : "Add Address"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

// const styles = StyleSheet.create({
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   form: {
//     marginVertical: 20,
//   },
//   AddAddressinput: {
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#6200ee",
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });
