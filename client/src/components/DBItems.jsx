import React from 'react'
import {DataTable} from '../components'
import { HiCurrencyRupee } from '../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductById, getAllProducts } from '../api/index'
import { alertNull, alertSuccess } from '../context/actions/alertActions'
import { setAllProducts } from '../context/actions/productActions'

const DBItems = () => {
  const products = useSelector((state)=>state.products);
  const dispatch = useDispatch();

  return (
    <div className='flex items-center justify-self-center gap-4 pt-6 w-full'>
      <DataTable columns={[
        {title:"Image", field:"imageURL", render:(rowData)=>(
          <img src={rowData.imageUrl} className='w-32 h-16 object-contain rounded-md'></img>
        )},{
          title:"Name",
          field:"product_name"
        },{
          title:"Category",
          field:"product_category"
        },
        {
          title:"Price",
          field:"product_price",
          render:(rowData)=>(
            <p className='text-2xl font-semibold text-textColor flex items-center justify-center'>
              <HiCurrencyRupee className='text-red-400'/>
              {rowData.product_price}.00
            </p>
          )
        }
      ]} data={products} 
      title="List of products"
      actions={[
        {
          icon:"edit",
          tooltip:"Edit Data",
          onClick:(event, rowData) =>{
            alert("You want to edit " + rowData.id);
          }
        },
        {
          icon:"delete",
          tooltip:"Delete Data",
          onClick:(event, rowData) =>{
            if(window.confirm("Are you sure you want to delete")) {
              deleteProductById(rowData.id).then(()=>{
                dispatch(alertSuccess("Data deleted successfully!!"));
                setTimeout(()=>{dispatch(alertNull())}, 3000)

                getAllProducts().then((data)=>{
                  dispatch(setAllProducts(data));
                })
              }); 
            }
          }
        }
      ]}
      
      
      />
    </div>
  )
}

export default DBItems