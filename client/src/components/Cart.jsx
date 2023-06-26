import { motion } from 'framer-motion'
import React from 'react'
import { buttonClick, slideIn, staggerFadeInOut } from '../animations'
import { useDispatch, useSelector } from 'react-redux'
import { setCartOff } from '../context/actions/displayCartActions'
import {BiChevronsRight, FcClearFilters } from '../assets/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { deleteCart, getCartItems, orderItems, updateCart } from '../api'
import { clearCartItems, setCartItems } from '../context/actions/cartActions'
import { alertNull, alertSuccess } from '../context/actions/alertActions'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmptyCart from './EmptyCart'

const Cart = () => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user);
    const cart = useSelector((state)=> state.cart);

    const [total, setTotal] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const navigate = useNavigate();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubscribe = () => {
      // Handle the form submission here
      console.log({
        name,
        phoneNumber,
        streetName,
        houseNumber,
      });
      const address = {
        "Name" : name,
        "PhoneNumber" : phoneNumber,
        "Street":streetName,
        "HouseNo" : houseNumber,
      }
      if(user) {
            if(cart) {
                orderItems(user?.user_id, cart, address).then(()=> {
                    dispatch(alertSuccess("Order placed successfully"));
                    navigate("/checkout", {replace:true})
                    dispatch(clearCartItems());
                    dispatch(alertNull());
                })
            }
        } 
      // Add your logic to submit the form data or perform any other actions
      handleClose();
    };

    useEffect(()=>{
        let tot = 0;
        if(cart){
            cart.map((data)=>{
                let price = parseInt(data.product_price);
                tot = tot + price * data?.quantity;
                setTotal(tot);
            })
        }
    },[cart]);

  return (
    <motion.div {...slideIn} className='fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen'>
        <div className='w-full flex items-center justify-between py-4 pb-12 px-6'>
            <motion.i {...buttonClick} className='cursor-pointer' onClick={()=>dispatch(setCartOff())}  >
                <BiChevronsRight className='text-[50px] text-textColor'/>
            </motion.i>
            <p className='text-2xl text-headingColor font-semibold'>Your cart</p>
            <motion.i {...buttonClick} className='cursor-pointer'>
                <FcClearFilters className='text-[30px] text-textColor'/>
            </motion.i>
        </div>


        <div className='flex-1 flex flex-col items-start justify-start rounded-t-3xl  h-full py-6 gap-3 relative'>
            {cart && cart?.length > 0 ? (<>
                <div className='flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4'>
                    {cart && cart?.length > 0 && 
                    cart?.map((item, i)=>(
                        <CartItemCard key={i} data={item}/>
                    ))}
                </div>
                <div className='bg-zinc-800 rounded-t-[60px] w-full h-[35%] flex flex-col items-center justify-center px-4 pb-[8.7rem] gap-24'>
                    <div className='w-full flex items-center justify-evenly'>
                        <p className='text-3xl text-zinc-500 font-semibold'>Total</p>
                        <p className='text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1'>
                        
                                ₹{total}
                                <motion.button {...buttonClick} className='bg-orange-400 w-[70%] px-4 text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl' onClick={handleClickOpen}>
                                 Check out
                             </motion.button>
                        </p>
                    </div>
                        


                        {/* Popup */}
                        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter your information below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            id="street"
            label="Street Name"
            type="text"
            fullWidth
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="house"
            label="House Number"
            type="text"
            fullWidth
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubscribe}>Order</Button>
        </DialogActions>
      </Dialog>
                    
                </div>
            </>) : (<>
                <EmptyCart/>
            </>)}
        </div>
    </motion.div>
  )
}

export const CartItemCard = ({index, data})=> {
    const cart = useSelector((state)=> state.cart);
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch();
    const [itemTotal, setItemTotal] = useState(0);
    
    const decrementCart = (productId)=>{
        dispatch(alertSuccess("Updated the cart item please wait!"))
        updateCart(user?.user_id, productId, "decrement").then((data)=> {
            getCartItems(user?.user_id).then((items)=>{
                dispatch(setCartItems(items));
                dispatch(alertNull());
            })
        })
    }
    const incrementCart = (productId)=> {
        console.log("increment data ncoming", productId);
        dispatch(alertSuccess("Updated the cart item please wait!"))
        updateCart(user?.user_id, productId, "increment").then((data)=> {
            getCartItems(user?.user_id).then((items)=>{
                dispatch(setCartItems(items));
                dispatch(alertNull());
            })
            
        })
    }

    useEffect(()=>{
        let price = parseInt(data.product_price);
        setItemTotal(price * data?.quantity);
    },[itemTotal,cart]);

    return (
        <motion.div key={index} {...staggerFadeInOut(index)} className='w-full flex items-center justify-start rounded-md drop-shadow-md px-4 gap-4'>
            <img src={data?.imageUrl} className='w-24 min-w-[94px] h-24 object-contain' alt=''/>
            <div className='flex items-center justify-start gap-1 w-full'>
                <p className='text-lg text-primary font-semibold'>
                    {data?.product_name}
                    <span className='text-sm block capitalize text-gray-400'>
                        {data?.product_category}
                    </span>
                </p>
                <p className='text-sm font-semibold text-red-400 ml-auto'>
                    ₹{itemTotal} 
                </p>
            </div>

            <div className='ml-auto flex items-center justify-center gap-3'>
                <motion.div {...buttonClick} onClick={()=> decrementCart(data?.id)} className='w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer'>
                    <p className='text-xl font-semibold text-primary'>--</p>
                </motion.div>
                <p className='text-lg text-primary font-semibold'>{data?.quantity}</p>
                <motion.div {...buttonClick} onClick={()=> incrementCart(data?.id)} className='w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer'>
                    <p className='text-xl font-semibold text-primary'>+</p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Cart