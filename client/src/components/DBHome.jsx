import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { Chef } from '../assets';
import MainLoader from './MainLoader';

const DBHome = () => {
  const products = useSelector(state=> state.products);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!products) {
      getAllProducts().then((data)=>{
        dispatch(setAllProducts(data));
      })
    }
    setIsLoading(true);
    
    setTimeout(()=>{setIsLoading(false)},2000)
  }, [])
  
  return (
    <div className="flex flex-col items-center justify-center bg-primary text-orange-400 py-16">
      {isLoading ? <MainLoader/> : <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <p className="text-lg text-center mb-8">
        Manage your food items and orders with ease.
      </p>
      <img
        src={Chef}
        alt="Admin Dashboard"
        className="w-[23rem] h-[315px]"
      />
      </div>}
    </div>
  )
}

export default DBHome