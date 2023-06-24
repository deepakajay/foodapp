import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getAllUsers } from '../api';
import {setAllUserDetails} from '../context/actions/allUsersActions'

const DBUsers = () => {
  const allUsers = useSelector((state)=> state.allUsers);
  const dispatch = useDispatch()

  

  return (
    <div>DBUsers</div>
  )
}

export default DBUsers