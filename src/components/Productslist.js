//import productsdata from "../productsdata";
import { useEffect, useState } from "react";
import img3 from "../assets/images/background2.jpeg"
import Productscard from "./Productscard";
import { useDispatch, useSelector } from "react-redux";
import { fetchdata,showcategory} from "../rtk/Slices/productSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination ,EffectCoverflow} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Footer } from "./Footer";
function Procductslist({isAuth}) {
  const url = "https://fakestoreapi.com/products";
  const products = useSelector((state) => state.products)
  const[state,setState]=useState(false);
  const [dispalyproduct,setDisplayproduct]=useState(products.slice(0,5))  
  const dispatch = useDispatch();
  const [cateigory, setCategory] = useState([]);
  const mod= useSelector(state=>state.isDark);
  const[isDark,setMode]=useState()
  const navigate=useNavigate();
  const getCategories = () => {
    try{
        fetch(`${url}/categories`)
          .then((res) => res.json())
          .then((cat) => setCategory(cat));}
      catch{
        navigate("/Erorr-400")
    }
  }
useEffect(()=>{
setMode(mod);
},[mod])
useEffect(() => {     
  dispatch(fetchdata());
  getCategories();
}, [dispatch]);
useEffect(() => {
  if (products.length > 0) {
    setDisplayproduct(products.slice(0, 5));
  }
}, [products]);
const showall =()=>{
  setState(true);
    setDisplayproduct(products);
}
const loadMore=()=>{
  const currentIndex=dispalyproduct.length;
  const nextIndex=currentIndex + 5;
  setDisplayproduct(products.slice(0,nextIndex));
  if(currentIndex===15){
    setState(true)
  }
}
    const Categories=cateigory.map((cat)=>{
      return(
            <div className={`${isDark&&"dark"}`}>
                  <button className={` dark:hover:bg-blue-800  dark:bg-blue-600 rounded-md ml-2 px-2 py-2 text-left mt-2  min-[720px]:w-48   border hover:bg-slate-300 duration-500 transform-gpu `} key={cat} onClick={()=>{
            
            dispatch(showcategory(cat));
                  }}>{cat}</button>
            </div>
      )
    },[])
  
    return (  <div className={`${isDark&&"dark"} mt-16 `} >
      <div className="dark:bg-gray-800  dark:text-white">
      { products.length === 0 ?  <span className=" inline-block  " ><div className="border-4   animate-spin items-center text-center border-dotted border-spacing-3  border-blue-900 h-14 w-14 rounded-full "></div></span> : 
        <div className={` dark:bg-gray-800 dark:text-white   w-full  min-[720px]:grid min-[720px]:grid-cols-12`}>
        <div className={`  mt-2 border     shadow-md  shadow-gray-400 bg-opacity-10 min-[720px]:w-52  ml-2 min-[720px]:col-span-2 `}> 
            <h4 className=" w-full  text-gray-400 text-3xl text-left pl-2 " >Filters</h4>
          <span className=" max-[719px]:flex  flex-wrap inline-block"  >
            <button className=" dark:bg-blue-600 dark:hover:bg-blue-800 rounded-md ml-2 px-2 py-2 text-left mt-2  min-[720px]:w-48   border hover:bg-slate-300 duration-500 transform-gpu  "  onClick={()=>{
          // dispatch(fetchdata());
                showall()
                  }}>All</button>
                  {Categories}
            </span>
        </div>
        
          <div className=" container dark:bg-slate-700 min-[720px]:col-span-10  ">  { dispalyproduct.length===5?<>
              <Swiper  className=' w-4/5  rounded-md' 
              effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
          }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }} 
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination,Autoplay,Navigation,EffectCoverflow]}
              >
              {dispalyproduct.map((product) => { 
                
                return(<>
                <SwiperSlide className=' m-2 max-[720px]:w-60 w-80 ' ><Productscard key = { product.id }
                  product = { product } isAuth={isAuth}
                  /></SwiperSlide>
                </>)})
              }</Swiper>
            {!state && (
              <>
              <div className=" flex  mt-10  mb-20   w-full">
                    <div className="w-32 mx-auto">
                        <p onClick={loadMore} className="text-black font-bold underline  hover:cursor-pointer  w-full rounded-md ">
                        Load more
                            </p>
                          </div>
                          <div className="w-32 mx-auto">
                            <p onClick={showall}  className=" text-black font-bold  hover:cursor-pointer  underline   ">
                              Show all 
                            </p>
                      </div>
              </div>
              </>)
              }
            </>:
        <div className = " relative mt-2 products_calss grid min-[500px]:grid-cols-2  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3  gap-1 h-full w-full  mx-auto  ">
            {dispalyproduct.map((product) => { 
              return(<>
              <Productscard key = { product.id }
                product = { product } isAuth={isAuth}
                />
              </>)})
            }
      
        {!state && (
        <>
        <div className="absolute flex -bottom-32 left-0 mb-20 mt-10 w-full">
          <div className="w-32  mx-auto">
            <p onClick={loadMore} className="text-black  underline font-bold w-full rounded-md  hover:cursor-pointer ">
            Load more
            </p>
          </div>
          <div className="w-32  mx-auto">
            <p onClick={showall}  className=" text-black font-bold underline  hover:cursor-pointer   ">
              Show all 
            </p>
          </div>
        </div>
        </>)
        }
        </div>
      }
      </div>
        </div>
        } 
        
    
          <div className="container relative dark:bg-gray-700 dark:text-white   mt-24 bg-gray-200  py-2   shadow-md shadow-gray-500  rounded-sm   before:-top-3 before:h-96 before:absolute before:-left-10 before:w-32   before:-z-30 before:inset-1 before:skew-y-3 before:bg-teal-800 ">
            <h2 className="text-2xl text-gray-400">Overview</h2>
            <div className="  max-[610px]:block min-[611px]:w-full w-72 mx-auto flex min-[611px]:justify-center pt-2  ">
            <div className="img w-72 h-72 border-2 border-transparent border-r-teal-600  border-b-teal-600">
              <img className="w-full h-full" src={img3} alt="Not Found"/>
            </div>
            <div className="content pl-5 bg-white  w-72 h-72 border-2 border-transparent border-l-teal-600  border-b-teal-600">
              <p className="text-3xl font-mono font-normal text-gray-500 ">Hello This is our e-commerce which you can find more than 20 Product from four cateigories. </p>
            </div>
            </div>
          
          </div>
      

          <Footer />
          
    </div> 
    </div> 
        );
    }
  
    export default Procductslist;