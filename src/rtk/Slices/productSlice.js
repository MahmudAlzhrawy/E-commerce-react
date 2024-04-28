import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const url = "https://fakestoreapi.com/products"
export const fetchdata = createAsyncThunk("productSlice/fetchdata", async() => {
    
    const res = await fetch(url);
    const data = await res.json();
    return data;
    
})
export const showcategory = createAsyncThunk("productslice/showcategory", async (cat) => {
   
    const res = await fetch(`${url}/category/${cat}`);
    const data = res.json();
    return data;
})
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
const mergeProducts = (localProducts, apiProducts) => {
    // يمكنك هنا تنفيذ أي استراتيجية دمج تناسب تطبيقك
    // في هذا المثال، سنقوم بدمج البيانات مباشرة بدون فحص للتكرار
    return apiProducts.concat(localProducts);
};
const productSlice = createSlice({
    initialState:[],
    name: "productSlice",
    reducers: {
        addNewProduct:(state,action)=>{
            const findProduct = state.find((product) => product.title === action.payload.title);
            if (!findProduct) {
                state.push(action.payload);
                const productsFromLocalStorage = localStorage.getItem("newProducts");
                let updatedProducts = [];
                if (productsFromLocalStorage) {
                    updatedProducts = JSON.parse(productsFromLocalStorage);
                }
                updatedProducts.push(action.payload);
                localStorage.setItem("newProducts", JSON.stringify(updatedProducts));
            
                // Show success toast
                Toast.fire({
                    icon: "success",
                    title: "New product added successfully"
                });
            } else {
                // Show warning toast if product already exists
                Toast.fire({
                    icon: "warning",
                    title: "Another product with the same title already exists"
                });
            }
        },
        deleteProduct: (state, action) => {
            const productToDelete = state.find((product) => product.id === action.payload.id);
            if (productToDelete) {
                state = state.filter((product) => product.id !== action.payload.id);
                localStorage.setItem("newProducts", JSON.stringify(state));
                Toast.fire({
                    icon: "success",
                    title: "Deleted !"
                });
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchdata.fulfilled, (state, action) =>
        {
            const localProducts = JSON.parse(localStorage.getItem("newProducts"))
            if(localProducts){
                const mergedProducts = mergeProducts(localProducts, action.payload);
                return mergedProducts;

            } else{
                return action.payload;
            }
            // تحديث حالة Redux بالبيانات المدموجة
            
        });
        builder.addCase(showcategory.fulfilled, (state, action) => {
            return (action.payload);
        });
    
    
    }
})
export const {addNewProduct, deleteProduct} = productSlice.actions;
export default productSlice.reducer