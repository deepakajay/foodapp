import React, { useState } from 'react'
import { LoginBg, Logo } from '../assets'
import { LoginInput } from '../components'
import { FaEnvelope, FaLock, FcGoogle } from '../assets/icons';
import {motion} from 'framer-motion';
import { buttonClick } from '../animations';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { app } from "../config/firebase.config";
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
 

const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const navigate = useNavigate()

    //first we need to get the authentication information from our app, which all authentication we have enabled
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async ()=> {
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;
            const token = user.accessToken;
            const data = jwt_decode(token);
            console.log(data);
            navigate("/", {replace : true});
        } catch (error) {
            console.log(error)
        }
  
    };

    const signUpWithEmailPass = async()=> {
        if((userEmail === "" || password === "" || confirm_password === "")) {
            //alert message
        }else {
            if(password === confirm_password) {
                try {
                    const result = await createUserWithEmailAndPassword(firebaseAuth, userEmail, password);
                    const user = result.user;
                    const token = user.accessToken;
                    const data = jwt_decode(token);
                    setUserEmail("");
                    setConfirm_password("");
                    setPassword("");
                    console.log(data);
                    navigate("/", {replace : true});
                } catch(error) {
                    console.log(error);
                }
                
            }else {
                //alret message
            }
        }

    }

    const signInWithEmailPass = async()=> {
        if(userEmail != "" && password != "") {
            try {
                const user = await signInWithEmailAndPassword(firebaseAuth, userEmail, password);
                if(user) {
                    console.log(user);
                    navigate("/", {replace : true});
                }
            }catch(error) {
                console.log(error)
            }
        }else {
            //alert message
        }
    }

  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>

        {/* Baground Image */}
        <img src={LoginBg} className="w-full h-full object-cover absolute top-0 left-0" alt="" />

        {/* Content box */}
        <div className='flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 gap-6'>
            {/* Top logo section */}
            <div className='flex items-center justify-start gap-4 w-full'>
                <img src={Logo} alt="" className='w-8'/>
                <p className='text-headingColor font-semibold text-2xl'>City</p>
            </div>

            {/* Welcome text */}
            <p className='text-3xl font-semibold text-headingColor'> Welcome Back</p>
            <p className='text-xl text-textColor -mt-6'>{isSignUp ? "Sign-up" : "Sign-in"} with following</p>

            {/* Input section */}
            <div className='w-full flex flex-col items-center justify-center gap-6 px- 4 md:px-12 py-4'>
                <LoginInput placeHolder={"Email Here"} icon={<FaEnvelope className='text-xl text-textColor'/>} inputState={userEmail} inputStateFunc={setUserEmail} type="email" isSignUp={isSignUp}/>

                <LoginInput placeHolder={"Password Here"} icon={<FaLock className='text-xl text-textColor'/>} inputState={password} inputStateFunc={setPassword} type="password" isSignUp={isSignUp}/>

                {isSignUp && (
                    <LoginInput placeHolder={"Confirm Password Here"} icon={<FaLock className='text-xl text-textColor'/>} inputState={confirm_password} inputStateFunc={setConfirm_password} type="password" isSignUp={isSignUp}/>
                )}

                {!isSignUp ? <p>Doesn't have an account : <motion.button {...buttonClick} className='text-red-400 underline cursor-pointer bg-transparent' onClick={()=> setIsSignUp(true)}>
                    Create one</motion.button></p> : <p>Already have an account : <motion.button {...buttonClick} className='text-red-400 underline cursor-pointer bg-transparent' onClick={()=> setIsSignUp(false)}>
                    Sign-in here</motion.button></p>}

                 {/* button section  */}
                 {isSignUp ? (<motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150' onClick={signUpWithEmailPass}>
                    Sign Up
                 </motion.button>) : (
                    <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150' onClick={signInWithEmailPass}>
                    Sign In
                 </motion.button>
                 )}
            </div>

            <div className='flex items-center justify-between gap-16'>
                <div className='w-24 h-[1px] rounded-md bg-white'>

                </div>
                    <p className='text-white'>Or</p>
                <div className='w-24 h-[1px] rounded-md bg-white'>

                </div>
            </div>

            <motion.div {...buttonClick} className='flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4' onClick={loginWithGoogle}>
                    <FcGoogle className='text-3xl'/>
                    <p className='capitalize text-base text-headingColor'>Sign in with Google</p>
            </motion.div>
        </div>
    </div>
  )
}

export default Login