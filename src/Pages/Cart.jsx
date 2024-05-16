import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../Redux/slice/cartSlice'

function Cart() {
  const cartArray = useSelector((state=>state.cartReducer))
 const dispatch=useDispatch()
const navigate = useNavigate()
const [total,setTotal]=useState(0)

const getCartTotal=()=>{
  if(cartArray.length>0){
    setTotal(cartArray.map(item=>item.price).reduce((p1,p2)=>p1+p2))
  }else{
    setTotal(0)
  }
}

useEffect(()=>{
  getCartTotal()
},[cartArray])


const handleCart=()=>{
  dispatch(emptyCart())
  alert("order placed successfully...Thank You For Purchasing")
 navigate('/')
}

  return (
    <div style={{marginTop:'50px'}} className='ms-5'>
      {
        cartArray.length>0?
        
        <div className="row">
          <div className="col-lg-8">
             <table className='table shadow rounded '>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>price</th>
                  <th>Action</th>
                </tr>
              </thead>
        <tbody>
          {
            cartArray.map((product,index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{product.title}</td>
                <td><img height={'200px'} width={'200px'} src={product.thumbnail} alt="" /></td>
                <td>{product.price}</td>
                <td><button className='btn' onClick={()=>dispatch(removeFromCart(product.id))}><i className='fa-solid fa-trash text-danger '></i></button></td>
              </tr>
            ))
          }
        </tbody>
             </table>
          </div>
          <div className="col-lg-3">
            <div className="border mt-3 rounded shadow p-2 w-100">
              <h1 className='text-primary p-2'>Cart Summary</h1>
              <h4>Total Products: <span className='fs-2 text-success'>{cartArray.length}</span></h4>
              <h5>Total: <span className='text-danger fw-bolder fs-2'>${total}</span> </h5>
              <div className="d-grid">
                <button className='btn btn-success mt-5 rounded' onClick={handleCart}>Check Out</button>
              </div>
            </div>
          </div>
        </div>: <div style={{height:'100vh' }} className='w-100 d-flex flex-column jusify-content-center align-items-center'>
        <img height={'500px'} width={'500px'} src="https://supershopping.lk/images/home/Cart-empty.gif" alt="" />
        <h3 className='text-center text-danger'>Whishlist Is Empty!!</h3>
        <Link style={{textDecoration:'none'}}className='btn btn-warning rounded' to={'/'}>Back to Home</Link>
      </div>
      }

    </div>
  )
}

export default Cart