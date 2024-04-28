import React from "react";
import {auth,provider} from "../firebase-config"
import { signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import gogel from "../assets/images/G.png";
function Login({setAuth}){
    const navigate=useNavigate();
    const userLogin=()=>{
        signInWithPopup(auth,provider).then((res)=>{
            localStorage.setItem("Auth",true);
            setAuth(true);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Loggedin success",
                showConfirmButton: false,
                timer: 1200
                });
                navigate("/")
        })
        
    }
return(<>
<div className="main  shadow shadow-slate-500 justify-center text-center bg-gray-100 border border-t-8 absolute top-1/2 rounded-lg left-1/2 overflow-hidden  w-96  h-96 -translate-x-1/2 -translate-y-1/2 " >
    <div className=" relative items-center m-3  bg-gradient-to-t  from-slate-100 to-slate-300 h-full rounded-lg  ">
        <div className=" w-full bg-slate-100 rounded-md h-20 items-center justify-center flex ">
        <h2 className=" text-slate-600 font-bold " >Login with gmail</h2>
    </div>
    <div>
        <button className=" flex absolute py-2 text-yellow-50  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-52 rounded-lg bg-gradient-to-bl from-gray-300 to-gray-500 hover:bg-gradient-to-br hover:from-emerald-600 hover:to-emerald-300 hover:scale-110 transition-transform duration-1000 ease-in-out active:text-blue-700 " onClick={()=>{
            userLogin()
        }} ><span><img className="w-10 h-10 rounded-full" src={gogel} alt="not found" /></span> <span className=" text-white font-semibold pl-1 pt-2 items-center">Login with googel</span></button>
    </div>
    </div>


</div>


</>)
}
export default Login;

