import React ,{useState}from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {  deleteProduct } from "../rtk/Slices/productSlice";
function Delete(){
    const[items,setItems]=useState([]);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[imageUrl,setImageUrl]=useState("");
    const[id,setID]=useState(0)
    const dispatch=useDispatch();
    const get=()=>{const getprod=localStorage.getItem("newProducts")
    if (getprod) {
        setItems(JSON.parse(getprod));
        console.log(JSON.parse(getprod).length); // Use JSON.parse(getprod).length to get the length of the parsed array
        //setID(JSON.parse(getprod).length); // Set ID after setting items
    }
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
    const del= () => {
        get();
        const newProduct = {
            title: title,
            description: description,
            image: imageUrl,
            id:id,
        };
        const found= items.find((product)=>product.id === id);
        if(found){
        dispatch(deleteProduct(newProduct));
        }else{
            Toast.fire({
                icon: "warning",
                title: "Not found"
            });
        }
    
    };
    return(<>
    <div className="All grid grid-cols-3 ">
        <div className="fun grid  mt-20">
        </div>
        <div className="mt-16 w-full  mb-5 h-full bg-slate-200 col-span-2 " >
        <form  onSubmit={del} className= "mt-6 ml-5 grid grid-cols-3 " >
            <input className="   mt-2 text-left border-2 w-4/5 border-red-800 py-3  " placeholder="Product Title" type="text" onChange={(event) => {
                setTitle(event.target.value);
            }} />
            <input className="    mt-2 text-left border-2 w-4/5 border-red-800 py-3 col-span-2 " placeholder="Image URL" type="text" onChange={(event) => {
                setImageUrl(event.target.value);
            }} />
            <input className="  col-span-3   mt-2 text-left  border-2 w-4/5 border-red-800 py-3  "  placeholder="Product Description" type="text" onChange={(event) => {
                setDescription(event.target.value);
            }} />
                <input className="   mt-2 text-left border-2 w-4/5 border-red-800  h-14 " placeholder="Product id" type="number" onChange={(event) => {
                    setID(event.target.value);
                }} />
            <button className="text-gray-300 mt-2 rounded-md h-14 bg-slate-950" type="submit">Delete</button>
        </form>
        </div>
        </div>
    </>)
}
export default Delete;