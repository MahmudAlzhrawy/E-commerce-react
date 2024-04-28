import React from "react";
 function ErrorPage (){
    return(
        <>
        <div className="container  flex justify-center mt-20">
            <div className="Content" >
            <h1 className=" text-gray-600 font-monospace">here is An Error page </h1>
            <div>
            <span className=" text-9xl font-bold text-gray-500 inline-block  ml-10" >400</span>
            <strong className="text-red-900 inline-block text-2xl bg-slate-400">Quota exceeded <span className="text-xl text-blue-950"> : Wait until it will return to work automaticaly </span> </strong>
            </div>
            </div>
        </div>
        </>
    )

}
export default ErrorPage;