import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../../redux/authReducer'; // Adjust the import path as necessary


const ProfileScreen = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const authData = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12 }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, [navigation]);

  const checkUserLogin = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const userData = await AsyncStorage.getItem("userData");
    const storedUserId = await AsyncStorage.getItem("userId");

    if (token && storedUserId) {
      setUserId(storedUserId);
      await fetchUserProfile(storedUserId);
      await fetchOrders(storedUserId);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLogin(); // Initial check on component mount

    const unsubscribe = navigation.addListener('focus', () => {
      checkUserLogin(); // Re-check user login status when the screen is focused
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.1.112:8181/profile/${userId}`);
      const { user } = response.data;
      setUser(user);
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.1.112:8181/orders/${userId}`);
      const orders = response.data.orders;
      setOrders(orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        await axios.post('http://192.168.1.112:8181/logout', { userId });
      }

      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("userId");

      // Dispatch logout action
      dispatch(logoutAction());

      setUserId(null);
      setUser(null);
      setOrders([]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : user ? (
          user.verified ? (
            <>
              <Text style={styles.welcomeText}>Welcome, {user?.name}</Text>

              <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Your Orders</Text>
                </Pressable>

                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Your Account</Text>
                </Pressable>
              </View>

              <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Buy Again</Text>
                </Pressable>

                <Pressable onPress={logout} style={styles.button}>
                  <Text style={styles.buttonText}>Logout</Text>
                </Pressable>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <Pressable
                      style={styles.orderCard}
                      key={order._id}
                    >
                      {order.products.slice(0, 1)?.map((product) => (
                        <View style={{ marginVertical: 10 }} key={product._id}>
                          <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                          />
                        </View>
                      ))}
                    </Pressable>
                  ))
                ) : (
                  <Text style={styles.noOrdersText}>No orders found</Text>
                )}
              </ScrollView>
            </>
          ) : (
            <View style={styles.loginContainer}>
              <Text style={styles.noOrdersText}>Your account is not verified.</Text>
              <View style={styles.buttonContainer}>
                <Pressable onPress={() => navigation.navigate("Login")} style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style={styles.button}>
                  <Text style={styles.buttonText}>Register</Text>
                </Pressable>
              </View>
            </View>
          )
        ) : (
          <View style={styles.loginContainer}>
            <Text style={styles.noOrdersText}>You are not logged in</Text>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => navigation.navigate("Login")} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate("Register")} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  button: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
  },
  orderCard: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
  },
  noOrdersText: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
