import React,{useState,useEffect} from 'react';
import Layout from './../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuthContext  } from '../context/auth';
import { Link, useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";


const CartPage = () => {
    const [cart,setCart] = useCart([]);
    const [courses,setCourses] = useState([]);
    const [auth] = useAuthContext();
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate  = useNavigate();

    const getCoursesInCart = async()=>{
      const list=[]
      for(let i=0;i<cart.length;i++){
        let s=cart[i].slug
        let {data}=await axios.get(`/api/course/get-course/${s}`)
        list.push(data.course)
      }
      setCourses(list)
    }

    useEffect(()=>{
      getCoursesInCart()
      // eslint-disable-next-line
    },[cart])

    // sum of prices
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => (total = total + item.price))
            return total;
        } catch (error) {
            console.log(error);
        }
    }



    // delete item
    const removeCartItem = (cid) =>  {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === cid);
            myCart.splice(index,1)
            setCart(myCart); 
            localStorage.setItem('cart',JSON.stringify(myCart));
            toast.success("Item Removed from Cart");
        } catch (error) {
            console.log(error);
        }
    }


  


     //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/course/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);




  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/course/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate(`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}/orders`);
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
                        {courses?.map((c) => (
                            <div className="card m-2" style={{width: '18rem'}} key={c._id}>
                                <Link key={c._id} to={`/course/${c.slug}`} className='course-link'>
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <span className="card-title">{c.instructor.instructorName}</span>
                                    <p className="card-text"><strong> ₹{c.price}</strong></p>
                                </div>
                                
                              </Link>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(c._id)}>Remove</button>
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
                        {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
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
                <div className="mt-2">
                
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default CartPage