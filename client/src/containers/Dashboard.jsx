import React from 'react'
import { DBLEftSection, DBRightSection } from '../components'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen flex items-center bg-primary'>
      <DBLEftSection/>
      <DBRightSection/>
    </div>
  )
}

export default Dashboard