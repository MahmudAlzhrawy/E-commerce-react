import React,{useEffect,useState} from "react";
//import {useSelector} from "react-redux"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; 
import { Link, useNavigate } from "react-router-dom";
import{dbc} from "../Firebase-cartitems"
import { auth } from "../firebase-config";
import logo from "../assets/images/image.png";
import {collection, getDocs} from "firebase/firestore"
import Swal from "sweetalert2";
import loginIcon from '../assets/icons/loginicon.svg'
import logout from '../assets/icons/Logout.svg'
import carticon from '../assets/icons/cart.svg'
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch} from "react-redux";
import { ToggleTheme } from "../rtk/Slices/Theme";
function Navebar({isAuth,setAuth}) {
  const navigate=useNavigate();
  const prodref=collection(dbc,"cartProducts");
  const[cart,setCartItems]= useState([]);
  const [lengthForOneUSer, setLengthForOneUser] = useState(0);
  const[click,setClecked]=useState(false)
  const[clickPart,setCleckedPart]=useState(false)
  const[isDark,setMode]=useState(()=>{
    const storedmode=localStorage.getItem("Mode");
  return storedmode? JSON.parse(storedmode):false;
  });
  useEffect(()=>{
    localStorage.setItem("Mode",JSON.stringify(isDark));
  },[isDark])
  const toggleDarkMode =()=>{
    setMode(!isDark);
    localStorage.setItem("Mode", JSON.stringify(isDark));
  }
  useEffect(()=>{
    const getProducts = async () => {
      try {
        const data = await getDocs(prodref);
        setCartItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        if (error.code === "Quota exceeded") {
          navigate("/Error-400")
          
        } else {
          console.log("خطأ غير متوقع:", error);
        }
      }
    }
    const countForCurrentUser = cart.reduce((count, product) => {
      if (auth.currentUser && product.user.userID === auth.currentUser.uid) {
        count += product.count;
      }
      return count;
    }, 0);
    setLengthForOneUser(countForCurrentUser);
    getProducts();
  }, [cart]);
  
const userSignout=()=>{
  signOut(auth).then((res)=>{
    localStorage.clear();
    setAuth(false);
   // localStorage.setItem("Auth",false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "signout success",
      showConfirmButton: false,
      timer: 800
      });
      navigate("/login")})
    

}
const dispatch =useDispatch();
  return (<div className={`${isDark&&"dark"}`}>
    <div className="nav dark:bg-gradient-to-tr dark:from-slate-400 dark:to-slate-700 dark:text-white fixed  top-0 z-40 bg-gradient-to-tr from-gray-100 to-white h-14 w-full  flex   shadow-md justify-between  shadow-gray-500 " >
        <div className="logo  flex justify-items-start w-10 h-10  ml-2 mt-2 "><Link to="/"><img  className="rounded-full w-full h-full items-center " src={logo} alt="Not Found" /></Link></div>
        <div className="mod rounded-xl flex bg-gray-300 mt-2 h-10 w-20 items-center">
        <span onClick={()=>{
          toggleDarkMode();
        dispatch(ToggleTheme(isDark))
        }} className="items-center ml-2  py-1 dark:bg-slate-50 bg-slate-600 w-16 rounded-xl  "><FontAwesomeIcon className={`w-6 h-5 dark:transform-cpu dark:translate-x-8 dark:duration-1000  ${isDark ? 'text-gray-600 duration-500 ' : 'text-yellow-400 duration-500 ml-1 '}`} icon={isDark?faMoon:faSun}/></span>
        </div>
        <div className = "links flex items-center mt-2 min-[555px]:block " >
        <ul className=" flex  " >
        <li className="relative before:left-1/2 before:bottom-3  before:absolute  hover:before:transform-cpu before:-ml-2 hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-16 before:w-0 before:h-0.5 before:bg-blue-800 " ><Link className="  hover:text-blue-900 pr-4 no-underline font-bold dark:text-white text-gray-600 text-1xl active:text-blue-900 focus:text-violet-950 " to="/admin"> delevery </Link></li>
        <li className="relative before:left-1/2 before:bottom-3  before:absolute  hover:before:transform-cpu before:-ml-2 hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-16 before:w-0 before:h-0.5 before:bg-blue-800" ><Link className=" hover:text-blue-900 pr-4  no-underline  font-bold dark:text-white  text-gray-600 text-1xl active:text-blue-900  focus:text-violet-950   " to="/products" >Products</Link></li>
        <li className="relative before:left-1/2 before:bottom-3  before:absolute  hover:before:transform-cpu before:-ml-2 hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-16 before:w-0 before:h-0.5 before:bg-blue-800"><Link className=" hover:text-blue-900 pr-4  no-underline  font-bold dark:text-white  text-gray-600 text-1xl active:text-blue-900  focus:text-violet-950   " to="/About"> About </Link></li>
        <li><Link className="hover:text-blue-900 pr-4  no-underline  font-bold  text-gray-600 text-1xl  flex bg-gray-500 rounded-l-md py-1 " to="/cart"> <img  className=" h-8 " src={carticon} alt="not found"/><span className="h-7 w-7 rounded-full bg-red-800 text-center text-white font-bold  " >{lengthForOneUSer}</span></Link></li>
        <li>{ !isAuth?<Link className=" inline-block no-underline   bg-gray-700  rounded-r-md py-1  "  to="/login"><img className=" h-8" src={loginIcon} alt="not found" /></Link>:< button className="bg-gray-700 rounded-r-md py-1 " onClick={()=>{userSignout()}
          }><img  className=" h-8 mr-3 " src={logout} alt="not found"/></button>}</li>
        </ul>   
      </div>
      <div className="group w-8 mr-3  max-[554px]:block items-center  " onClick={()=>{
        setClecked(ev=>!ev);
      }} >
        <span className="items-center pt-3 flex flex-wrap justify-end">
          {click?<>
          <span className="spn w-full h-1 items-center transform rotate-45 duration-500  translate-y-2.5" ></span>
          
          <span  className="spn w-full h-1 items-center transform  -rotate-45 duration-500  "></span>
          </>:<>
          <span className="spn h-0.5 w-full items-center"></span>
          <span  className="spn h-0.5 w-3/5 items-center flex  group-hover:w-full transform-gpu duration-500 "></span>
          <span  className="spn h-0.5 w-full items-center"></span>
          </>
          }
        </span>
    </div>
    </div>
    {click&&
    <div className="list bg-slate-50 z-50 w-48  top-12 right-0 bg-opacity-100 rounded-md fixed">
      <ul className="list text-left  " >
        <li className="  pl-1 hover:bg-slate-200 hover:cursor-pointer -translate-x-6 rounded-md hover:-translate-x-5 duration-700 transform-gpu w-full border-b mt-1 py-2 bg-slate-100 border-gray-400" onClick={()=>{
          setCleckedPart(ev=>!ev)
        }}>Browse
        {clickPart&&
          <ul>
            <li className=" active:text-blue-900  pl-1 rounded-md -translate-x-4 hover:bg-slate-300  hover:-translate-x-0 duration-700 transform-gpu w-full border-b py-2 bg-slate-100 border-gray-400"><Link className="no-underline text-black text-1xl pl-1" to="/login">Login</Link></li>
            <li className=" active:text-blue-900  pl-1 rounded-md -translate-x-4 hover:bg-slate-300  hover:-translate-x-0 duration-700 transform-gpu w-full border-b py-2 bg-slate-100 border-gray-400">< button className=" " onClick={()=>{userSignout()}
            }>Logout</button></li>
          </ul>
          }
        </li>
        <li className="pl-1 active:text-blue-900   -translate-x-6 rounded-md hover:bg-slate-200  hover:-translate-x-0 duration-700 transform-gpu w-full border-b mt-1 py-2 bg-slate-100 border-gray-400"><Link className="no-underline text-black text-1xl pl-1"  to="/productlist" >Products</Link> </li>
        <li className="pl-1 active:text-blue-900   -translate-x-6 rounded-md hover:bg-slate-200  hover:-translate-x-0 duration-700 transform-gpu w-full border-b mt-1 py-2 bg-slate-100 border-gray-400"><Link className="no-underline text-black text-1xl pl-1"  to="/admin" >delevery</Link> </li>
        <li className="pl-1 active:text-blue-900   -translate-x-6 rounded-md hover:bg-slate-200  hover:-translate-x-0 duration-700 transform-gpu w-full border-b mt-1 py-2 bg-slate-100 border-gray-400"><Link className="no-underline text-black text-1xl pl-1"  to="/cart" >Cart</Link><span className="text-white text-center items-center bg-red-500 h-6 w-10 inline-block rounded-full ml-8">{lengthForOneUSer}</span> </li>
        <li className="pl-1 active:text-blue-900  -translate-x-6 rounded-md hover:bg-slate-200  hover:-translate-x-0 duration-700 transform-gpu w-full  py-2 mt-1 bg-slate-100"><Link className="no-underline text-black text-1xl pl-1"  to="/About" >About</Link> </li>
      </ul>
    </div>
      }
    </div>
    );
}

export default Navebar;