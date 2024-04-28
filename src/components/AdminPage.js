import { collection, getDocs,doc,deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db,auth,provider } from "../firebase-config";
import{auth_admin,provider_admin} from "../Firebase_authAdmin"
import { signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
import gogel from "../assets/images/G.png";
function Admin(){
const [orderItem,setOrderitems]=useState([]);
const[admin,setAdmin]=useState([]);
const[users,setUsers]=useState([]);
//const [userName,setUserName]=useState("");
    const con=collection(db,"Users");
    const  userLogin= async()=>{
        await signInWithPopup(auth_admin,provider_admin).then((res)=>{
            if(!(auth_admin.currentUser && admin.some(adm=>adm.userId === auth_admin.currentUser.uid ))){
                Swal.fire({
                    position: "top-end",
                    icon: "error", // corrected "erorr" to "error"
                    title: "Login Failed", // corrected "Faild" to "Failed"
                    showConfirmButton: false,
                    timer: 1200,})
            }else{
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login success",
                showConfirmButton: false,
                timer: 1200
                }); }
        })
        
    }

    const getUser= async()=>{
        const data=await getDocs(collection(db,"allUsers"))
        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    const getAdmin= async ()=>{
        const data=await getDocs(con);
        setAdmin(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    const getorderd = async()=>{
        const data =await getDocs(collection(db,"orderdProducts"));
        setOrderitems(data.docs.map((doc)=>({ ...doc.data(),id:doc.id})));
        }
const deleteUser=async(id,userId)=>{
    const userDoc=doc(db,"allUsers",id)
    await deleteDoc(userDoc);
        orderItem.map((product) => {
            if (product.userId === userId) {
                const prodDoc=doc(db,"orderdProducts",product.id)
                deleteDoc(prodDoc);
            }
        })
    setUsers(users.filter(item => item.id !== id));
    setOrderitems(orderItem.filter(product => product.userId !== id));
    }
    useEffect(()=>{
        getAdmin();
        getUser();
        getorderd();
    },[])
    const userNum = users.reduce((count, user) => {
        count += user.count;
        return count;
    }, 0);
return(
    <>
    <div className="admin h-full">
        { (auth_admin.currentUser && admin.some(adm=>adm.userId === auth_admin.currentUser.uid ))?
        <div className="container bg-slate-900 bg-opacity-10 rounded-md z-20 m-14 h-full grid grid-rows-6  " >  
                <div className="row-span-5  ">
                    <div className="text-white">{userNum}</div>
                    <div className="">
                    {
                    users.map((user) => (
                        <tbody key={user.userId}>
                            <tr>
                            <td colSpan="6">
                            
                        <div className="text-left ">
                            <h2  className="text-gray-600">Customer Information</h2>
                            <ul className="text-left" >
                            <li className="text-white font-bold "> <span className="text-red-700 font-semibold text-1xl">Name:</span> {user.userName}</li>
                            <li className="text-white font-bold "><span className="text-red-700 font-semibold text-xl">Address:</span>  {user.Address}</li>
                            <li className="text-white font-bold "><span className="text-red-700 font-semibold text-xl">Phone Number:</span> {user.phoneNumber}</li>
                            </ul>
                        </div>
                            <Table striped bordered hover variant="light" size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Image</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {orderItem.map((product) => {
                                if (product.userId === user.userId) {
                                    return (
                                        <tr key={product.id}>
                                            <td className="text-black">{product.Id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.price}$</td>
                                            <td><img src={product.image} alt="Not found" className="w-20 h-20" /></td>
                                            
                                            
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                            <td><button  className=" btn border bg-primary-subtle text-primary-emphasis" onClick={()=>{
                                    deleteUser(user.id,user.userId)
                        }}>Delete</button></td>
                        </tbody>    
                    </Table>
                </td>
            </tr>
        </tbody>
    ))
}
                    </div>
                    
                </div>
            
                <div className="flex justify-center   mb-3">
                <button><Link className="btn border bg-primary " to="/addNewProduct">ADD Product</Link></button>
                <button ><Link className="btn border  bg-primary" to="/Delete">Delete Product</Link></button>
                </div>
                
        </div>:<>
        {
            
            
            <div className="main  shadow shadow-slate-500 justify-center text-center bg-gray-100 border border-t-8 absolute top-1/2 rounded-lg left-1/2 overflow-hidden  w-96  h-96 -translate-x-1/2 -translate-y-1/2 " >
            <div className=" relative items-center m-3  bg-gradient-to-t  from-slate-100 to-slate-300 h-full rounded-lg  ">
                <div className=" w-full bg-slate-100 rounded-md h-20 items-center justify-center flex ">
                <h2 className=" text-slate-600 font-bold " >Login with gmail</h2>
            </div>
            <div>
            <button className=" flex absolute py-2 text-yellow-50  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-52 rounded-lg bg-gradient-to-bl from-gray-300 to-gray-500 hover:bg-gradient-to-br hover:from-emerald-600 hover:to-emerald-300 hover:scale-110 transition-transform duration-1000 ease-in-out active:text-blue-700 " onClick={()=>{
                userLogin()
                getAdmin()
            }} ><span><img className="w-10 h-10 rounded-full" src={gogel} alt="not found" /></span> <span className=" text-white font-semibold pl-1 pt-2 items-center">Login with googel</span></button>
            </div>
            </div>
            </div>
        }
        </>
        }
    </div>
    
    </>
)


}

export default Admin ;