import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addNewProduct, deleteProduct } from "../rtk/Slices/productSlice";
function AddNewProduct(){
    const[items,setItems]=useState([]);
    const[title,setTitle]=useState("");
    const[price,setPrice]=useState(0);
    const[description,setDescription]=useState("");
    const[imageUrl,setImageUrl]=useState("");
    const[id,setID]=useState(21)
    const dispatch=useDispatch();
    const get=()=>{const getprod=localStorage.getItem("newProducts")
    if (getprod) {
        setItems(JSON.parse(getprod));
        console.log(JSON.parse(getprod).length); // Use JSON.parse(getprod).length to get the length of the parsed array
       setID(len=> len + (JSON.parse(getprod).length)); // Set ID after setting items
    }
}
    useEffect(()=>{
    get();
    },[])
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
      //  setID(items.length());
    const handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            title: title,
            price: price,
            description: description,
            image: imageUrl,
            id:id,
            rating:{
                rate:3.3
            }
        };
        const found= items.find((product)=>product.title===title);
        if(!found){ 
            setID(prev=> prev+1)
            dispatch(addNewProduct(newProduct));
        }else{
            Toast.fire({
                icon: "warning",
                title: "It find other product with the same title"
            });
            
        }
    
    };
    
        return(<>
        <div className="All grid grid-cols-3 ">
        <div className="fun grid  mt-20">
        <h3>hello</h3>
        </div>
        <div className="mt-16 w-full  mb-5 h-full bg-slate-200 col-span-2 " >
        <form  onSubmit={handleSubmit} className= "mt-6 ml-5 grid grid-cols-3 " >
            <input className="   mt-2 text-left border-2 w-4/5 border-red-800 py-3  " placeholder="Product Title" type="text" onChange={(event) => {
                setTitle(event.target.value);
            }} />
            <input className="    mt-2 text-left border-2 w-4/5 border-red-800 py-3 col-span-2 " placeholder="Image URL" type="text" onChange={(event) => {
                setImageUrl(event.target.value);
            }} />
            <input className="  col-span-3   mt-2 text-left  border-2 w-4/5 border-red-800 py-3  "  placeholder="Product Description" type="text" onChange={(event) => {
                setDescription(event.target.value);
            }} />
                <input className="   mt-2 text-left border-2 w-4/5 border-red-800  h-14 " placeholder="Product Price" type="number" onChange={(event) => {
                    setPrice(event.target.value);
                }} />
            <button className="text-gray-300 mt-2 rounded-md h-14 bg-slate-950" type="submit">AddProduct+</button>
        </form>
        </div>
        </div>
        
        </>)
}
export default AddNewProduct;