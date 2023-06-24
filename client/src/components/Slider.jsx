import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle"
import "../assets/css/swipperStyles.css";

import { useSelector } from 'react-redux';
import { useState } from 'react';
import {SliderCard} from '../components/index';

const Slider = () => {
    const products = useSelector((state)=> state.products);
    const [fruits, setFruits] = useState(null)

    useEffect(()=>{
        console.log("Slider mounting..");
        setFruits(products?.filter((data)=>data.product_category === "fruits"))
        console.log(fruits);
    },[products])

  return (
    <div className='w-full pt-24'>
        <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {fruits && fruits.map((data, i)=> <SwiperSlide key={i}><SliderCard data={data} index={i}/></SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default Slider