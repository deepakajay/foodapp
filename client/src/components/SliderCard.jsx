import React from 'react'
import { HiCurrencyRupee, IoBasket } from '../assets/icons'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartItems } from '../api'
import { alertNull, alertSuccess } from '../context/actions/alertActions'
import { setCartItems } from '../context/actions/cartActions'

const SliderCard = ({data, index}) => {
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    const sendToCart = ()=>{
        addToCart(user?.user_id, data).then(res=>{
            dispatch(alertSuccess('Added to cart'));
            getCartItems(user?.user_id).then((items)=>{
                dispatch(setCartItems(items));
            })

            setTimeout(()=>{
                dispatch(alertNull());
            }, 3000)
        })
    }

  return (
    <div className='bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3'>
        <img src={data.imageUrl} alt='' className='w-40 h-40 object-contain'/>
        <div className='relative pt-12'>
            <p className='text-xl text-headingColor font-semibold'>
                {data.product_name}
            </p>
            <p className='text-lg font-semibold text-red-500 flex items-center justify-center gap-1'>
                <HiCurrencyRupee className='text-red-500'/>{" "+ data.product_price}.00
            </p>
            <motion.div {...buttonClick} onClick={sendToCart} className='w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer'>
                <IoBasket className='text-2xl text-primary'/>

            </motion.div>
        </div>
    </div>
  )
}

export default SliderCard