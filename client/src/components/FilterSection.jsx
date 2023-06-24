import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { staggerFadeInOut } from '../animations';
import { IoFastFood } from '../assets/icons';
import { statuses } from '../utils/styles';
import {Spinner,SliderCard} from './index';

const FilterSection = () => {
    const [category, setCategory] = useState("fruits");
    const [isLoading, setIsLoading] = useState(false);
    const products = useSelector((state)=> state.products);

  return (
    <motion.div className='w-full flex items-start justify-start flex-col'>
        <div className='w-full flex items-center justify-between'>
            <div className='flex flex-col items-start justify-start gap-1'>
                <p className='text-2xl text-headingColor font-bold'>
                    Our Hot Dishes
                </p>
                <div className='w-40 h-1 rounded-md bg-orange-500'></div>
            </div>
        </div>
        <div className='w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8'>
            {statuses && statuses.map((data, i)=>(
                <FilterCard data={data} category={category} setCategory={setCategory} setIsLoading={setIsLoading} index={i}/>
            ))}
        </div>

        <div className='w-full flex items-center justify-evenly flex-wrap gap-4 mt-12'>
                {
                    isLoading? <Spinner/> : products && products.filter(data=> data.product_category === category).map((data, i)=><SliderCard key={i} index={i} data={data}/>)
                }
        </div>
    </motion.div>
  )
}

export const FilterCard = ({data, index, category, setCategory, setIsLoading})=>{
    const changeCategory = (category, setCategory, setIsLoading)=>{
        setIsLoading(true);
        setCategory(category);
        setTimeout(()=>{setIsLoading(false)}, 1000);
    }
    return (
        <motion.div key={index} onClick={()=>changeCategory(data.category, setCategory, setIsLoading)} {...staggerFadeInOut(index)} className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${category === data.category? "bg-red-500":"bg-primary"} hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4 `}>
            <div className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${category === data.category?"bg-primary" : "bg-red-500"}`}>
                <IoFastFood className={`${category === data.category?"text-red-500":"text-primary"} group-hover:text-red-500`}/>

            </div>
            <p className={`text-xl font-semibold ${category === data.category ? "text-primary" : "text-textColor"} group-hover:text-primary`}>{data.title}</p>
        </motion.div>
    )
}

export default FilterSection