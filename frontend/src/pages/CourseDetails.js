import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'
const CourseDetails = () => {

    //to obtain Slug from the URL
    const params=useParams()

    const [course,setCourse]=useState({})

    const [cart,setCart] = useCart([])
    const[relCourses,setRelCourses] = useState([])
    const navigate= useNavigate()
    //Get Course
    const getCourse = async()=>{
        try {
            const {data}= await axios.get(`/api/course/get-course/${params.slug}`)
            if(data?.success){
                console.log(data.course)
                setCourse(data?.course)
                getSimilarCourse(data?.course._id,data?.course.category._id)
            }
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        if(params.slug){
            getCourse()
        }
        // eslint-disable-next-line
    },[params.slug])

    //get similar courses
    const getSimilarCourse = async(pid,cid) => {
        try {
            const {data} = await axios.get(`/api/course/related-courses/${pid}/${cid}`);
            setRelCourses(data?.courses);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(course)
  return (
    <Layout>
        <h1 className='text-center'>{course.name}</h1>
        <div className="container d-flex flex-row border border-info-subtle border-4 p-2 mb-2" style={{marginTop:'50px',maxWidth:'70%'}}>
            <div className="col-mt-3">
                <img
                src={`/api/course/course-photo/${course._id}`}
                className="card-img-top"
                alt={course.name}
                style={{ height: '200px', width: '200px' }}
                />
                <div className='text-center'>
                    <h3>
                        <strong>
                        ₹{course.price}
                        </strong>
                    </h3>
                </div>
            </div>
            <div className="col-mt-3" 
            style={{ marginLeft: '20px',maxWidth:'70%' }}>
                <h2>Description</h2>
                <div><p style={{fontSize:'18px'}}>{course.description}</p></div>
            </div>
        </div>
        <div className="container" style={{marginTop:'50px',maxWidth:'70%'}}>
            <div className="col-mt-3 border border-warning border-2 p-2 mb-2"
            style={{maxWidth:'50%'}}>
                <h2>Course Content</h2>
                <div>
                    {
                        course.topics && (
                            <ul>
                                {course && course.topics.split('|').map((topic, index) => (
                                    <li key={index}>{topic}</li>
                                ))}
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
        <div className="container" style={{marginTop:'50px',maxWidth:'70%'}}>
            <div className="col-mt-3 border border-danger-subtle border-2 p-2 mb-2">
                <h2>Instructor Details</h2>
                {
                    course.instructor && (
                        <div className='d-flex flex-row'>
                            <div className="col-mt-3 ms-6">
                                <img
                                src={`/api/instructor/instructor-photo/${course.instructor._id}`}
                                className="card-img-top"
                                alt={course.instructor.instructorName}
                                style={{ height: '200px', width: '200px' }}
                                />
                                <h4>{course.instructor.instructorName}</h4>
                            </div>
                            <div className='col-mt-6' style={{marginLeft:'10px'}}>
                                <div><p style={{fontSize:'18px'}}>{course.instructor.instructorDetails}</p></div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        <div className="container" style={{marginTop:'50px',maxWidth:'70%'}}>
            <h1>Similar Products</h1>
             <div className="d-flex flex-row">
              {relCourses.map((c)=>(
                        
                            <div className="card m-2" style={{width: '18rem'}} key={c._id}>
                                <Link key={c._id} to={`/course/${c.slug}`} className='course-link'>
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <span className="card-title">{c.instructor.instructorName}</span>
                                    <p className="card-text"><strong> ₹{c.price}</strong></p>
                                </div>
                                
                              </Link>
                              {cart.filter(item=>item._id===c._id).length===0?
                                (<button className='btn btn-outline-secondary'
                                     onClick={() => {
                                       setCart([...cart,c])
                                       localStorage.setItem('cart',JSON.stringify([...cart,c]))
                                       toast.success('Item Added to Cart')
                                       navigate('/cart')
                                      }}>

                                      Add to Cart
                                    </button>):(<button className='btn btn-outline-secondary' onClick={()=>navigate('/cart')}>Go To Cart</button>)}
                            </div>
                    ))}
          </div>
        </div>
    </Layout>
  )
}

export default CourseDetails
