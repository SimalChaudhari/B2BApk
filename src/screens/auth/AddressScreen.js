import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([
        // Example static data
        {
            name: "John Doe",
            mobileNo: "1234567890",
            houseNo: "123",
            street: "Main Street",
            landmark: "Near Park",
            city: "New York",
            country: "USA",
            postalCode: "10001",
        },
    ]);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Your Addresses</Text>

                <Pressable
                    onPress={() => navigation.navigate("AddAddressScreen")}
                    style={styles.addAddressButton}
                >
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                {addresses.length > 0 ? (
                    addresses.map((item, index) => (
                        <Pressable key={index} style={styles.addressCard}>
                            <View style={styles.addressHeader}>
                                <Text style={styles.addressName}>{item.name}</Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>

                            <Text style={styles.addressDetail}>Name: {item.name}</Text>
                            <Text style={styles.addressDetail}>
                                Mobile No: {item.mobileNo}
                            </Text>
                            <Text style={styles.addressDetail}>
                                House No: {item.houseNo}
                            </Text>
                            <Text style={styles.addressDetail}>
                                Street: {item.street}
                            </Text>
                            <Text style={styles.addressDetail}>
                                Landmark: {item.landmark}
                            </Text>
                            <Text style={styles.addressDetail}>City: {item.city}</Text>
                            <Text style={styles.addressDetail}>
                                Country: {item.country}
                            </Text>
                            <Text style={styles.addressDetail}>
                                Pin Code: {item.postalCode}
                            </Text>

                            <View style={styles.buttonGroup}>
                                <Pressable style={styles.actionButton}>
                                    <Text>Edit</Text>
                                </Pressable>
                                <Pressable style={styles.actionButton}>
                                    <Text>Remove</Text>
                                </Pressable>
                                <Pressable style={styles.actionButton}>
                                    <Text>Set as Default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))
                ) : (
                    <Text>No addresses found.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    addAddressButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 7,
        paddingHorizontal: 5,
    },
    addressCard: {
        borderWidth: 1,
        borderColor: "#D0D0D0",
        padding: 10,
        flexDirection: "column",
        gap: 5,
        marginVertical: 10,
    },
    addressHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    addressName: {
        fontSize: 15,
        fontWeight: "bold",
    },
    addressDetail: {
        fontSize: 15,
        color: "#181818",
    },
    buttonGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 7,
    },
    actionButton: {
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 0.9,
        borderColor: "#D0D0D0",
    },
});

export default AddressScreen;
