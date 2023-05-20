import React from 'react'
import Layout from './../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuthContext  } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const CartPage = () => {
    const [cart,setCart] = useCart([])
    const [auth,setAuth] = useAuthContext()
    const navigate  = useNavigate()

    // sum of prices
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map(item => {total = total + item.price})
            return total
        } catch (error) {
            console.log(error)
        }
    }
    // delete item
    const removeCartItem = (cid) =>  {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === cid)
            myCart.splice(index,1)
            setCart(myCart); 
            localStorage.setItem('cart',JSON.stringify(myCart))
            toast.success("Item Removed from Cart")
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token && auth?.user.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length ? `You have ${cart.length} items in your cart ${
                            auth?.token ? "" : "please login to checkout"}`
                        :"Your Cart is Empty"}
                    </h4>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-9'>
                    <div className="d-flex flex-wrap">
                        {cart?.map((c) => (
                                <div className="card m-2" style={{width: '18rem'}} key={c._id}>
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <span className="card-title">{c.instructor.instructorName}</span>
                                    <p className="card-text"><strong> ₹{c.price}</strong></p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(c._id)}>Remove</button>
                                </div>
                                </div>
                            ))
                        }
                    </div>
                </div>    
                <div className='col-md-3 text-center'>
                    <h2>
                        Cart Summary
                    </h2>
                    <p>Checkout and Payment</p>
                    <hr/>
                    <h4>Total : {totalPrice()} </h4>
                    {auth?.user?(
                    <>

                    </>
                ) : (
                <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                    )}
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default CartPage