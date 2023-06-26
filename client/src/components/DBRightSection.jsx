import React from 'react'
import {DBHeader, DBHome, DBItems, DBNewItem, DBOrders} from '../components'
import { Route, Routes } from 'react-router-dom'

const DBRightSection = () => {
  return (
    <div className='flex flex-col py-12 px-12 flex-1 h-full'>
        <DBHeader/>
        <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
            <Routes>
                <Route path='/home' element={<DBHome/>}/>
                <Route path='/orders' element={<DBOrders/>}/>
                <Route path='/items' element={<DBItems/>}/>
                <Route path='/newItems' element={<DBNewItem/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default DBRightSection