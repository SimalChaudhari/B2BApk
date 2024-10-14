import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Network from 'expo-network';
import { useSelector } from 'react-redux';
import HomeScreen from '../src/screens/Home/HomeScreen';
import CartScreen from '../src/screens/products/CartScreen';
import AddressScreen from '../src/screens/auth/AddressScreen';
import AddAddressScreen from '../src/screens/auth/AddAddressScreen';
import ConfirmationScreen from '../src/screens/auth/ConfirmationScreen';
import OrderScreen from '../src/screens/products/OrderScreen';
import ProfileScreen from '../src/screens/auth/ProfileScreen';
import LoginScreen from '../src/screens/auth/LoginScreen';
import RegisterScreen from '../src/screens/auth/RegisterScreen';
import ProductInfoScreen from '../src/screens/products/ProductInfoScreen';
import OTPVerification from '../src/screens/auth/OTPVerification';
import NoInternetScreen from '../src/screens/NoInternet/NoInternetScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
    const cart = useSelector((state) => state.cart.cart); // Access the cart state
    const [isConnected, setIsConnected] = useState(true); // Track network status

    // Calculate total quantity for cart badge
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Check network status
    useEffect(() => {
        const checkNetwork = async () => {
            const networkState = await Network.getNetworkStateAsync();
            setIsConnected(networkState.isConnected);
        };
        checkNetwork();
    }, []);

    // Redirect to NoInternetScreen if not connected
    if (!isConnected) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NoInternet"
                        component={NoInternetScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            focused ? (
                                <Ionicons name="home" size={26} color="black" />
                            ) : (
                                <Ionicons name="home-outline" size={26} color="black" />
                            )
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Shop",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            focused ? (
                                <Ionicons name="storefront-sharp" size={26} color="black" />
                            ) : (
                                <Ionicons name="storefront-outline" size={26} color="black" />
                            )
                        ),
                    }}
                />

                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ position: 'relative' }}>
                                <Ionicons
                                    name={focused ? "cart" : "cart-outline"}
                                    size={32}
                                    color="black"
                                />
                                {totalQuantity > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{totalQuantity}</Text>
                                    </View>
                                )}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddAddress"
                    component={AddressScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddAddressScreen"
                    component={AddAddressScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Info"
                    component={ProductInfoScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OTPVerification"
                    component={OTPVerification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Confirm"
                    component={ConfirmationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Order"
                    component={OrderScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -8,
        top: -8,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        minHeight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
