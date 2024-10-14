import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Entypo, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import { addToCart } from "../../../redux/CartReducer";
import { fetchItemById } from "../../BackendApis/itemsApi";
import { formatNumber } from "../../utils";

const ProductInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initial quantity set to 1 or any default value  
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const data = await fetchItemById(id);
        setItem(data.data); // Adjust according to your API response structure
      } catch (err) {
        setError('Failed to fetch item details');
      } finally {
        setLoading(false);
      }
    };

    getItemDetails();
  }, [id]);

  // Handle loading and error states
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const incrementQuantity = () => {
    // if (quantity < item.data.available) {
    setQuantity(prevQuantity => prevQuantity + 1);
    // }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };


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
    }, 6000);
  };

  // Your UI rendering logic goes here
  return (
    <ScrollView style={{ marginTop: 23, flex: 1, backgroundColor: "white" }} showsVerticalScrollIndicator={false}>
      {/* Horizontal ScrollView for Images */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {(item.productImages && item.productImages.length > 0) ? (
          item.productImages.map((imageUri, index) => (
            <ImageBackground
              key={index}
              style={{ width: 400, height: 400, marginTop: 25, marginRight: 10, resizeMode: "cover" }} // Adjust width and height as needed
              source={{ uri: imageUri }} // Use imageUri directly
            >
              {/* You can add any additional content inside the ImageBackground here */}
            </ImageBackground>
          ))
        ) : (
          <Text>No Images Available</Text> // Optional: Display a message if no images
        )}
      </ScrollView>
      <View style={styles.MainContainer}>

        <Text style={styles.separator} />
        <Text style={styles.productTitle}>{item.itemName}</Text>
        <Text style={styles.productsubDescription}>{item.description}</Text>

        <View>
          <Text style={styles.productPrice}>₹ {formatNumber(item.sellingPrice)}</Text>
        </View>

        {/* Quantity */}
        <View style={styles.topQuantityContainer}>
          <Text style={styles.sizeText}>Quantity:</Text>
          <View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity} style={styles.decrementButton}>
                <Text style={styles.buttonText}><Entypo name="minus" size={24} color="#C4CBD2" /></Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity onPress={incrementQuantity} style={styles.incrementButton}>
                <Text style={styles.buttonText}><Entypo name="plus" size={24} color="#C4CBD2" /></Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <View style={styles.BottomButton}>

          <Pressable
            // onPress={() => addItemToCart(item)}
             onPress={() => addItemToCart({ ...item, quantity })}
            style={[
              styles.addToCartButton,
              { backgroundColor: addedToCart ? "#00dd00" : "#FFAB00" } // Dynamic background color
            ]}

          // style={styles.addToCartButton}
          >
            {addedToCart ? (
              <View style={styles.addToCartBox}>
                <FontAwesome6 name="cart-plus" size={24} color="black" />
                <Text style={styles.addToCartText}> Added to Cart</Text>
              </View>
            ) : (

              <View style={styles.addToCartBox}>
                <FontAwesome6 name="cart-plus" size={24} color="black" />
                <Text style={styles.addToCartText}> Add to Cart</Text>
              </View>
            )}
          </Pressable>

          <Pressable style={styles.buyNowButton} 
          // onPress={() => navigation.navigate("Cart")}
          onPress={() => {
            addItemToCart({ ...item, quantity }); // Add item to cart
            navigation.navigate("Cart"); // Navigate to Cart screen
          }}
          >
            <Text style={styles.byeNowText}>Buy Now</Text>
          </Pressable>
        </View>
        <Text style={styles.separator} />
        {/* Other UI components */}
        <View style={styles.BottomTextContainer}>
          <View style={styles.BottomTextComponent}>
            <Entypo name="plus" size={24} color="#637381" />
            <Text style={styles.BottomText}>Compare</Text>
          </View>

          <View style={styles.BottomTextComponent}>
            <AntDesign name="heart" size={20} color="#637381" />
            <Text style={styles.BottomText}>Favorite</Text>
          </View>

          <View style={styles.BottomTextComponent}>
            <Ionicons name="share-social-sharp" size={20} color="#637381" />
            <Text style={styles.BottomText}>Share</Text>
          </View>
        </View>


        <View style={styles.BottomLastContainer}>
          <View style={styles.BottomTextLastComponent}>
            <MaterialIcons name="verified" size={40} color="#FF3030" />
            <Text style={styles.BottomLastText}>100% original</Text>
            <Text style={styles.BottomContentText}>Chocolate bar candy canes ice cream toffee cookie halvah.</Text>
          </View>

          <View style={styles.BottomTextLastComponent}>
            <MaterialCommunityIcons name="clock" size={40} color="#FF3030" />
            <Text style={styles.BottomLastText}>10 days replacement</Text>
            <Text style={styles.BottomContentText}>Marshmallow biscuit donut dragée fruitcake wafer.</Text>
          </View>

          <View style={styles.BottomTextLastComponent}>
            <MaterialIcons name="verified-user" size={40} color="#FF3030" />
            <Text style={styles.BottomLastText}>Year warranty</Text>
            <Text style={styles.BottomContentText}>Cotton candy gingerbread cake I love sugar sweet.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: 200, // Adjust height as needed
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  MainContainer: {
    marginHorizontal: 20,
  },

  separator: {
    borderBottomWidth: 1, // Sets the bottom border width
    borderBottomColor: '#919eab33', // Sets the bottom border color
    borderStyle: 'dashed', // Sets the bottom border style to dashed
  },

  productsubDescription: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#637381",

  },
  productTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },

  productPrice: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
    color: "#1C252E",
  },


  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    // marginLeft: 10,
    // marginRight: 10,
    gap: 22,

    borderWidth: 1, // Sets the bottom border width
    borderColor: '#EAECEE', // Sets the bottom border color
    borderRadius: 5,
  },
  quantityText: {
    color: "#283039",
    fontSize: 18,
  },

  topQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    // padding: 10,
    // marginLeft: 10,
    // marginRight: 10,
  },


  addToCartButton: {
    backgroundColor: "#FFAB00",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
    marginVertical: 10,
    width: "48%",
    height: 55,
    gap: 10,
  },
  buyNowButton: {
    backgroundColor: "#1C252E",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
    marginVertical: 10,
    width: "48%",
    height: 55,
  },
  addToCartBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  addToCartText: {
    marginBottom: 2,
    fontSize: 17,
    fontWeight: "700",
  },
  byeNowText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  BottomButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  BottomTextComponent: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  BottomText: {
    color: "#637381",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 3,
  },

  sizeText: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 15,
  },

  BottomTextContainer: {
    marginTop: 20,
    // marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    // justifyContent: "space-evenly"
  },

  BottomLastContainer: {
    marginTop: 20,
    marginBottom: 20,
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "space-evenly"
  },

  BottomTextLastComponent: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  BottomLastText: {
    // color: "#637381",
    fontSize: 25,
    fontWeight: "500",
    // marginBottom: 3,
  },
  BottomContentText: {
    color: "#637381",
    fontSize: 15,
    // fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
  },
});
