import { configureStore } from '@reduxjs/toolkit'
import bankSlice  from './Slices/bankslice'
import productSlice from './Slices/productSlice'
import Cart from "./Slices/cartSlice"
import Theme from "./Slices/Theme"

export const store = configureStore({
    reducer: {
        bank: bankSlice,
        products: productSlice,
        Cart:Cart,
        isDark:Theme

    },
})