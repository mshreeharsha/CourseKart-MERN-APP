import React from 'react'
import Layout from '../components/Layout/Layout'
import '../styles/Homepage.css'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Checkbox,Radio} from 'antd'
import { Prices } from '../components/Prices'
import { Pagination } from '../components/CoursePagination'
import { useCart } from '../context/cart'

const HomePage = () => {
  const [cart,setCart] = useCart()
  const [courses,setCourses]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const limit=3
 
  //Handling Filter by Category
  const handleFilter = async(value,id)=>{
    console.log(value,id)
    let all=[...checked]
    if(value){
      //when Checked
      all.push(id)
    }
    else{
      //When unChecked
      all=all.filter((c)=>c!==id)
    }
    //Creating an Array of Category Id's which are been selected and stored in checked
    setChecked(all)
  }

  //Fetching Total No of Courses

  const getTotalCourses=async()=>{
    try {
      const {data}=await axios.get('/api/course/course-count')
      if(data?.success){
        setTotal(data?.total)
      }
    } catch (error) {
      console.log(error)
    }
  }


  //Load More

  const loadMore=async()=>{
    try {
      const {data}=await axios.get(`/api/course/course-list/${page}`)
      if(data?.success){
        setCourses([...data.courses])
      }
    } catch (error) {
      console.log(error)

    }
  }

  useEffect(()=>{
    loadMore()
    // eslint-disable-next-line
  },[page])
  // Fetching all categories
  const getAllCategory = async () => {
    try {
        const {data} = await axios.get('/api/category/get-category')
        if(data?.success)
        {
            setCategories(data?.category);
        }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
      getAllCategory();
      getTotalCourses();
      // eslint-disable-next-line
  },[])


  //Fetching all Courses
  const getAllCourses=async()=>{

    try {
      setLoading(true)
      const {data}=await axios.get(`/api/course/course-list/${page}`)
      setLoading(false)
      if(data?.success){
        setCourses(data?.courses)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    if(checked.length===0 && radio.length===0){
      getTotalCourses()//added
      getAllCourses()
    }
    // eslint-disable-next-line
  },[checked.length,radio.length])

  //Get Filtered Courses
  useEffect(()=>{
    if(checked.length>0 || radio.length>0){
      filterCourses()
    }
    // eslint-disable-next-line
  },[checked,radio])

  const filterCourses = async()=>{
    try {
      const {data}= await axios.post('/api/course/course-filter',{checked,radio})

      if(data?.success){
        console.log(data.courses)
        setCourses(data.courses)
        setTotal(data.courses.length)//added
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  

  return (
    <Layout title="Online Courses - CourseKart (Skill++)">
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
          {categories?.map((c)=>(
            <div className="d-flex flex-column ms-3">
              <Checkbox key={c._id} onChange={(e)=>{handleFilter(e.target.checked,c._id)}}>
              {c.name}
            </Checkbox>
            </div>
          ))}
          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex flex-column ms-3">
            <Radio.Group onChange={(e)=>{setRadio(e.target.value)}}>
              {Prices?.map((p)=>(
                <div key={p._id}>
                  {/*The Selected Option's Value that is the Price array is set to radio which is sent as a request*/ }
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-3 mt-3">
            <button className='btn btn-warning' onClick={()=>window.location.reload()}>RESET</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>Courses</h1>
          <div className="d-flex flex-wrap">
              {courses.map((c)=>(
                        <Link key={c._id} to={`${c.slug}`} className='course-link'>
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
                                      toast.success('Item Added to Cart')
                                      }}>
                                      Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
          </div>
          {courses.length > 0?"": <div className="text-center mt-5">
              <h2 className='text-center'>No Courses Available for This Filter</h2>
              </div>}
            {
              loading?"Loading...":
              courses.length > 0?<Pagination limit={limit} total={total} setPage={setPage}/>:""
            }
          {/* <div className='m-3 p-3'>
            {courses && courses.length<total &&(
              <button className='btn btn-warning'
              onClick={(e)=>{
                e.preventDefault()
                setPage(page+1)
              }}>
                {loading?"Loading ...":"Load More"}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage