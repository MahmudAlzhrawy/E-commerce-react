import React, { useEffect, useState } from "react";
import img1 from "../assets/images/background1.avif"
import img3 from "../assets/images/background3.webp"
import img4 from "../assets/images/background4.jpg"
import img5 from "../assets/images/background5.jpg"
import { auth } from "../firebase-config";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

export  function HomePage({isAuth}){
const[aut,setAut]=useState();
useEffect(()=>{
    const fetchUser = async () => {
        const user = await auth.currentUser;
        if (user) {
            setAut(user.displayName);
        }
    };

    fetchUser();
},[])
return (
    <>
        <Swiper  className=''
            slidesPerView={1}
            spaceBetween={1}
        //  centeredSlides={true}
            autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            }} 
            pagination={{
            dynamicBullets: true,
            }}
            modules={[Pagination,Autoplay,Navigation]}
            >
                <SwiperSlide className='w-full h-full relative' >
                <div className="absolute z-30 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3  bg-slate-600  bg-opacity-50 rounded-md  px-10 " >{(aut)?
                    <p className=" text-white text-2xl font-bold ">Hello <span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs  ">{aut}</span> </p>:
                    <p className=" ">Hello<span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs" >Customer</span> </p>
                }
                <p className="text-white text-2xl font-mono " >if you want to dive in our worled and discover our Products<span className="hover:scale-110 transform duration-1000 ease-in-out "> <Link className="  no-underline text-xl text-violet-950 bg-blue-700 py-1 px-3 rounded-md " to="/products" >Click Here</Link> </span> </p>
                </div>
                <img className="im" src={img1} alt="Not Found"/>
                </SwiperSlide> 

            <SwiperSlide className='w-full' >
            <div className="absolute z-30 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3  bg-slate-600  bg-opacity-50 rounded-md px-10 " >{(aut)?
                    <p className=" text-white text-2xl font-bold ">Hello <span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs  ">{aut}</span> </p>:
                    <p className=" ">Hello<span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs" >Customer</span> </p>
                }
                <p className="text-white text-2xl font-mono " >if you want to dive in our worled and discover our Products <span className="hover:scale-110 transform duration-1000 ease-in-out "> <Link className=" no-underline text-xl text-violet-950 bg-blue-700 py-1 px-3 rounded-md " to="/products" >Click Here</Link></span>  </p>
                </div>
                <img  className="im" src={img3} alt="Not Found"/> </SwiperSlide> 
            <SwiperSlide className='w-full' > 
            <div className="absolute z-30 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3  bg-slate-600  bg-opacity-50  rounded-md px-10  " >{(aut)?
                    <p className=" text-white text-2xl font-bold ">Hello<span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs  ">{aut}</span> </p>:
                    <p className=" ">Hello<span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs" >Customer</span> </p>
                }
                <p className="text-white text-2xl font-mono " >if you want to dive in our worled and discover our Products <span className="hover:scale-110 transform duration-1000 ease-in-out "><Link className=" hover:scale-110 transform duration-1000 ease-in-out no-underline text-xl text-violet-950 bg-blue-700 py-1 px-3 rounded-md " to="/products" >Click Here</Link></span>  </p>
            </div>
            <img className="im" src={img4} alt="Not Found"/> </SwiperSlide> 
            <SwiperSlide className='w-full' > 
            <div className="absolute z-30 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3  bg-slate-600  bg-opacity-50  rounded-md px-10 " >{(aut)?
                    <p className=" text-white text-2xl font-bold ">Hello <span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs  ">{aut}</span> </p>:
                    <p className=" ">Hello<span className="ml-1 py-1 px-3 bg-blue-700 text-white rounded-md text-xs" >Customer</span> </p>
                }
                <p className="text-white text-2xl font-mono " >if you want to dive in our worled and discover our Products <span className="hover:scale-110 transform duration-1000 ease-in-out "><Link className=" no-underline text-xl text-violet-950 bg-blue-700 py-1 px-3 rounded-md hover:scale-110 transform duration-1000 ease-in-out " to="/products" >Click Here</Link> </span>  </p>
                </div>
            <img className="im" src={img5} alt="Not Found"/> </SwiperSlide> 
            </Swiper> 
    
        
        
        </>
    )
} 