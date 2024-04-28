import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrase, deleteFromCart, decrase } from '../rtk/Slices/cartSlice';
import { auth, db } from "../firebase-config";
import{dbc} from "../Firebase-cartitems"
import {collection, getDocs,updateDoc,doc, deleteDoc, addDoc} from "firebase/firestore"
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Exit from "../assets/icons/Exit.svg"
function Cart({isAuth} ) {
const cartItems = useSelector((state) => state.Cart)
  const dispatch = useDispatch();
  const[state,setState]=useState(false)
  const [cartItem, setCartItems] = useState([]); 
  const [orderItem,setOrderitems]=useState([]);
  const[account,setAccount]=useState([])
  const[name,setName]=useState()
  const[age,setAge]=useState(0)
const[length,setLength]=useState(0);
const[numper,setPhoneNumber]=useState(0);
const[address,setAddress]=useState()
const prodref =collection(dbc,"cartProducts");
const orderedprod=collection(db,"orderdProducts")
const mod= useSelector(state=>state.isDark);
const[isDark,setMode]=useState()
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
  //increase quntity
  const increaseprod =async(id,quntity)=>{
    const productDoc=doc(dbc,"cartProducts",id)
    const newquntity={quntity:quntity + 1}
    await updateDoc(productDoc,newquntity);
    //update the product at the same moment
    setCartItems(prevCartItems => {
      return prevCartItems.map(item => {
        if (item.id === id) {
          return { ...item, quntity:quntity + 1 };
        }
        return item;
      });
    });
}
//decrease quntity
const decreaseprod =async(id,quntity)=>{
  const productDoc=doc(dbc,"cartProducts",id)
  if(quntity > 1){
  const newquntity={quntity:quntity - 1}
  await updateDoc(productDoc,newquntity)
  }
  //update the product at the same moment;
  setCartItems(prevCartItems => {
    return prevCartItems.map(item => {
      if (item.id === id) {
        if(quntity >1){
        return { ...item, quntity:quntity - 1 };
      }
      }
      return item;
    });
  });
}
//delet product function
const deleteproduct=async(id)=>{
  const productDoc=doc(dbc,"cartProducts",id)
  await deleteDoc(productDoc);
  setCartItems(cartItem.filter(item => item.id !== id));
}


const navigate=useNavigate();
//fetch data from firestore
useEffect(()=>{
  setMode(mod);
  },[mod])
//in case if the user is not auth will renavigate to login page;
useEffect(()=>{
  getAccounts();
  getorderd();
  const getProducts = async()=>{
    try{
    const data =await getDocs(prodref);
    setCartItems(data.docs.map((doc)=>({ ...doc.data(),id:doc.id})));
  }catch(error){
      if(error=== "Quota exceeded")
        navigate("/Erorr-400")
      else
      console.log("The  Erorr is :",error);
  }
  }
  if(!isAuth){ 
    Swal.fire({
    position: "top-end",
    icon: "warning",
    title: "You must login to see cart",
    showConfirmButton: false,
    timer: 1200
  })
  navigate("/login")
}
else{
  getProducts()
}

},[])
useEffect(()=>{
  setLength(countForCurrentUser)
},[cartItem])
const addToOrder=async (product)=>{
  getorderd();
  const findprod= orderItem.some((prod)=>prod.Id === product.Id && product.user.userID===prod.userId)
  if(!findprod){
      await addDoc (orderedprod,{Id:product.Id,title:product.title,image:product.image,price:product.price,Quntity:product.quntity, userName:auth.currentUser.displayName,userId:auth.currentUser.uid} )
  }
}
const del=async (product)=>{
  getorderd();
  const findprod= cartItem.some((prod)=>prod.user.userID === product.Id && product.user.userID===prod.userId)
  if(!findprod){
      await addDoc (orderedprod,{Id:product.Id,title:product.title,image:product.image,price:product.price,Quntity:product.quntity, userName:auth.currentUser.displayName,userId:auth.currentUser.uid} )
  }
}
const addacount=async()=>{
  getAccounts();
  const findac=account.some((ac)=>ac.userId===auth.currentUser.uid)
  if(!findac){
      await addDoc(collection(db,"allUsers"),{userName:auth.currentUser.displayName , Name:name ,Address:address,phoneNumber:numper ,age:age,userId:auth.currentUser.uid ,count:1})
  }
}
const getorderd = async()=>{
  const data =await getDocs(collection(db,"orderdProducts"));
  setOrderitems(data.docs.map((doc)=>({ ...doc.data(),id:doc.id})));
}
const getAccounts = async()=>{
  const data =await getDocs(collection(db,"allUsers"));
  setAccount(data.docs.map((doc)=>({ ...doc.data(),id:doc.id})));
}
const fet=()=>{
  cartItem.map((product) => {
    if (product.user.userID===auth.currentUser.uid){ 
          addToOrder(product)}
        
  })}
const totprice = cartItem.reduce((acc, product) => {
  if(product.user.userID===auth.currentUser.uid){
  acc += product.price * product.quntity}
  return acc;
}, 0)
const countForCurrentUser = cartItem.reduce((count, product) => {
  if (auth.currentUser && product.user.userID === auth.currentUser.uid) {
    count += product.count;
  }
  return count;
}, 0);
  //console.log("Localstorage",cartItem);
  console.log( "cart items",cartItems);
    return (
    <div className={`${isDark&&"dark"}`}>
      <div className='dark:bg-slate-900  h-full dark:text-white'>
      { <div className="container "  >
        <h1>MyCart</h1>
        <p className='mt-4'>Price: {totprice} $</p>
        <div className="product">
          <Table striped bordered hover variant={`${isDark?"dark":"light"}`}  size="sm"  >
            <thead>
              <tr >
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Image</th>
                <th>Quntity</th>
                <th>Actions</th>
              </tr>
            </thead>
            {
              
              cartItem.map((product) => {
                if (product.user.userID===auth.currentUser.uid){
                  
                  return(
                  <tbody key={product.id}>
                    <tr>
                      <td  >{product.Id}</td>
                      <td>{product.title} </td>
                      <td >{product.price}$</td>
                      <td className="w-20 h-20 " ><img src={product.image} alt="Not found" /></td>
                      <td  ><button onClick={() => {
                        dispatch(decrase(product))
                        decreaseprod(product.id,product.quntity)
                      
                      }}>-</button> {product.quntity} <button onClick={() => {
                          dispatch(incrase(product))
                          increaseprod(product.id,product.quntity);
                      }}>+</button></td>
                      <td className='block' ><button classname="btn bg-secondry border border-blue-400" onClick={() => {
                        dispatch(deleteFromCart(product));
                        deleteproduct(product.id)
                      }
                      } >Delete</button></td>
                    </tr>
                  </tbody>
                  )
              }
                
              })
            
            }
          </Table>
          
        </div>
        {(length >0)&&
        <button className='bg-red-300 hover:bg-red-500 dark:bg-purple-500 dark:hover:bg-purple-800 duration-700 mb-4 p-2 rounded-full' onClick={()=>{
            setState(true)
        }}>complete order</button>}
        {state&&
        <div className='absolute grid rounded-md   bg-slate-200 px-3 h-80  z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  '>
          <button className='absolute right-3 mt-1 bg-red-800 h-8 w-8 rounded-full  ' onClick={()=>{
            setState(false);
          }}><img  className=" h-5 pl-1.5 " src={Exit} alt="not found"/></button>
          <form  className='grid  grid-rows-4 ' onSubmit={(event)=>{ event.preventDefault()
          fet();
          addacount()
          
          Toast.fire({
            icon: "success",
            title: "Completed Order"
        });
          setState(false)
          }} >
            <p className='bg-red-300 text-white px-1 py-1 mt-1 w-48 rounded-md'>price : <span className='text-red-900' >{totprice} $</span></p>
              <input className='mb-3 py-2 border-2 border-red-700 ' type="text " placeholder='Address' onChange={(ev)=>{
                setAddress(ev.target.value)
              }}/>
              <input onChange={(ev)=>{
                setName(ev.target.value)
              }} className='mb-3 py-2 border-2 border-red-700 ' type="text " placeholder='Name'/>
              <input onChange={(ev)=>{
                setAge(ev.target.value)
              }} className='mb-3 py-2 border-2 border-red-700 ' type="numper" placeholder='Age'/>
                <input onChange={(ev)=>{
                setPhoneNumber(ev.target.value)
              }} className='mb-3 py-2 border-2 border-red-700 ' type="numper" placeholder='Phone Number +20'/>
              <button className='bg-red-700 p-2 rounded-full text-gray-100 hover:scale-110 duration-1000 hover:bg-red-500'  type="submit">Complete</button>
          </form>
        </div>}
      </div>
        }</div>
        </div>
        )
  
}
  export default Cart ;