import React from 'react'
import mission from "../assets/images/mission.jpeg"
import values from "../assets/images/values.jpeg"
import philo from "../assets/images/philo.jpeg"
import contact from "../assets/images/contact.jpeg"
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { Footer } from './Footer'
function About() {
  const mod= useSelector(state=>state.isDark);
  const[isDark,setMode]=useState()
  useEffect(()=>{
    setMode(mod);
    },[mod])
  return (<div className={`${isDark&&"dark"}`}>
    <div className='main h-full mt-16 dark:bg-gray-900 dark:text-white  '> 
      <div className="text-2xl flex justify-center text-gray-700 dark:text-white   items-center font-bold ">Welcome to the  <span className=" text-black mx-2 -skew-y-3 inset-1 bg-slate-300 ">About</span>  Page</div>
      <div className='container border-2 shadow-md  shadow-slate-400  '>
        <div className="intro text-xl  font-semibold flex-wrap"> <p className='dark:text-white  text-gray-600'>We at <span className=" inline-block text-black mx-2 -skew-y-3 p-2 inset-2 bg-pink-700 ">[MZ Store]</span> are committed to providing the best services and products to our valued customers. Our goal is to offer a unique and exciting experience to every visitor to our website.</p></div>
      </div>
      <h3 className=' mt-2 text-gray-300 font-bold text-3xl ml-5'>Our Mission:</h3>
      <div className=" Mission max-[610px]:block min-[611px]:w-full w-72 mx-auto  flex min-[611px]:justify-center pt-2  ">
            <div className="img w-72 h-72 border-2 border-transparent border-r-teal-600  border-b-teal-600">
              <img className="w-full h-full" src={mission} alt="Not Found"/>
            </div>
            <div className=" dark:bg-gray-800  content pl-5     w-3/5  border-2 border-transparent border-l-teal-600  border-b-teal-600">
              <p className="  text-2xl font-mono font-normal flex-wrap text-gray-500 dark:text-white ">We aim to provide an interactive and enjoyable platform that meets your needs and aspirations. We work hard to ensure your complete satisfaction and deliver an enjoyable and convenient shopping experience </p>
            </div>
            </div>
            <h3 className=' mt-2 text-gray-300 font-bold text-3xl ml-5'>Our Values:</h3>
      <div className=" Mission max-[610px]:block min-[611px]:w-full w-72 mx-auto  flex min-[611px]:justify-center pt-2  ">
            <div className="img w-72 h-72 border-2 border-transparent border-r-teal-600  border-b-teal-600">
              <img className="w-full h-full" src={values} alt="Not Found"/>
            </div>
            <div className="content pl-5 dark:bg-gray-800   w-3/5  border-2 border-transparent border-l-teal-600  border-b-teal-600">
              <p className="text-2xl font-mono font-normal flex-wrap dark:text-white text-gray-500 "><span className=' inline-block text-black mx-2 -skew-y-3 inset-1 bg-slate-300 '>Quality</span>: We believe in delivering high-quality products and services that exceed the expectations of our customers.
                  <span className=' inline-block text-black mx-2 -skew-y-3 inset-1 bg-slate-300 '>Transparency</span>: We adhere to the principle of transparency and honesty in all aspects of our business.
                  <span className='inline-block text-black mx-2 -skew-y-3 inset-1 bg-slate-300 '>Innovation</span>: We constantly strive for innovation and development to offer the latest technologies and solutions </p>
            </div>
            </div>
            <h3 className=' mt-2 text-gray-300 font-bold text-3xl ml-5'>Our Philosophy:</h3>
      <div className=" Mission max-[610px]:block min-[611px]:w-full w-72 mx-auto  flex min-[611px]:justify-center pt-2  ">
            <div className="img w-72 h-72 border-2 border-transparent border-r-teal-600  border-b-teal-600">
              <img className="w-full h-full" src={philo} alt="Not Found"/>
            </div>
            <div className="content pl-5   dark:bg-gray-800  w-3/5  border-2 border-transparent border-l-teal-600  border-b-teal-600">
              <p className="text-2xl font-mono font-normal flex-wrap dark:text-white text-gray-500 ">We believe that the customer is the heart and soul of our business, and we are committed to meeting their needs and providing a superior experience that exceeds their expectations </p>
            </div>
            </div>
            <h3 className=' mt-2 text-gray-300 font-bold text-3xl ml-5'>Get In Touch</h3>
      <div className=" Mission max-[610px]:block min-[611px]:w-full w-72 mx-auto  flex min-[611px]:justify-center pt-2  ">
            <div className="img w-72 h-72 border-2 border-transparent border-r-teal-600  border-b-teal-600">
              <img className="w-full h-full" src={contact} alt="Not Found"/>
            </div>
            <div className="content pl-5 dark:bg-gray-800   w-3/5  border-2 border-transparent border-l-teal-600  border-b-teal-600">
              <p className="text-2xl font-mono font-normal flex-wrap dark:text-white  text-gray-500 ">
                If you have any inquiries, comments, or suggestions, please feel free to contact us. We are happy to assist you at any time.
                <span className=' mt-3 inline-block text-black mx-2 skew-y-1 inset-1 bg-pink-500 '>!Thank you for visiting our website</span> </p>
            </div>
            </div>
            <Footer/>
      </div>
      </div>
      
  )
}

export default About