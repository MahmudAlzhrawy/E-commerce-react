import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Productscard from './Productscard';
import { showcategory } from '../rtk/Slices/productSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination ,} from 'swiper/modules';
//import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function ProductDatiels() {
    const params = useParams();
    const dispatch=useDispatch();
    const [product, setProduct] = useState({});
    const prod=useSelector((state)=>state.products)
    const url = "https://fakestoreapi.com/products";
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/${params.productId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        dispatch(showcategory(data.category))
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [params.productId]);
  return (<>
    <div className="card h-full w-1/2 absolute mt-20  left-1/2 -translate-x-1/2 shadow-md shadow-gray-600">
      <div className='bg-gray-600 my-2 py-2'>
      <h2 className="text-3xl text-gray-400 flex justify-center text-center "> {product.title} </h2></div> 
      <div className="image  ">
        <img 
          className="w-96 h-80  "
          src={product.image} 
          alt="not avilabel"
        />
      </div>{" "}
      <div  className=' bg-slate-300'>
      <p className='ml-10 text-gray-900 font-bold' > price: <span className='text-red-700'>{product.price} $</span> </p>
      <p className='ml-10 text-gray-900 font-bold' > Description: <span className='text-gray-600'>{product.description}</span> </p>
      </div>
    </div>
    <div className = "products_calss h-full w-full justify-center    bg-slate-100  rounded-md   ">
      <h2 className='text-red-400 font-blod pl-24  my-3 text-center  '>Featuer Products</h2>
      <Swiper  className='Swiper mb-14  px-3 rounded-md' 
        slidesPerView={3}
        spaceBetween={1}
      //  centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }} 
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination,Autoplay,Navigation]}
        >
        {prod.map((product) => { 
          
          return(<>
          <SwiperSlide className='Swiper-Slide m-2' ><Productscard key={product.id} product={product} /></SwiperSlide>
          </>)})
        }</Swiper> 
    </div>
    </>
  )
}

export default ProductDatiels;