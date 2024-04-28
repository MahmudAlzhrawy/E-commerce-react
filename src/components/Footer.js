import React from"react";
import { Link } from "react-router-dom";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
//import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export  function Footer(){
    return(
        <>
        <div className="footer "> 
        <div className=" main max-[300px]:grid-cols-1 max-[845px]:grid-cols-2 max-[990px]:grid-cols-3  mt-6 grid  text-left grid-cols-4 w-full  bg-gray-500 bg-opacity-10 pt-3 pl-3 "  > 
        <div className=" Linkes ">
            <h3>Links</h3>
            <ul className="text-1xl font-semibold">
                <li className="hover:text-violet-900 hover:cursor-pointer"><Link to="/about"/>About</li>
                <li className="hover:text-violet-900 hover:cursor-pointer"><  Link to="/" />Home</li>
                <li className="hover:text-violet-900 hover:cursor-pointer"><Link to="/productlist"/>Products</li>
                <li className="hover:text-violet-900 hover:cursor-pointer"><Link to="/cart"/>Cart</li>
            </ul>
        </div>
        <div className="technology w-10">
            <h3 className=" tracking-tighter">Technologeies</h3>
        <ul className="text-1xl font-semibold">
                <li>HTML</li>
                <li>CSS</li>
                <li>js</li>
                <li>React</li>
                <li>Redux ToolKit</li>
                <li>TaillwindCss</li>
                <li>Firebase Auth</li>
                <li>Firestore</li>
            </ul>
        </div>
        <div className=" Contact text-1xl font-semibold ">
        <h3>Contact Us</h3>
            <ul>
                <li className="w-28 ">email: <a className="" href="mahmudnagi192003@gmail.com" >@MahmudNagi</a></li>
                <li> Phone : +201149564002 </li>
                <li> Countery : Egypt </li>
            </ul>
        </div>
        <div className="text-1xl font-semibold">
        <h3>Social</h3>
                <ul>
                    <li className="w-28 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-blue-800 " ><span className=" pr-1  items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faLinkedin} /></span> linkedIn</li>
                    <li className="w-28 pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-blue-800 "><span className="  pr-1 items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faFacebook} /></span>Facebook</li>
                    <li className="w-28 pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-blue-800 " ><span className="pr-1  items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-blue-800 text-blue-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faTwitter} /></span>Twitter</li>
                    <li className="w-28 pt-2 relative before:left-1/2 before:bottom-0  before:absolute hover:before:transform-cpu hover:before:-translate-x-1/2 before:duration-1000 hover:before:w-20 before:w-0 before:h-0.5 before:bg-blue-800"><span className=" pr-1 items-center  inline-block" ><FontAwesomeIcon className=" bg-transparent hover:text-green-800 text-green-500 transform-cpu duration-700 bg-white w-7 h-7 "  icon={ faWhatsapp} /></span>Whatsap</li>
                </ul>
        </div>
        </div>
        <div className="bg-blue-500 text-center">all Rigthes are resavived &copy; by zahrwy  </div>
        </div>
        
        </>
    )
}