import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
import Toast from 'react-native-toast-message';

const ProductItem = ({ item }) => {
  
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));

     // Show a toast notification
     Toast.show({
      text1: `Product added to cart!`,
      position: 'bottom',
      type: 'success', // Can be 'success', 'error', 'info', or 'normal'
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });

    
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={[
          styles.button,
          { backgroundColor: addedToCart ? "#00dd00" : "#FFC72C" } // Dynamic background color
        ]}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({

button: {
  padding: 10,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 10,
  marginTop: 10,
},
buttonText: {
  color: "white", // Set text color for visibility
},
});