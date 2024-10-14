import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import authReducer from "./redux/authReducer";

export default configureStore({
    reducer:{
        cart:CartReducer,
        auth: authReducer
    }
})