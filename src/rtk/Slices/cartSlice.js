import { createSlice } from "@reduxjs/toolkit";
import { collection,addDoc } from "firebase/firestore";
import{dbc} from "../../Firebase-cartitems"
import { auth } from "../../firebase-config";
import Swal from "sweetalert2";
const prodref= collection(dbc,"cartProducts")

const ADD = async(prod)=>{
await addDoc(prodref,{title:prod.title ,image:prod.image,price:prod.price,quntity:prod.Quntity,Id:prod.id,count:1,user:{Name:auth.currentUser.displayName ,userID:auth.currentUser.uid}})
console.log("success add to firebase");
}
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
    }
});
//const items=localStorage.getItem('Cart') !== null? JSON.parse(localStorage.getItem("Cart")):[]
const cartSlice = createSlice({
    
    initialState: [],
    name: "Cart",
    
    reducers: {
        
        addToCart: (state, action) => {
            const findproduct = state.find((product) => product.id === action.payload.id);
            if (!findproduct) {
                const Newproduct = { ...action.payload, Quntity: 1 }
                state.push(Newproduct)
                ADD(Newproduct)
                Toast.fire({
                    icon: "success",
                    title: "Add in successfully"
                });
            }
            else {
                findproduct.Quntity++;
            }
            
            //localStorage.setItem('Cart', JSON.stringify(state))
        },
        incrase: (state, action) => {
        const ubdate= state.map(product => {
            if (product.id === action.payload.id) {
                return {
                    ...product,
                    Quntity: product.Quntity + 1
                };
            }
                return product;
        });
            localStorage.setItem('Cart', JSON.stringify(state));
            return ubdate;    
        },
        
        decrase: (state, action) => {
        const update=state.map(product => {
        if (product.id === action.payload.id && product.Quntity > 1) {
            return {
                ...product,
                Quntity : product.Quntity - 1
            };
        }
            return product;
        });
        localStorage.setItem('Cart', JSON.stringify(update));
            return update;  
    
        },
        deleteFromCart: (state,action) => {
        return  state.filter((product) => product.id !== action.payload.id)
        },
        Clear: (state, action) => {
            state=[] ;
            localStorage.setItem('Cart', JSON.stringify(state));
        }
    }

})

export const { addToCart, deleteFromCart, Clear, decrase,incrase } = cartSlice.actions;
export default cartSlice.reducer;