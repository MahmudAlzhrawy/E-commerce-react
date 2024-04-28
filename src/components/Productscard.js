import { useDispatch } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import { addToCart } from "../rtk/Slices/cartSlice";
import { db,auth } from "../firebase-config";
import{dbc} from "../Firebase-cartitems";
import { useEffect, useState } from "react";
import {collection,getDocs} from "firebase/firestore"
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import cartadd from "../assets/icons/cartadd.svg"
import show from "../assets/icons/Show.svg"
function Productscard(props) {
  const mod= useSelector(state=>state.isDark);
  const[isDark,setMode]=useState()
    const getProducts = async () => {
      try {
        const data = await getDocs(prodref);
        setCartItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        if(error === "Quota exceeded ")
            navigate("/Error-400")
        else
          console.error('Error fetching products:', error);
      }
    };
    const cuttext = (text) => {
      // تقسيم النص إلى كلمات
      const words = text.split(" ");
      // استعادة أول 20 كلمة
      const first20Words = words.slice(0, 5);
      // الانضمام لتكوين نص جديد يحتوي على الكلمات الـ20 الأولى
      return first20Words.join(" ")+"...";
  }
  
  const[cartItem,setCartItems]=useState([]);
 // const[prevCartItem,setPrevCartItem]=useState([])
  const prodref= collection(dbc,"cartProducts");
  useEffect(()=>{
    getProducts();
},[])
useEffect(()=>{
  setMode(mod);
  },[mod])
// useEffect(() => {
//   // Compare the current cartItem with the previous one
//   if (JSON.stringify(cartItem) !== JSON.stringify(prevCartItem)) {
//     getProducts();
//   }
  
//   // Set prevCartItem to current cartItem
//   setPrevCartItem(cartItem);
// }, [cartItem, prevCartItem]);

const navigate=useNavigate();
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
//const productsCollection=collection(db,"products");
  const dispatch = useDispatch();
  return (<div className={`${isDark&&"dark"}`}>
    <div className=" relative dark:after:bg-black dark:after:bg-opacity-30 dark:after:scale-75 dark:hover:after:bg-opacity-40 dark:hover:after:scale-y-0  after:absolute after:top-0 after:right-0 after:left-0 hover:after:origin-top after:delay-300 after:rounded-md hover:after:-translate-x-0 after:w-full after:h-full hover:after:bg-black   hover:after:bg-opacity-30 after:transform-gpu after:mt-6   after:scale-y-0 hover:after:scale-y-75 hover:after:duration-700  card w-72 h-80 sm:w-40 min-[500px]:w-48  mx-auto sm:h-16 lg:w-full md:w-full shadow-md shadow-gray-500">
          <span className="w-9 z-30 rounded-md h-6 absolute right-0 bg-amber-700 bg-opacity-30 inline-block">
            <p className="text-red-900  text-center items-center ">{props.product.rating.rate}</p>
          </span>     
          <div className="image translate-x-4 ">
          <img
          className="h-28 w-4/5  "
          src={props.product.image}
          alt="not avilabel"
        />
      </div>{" "}
      <h6 className="text-center mb-1 text-gray-800 font-bold my-2 h-8 inline-block "> {cuttext(props.product.title)} </h6>{" "}
      <p className="mt-5 text-center text-black font-bold text-1xl" > price: <span  className="text-red-600 ">{props.product.price}$</span> </p>{" "}
      <Link
        to={`/product/${props.product.id}`}
        className="  hover:scale-105 transition-transform duration-1000 ease-in-out ml-2"
      >
        
        {" "}
      <img className="h-8 x-50" src={show} alt="Not Found"/>{" "}
      </Link>{" "}
      <button className=" absolute text-white hover:scale-105 transition-transform duration-1000 ease-in-out rounded-md " onClick={() => {
        if(props.isAuth){
        const findproduct = cartItem.find((prod) => prod.Id === props.product.id &&(prod.user.userID===auth.currentUser.uid));
        if(!findproduct){
        dispatch(addToCart(props.product)) ? console.log("successfyly added") : console.log("Erorr");
        getProducts();
      }
        else{
          
          Toast.fire({
            icon: "warning",
            title: "This product is already found"
          });
        }
      
        }
        else{
          
          Toast.fire({
            icon: "warning",
            title: "you should Auth first "
          });
          navigate("/login")
        }
        
      }}><img  className=" h-8 z-50 " src={cartadd} alt="not found"/></button>
    </div>
    </div>
  );
}
export default Productscard;
