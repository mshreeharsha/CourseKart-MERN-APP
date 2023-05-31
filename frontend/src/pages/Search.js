import React from 'react'
import Layout from './../components/Layout/Layout'
import {useSearch} from '../context/search'
import { useCart } from '../context/cart'
const Search = () => {
    const [cart,setCart] = useCart()
    const [values,setValues] = useSearch();
  return (
    <Layout title = {"Search Results"}>
        <div className='container'>
            <div>
                <h1>
                    Search Results
                </h1>
                <h6>
                    {values?.results.length < 1 ? "No Courses Found" : `Found ${values?.results.length} `}
                </h6>
                <div className="d-flex flex-wrap mt-4">
              {values?.results.map((c)=>(
                       
                            <div className="card m-2" style={{width: '18rem'}} key={c._id}>
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <span className="card-title">{c.instructor.instructorName}</span>
                                    <p className="card-text"><strong> ₹{c.price}</strong></p>
                                    <button className='btn btn-outline-secondary'
                                     onClick={() => {
                                      setCart([...cart,c])
                                      localStorage.setItem('cart',JSON.stringify([...cart,c]))
                                      }}>
                                      Add to Cart
                                    </button>
                                </div>
                            </div>
                        
                    ))}
          </div>
            </div>
        </div>

    </Layout>
  )
}

export default Search