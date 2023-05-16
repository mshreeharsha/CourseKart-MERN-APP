import React from 'react'
import Layout from '../components/Layout/Layout'
import '../styles/Homepage.css'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Checkbox,Radio} from 'antd'
import { Prices } from '../components/Prices'

const HomePage = () => {
  const [courses,setCourses]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])

  //Handling Filter by Category
  const handleFilter = async(value,id)=>{
    let all=[...categories]
    if(value){
      //when Checked
      all=all.push(id)
    }
    else{
      //When unChecked
      all=all.filter(c=>c!==id)
    }
    setChecked(all)
  }

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
      // eslint-disable-next-line
  },[])


  //Fetching all Courses
  const getAllCourses=async()=>{

    try {
      const {data}=await axios.get('/api/course/get-course')
      if(data?.success){
        setCourses(data?.courses)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    getAllCourses()
    // eslint-disable-next-line
  },[])
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
          <h4 className="text-center mt-4">Filter by Category</h4>
          <div className="d-flex flex-column ms-3">
            <Radio.Group onChange={(e)=>setRadio(e.target.radio)}>
              {Prices?.map((p)=>(
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>Courses</h1>
          <div className="d-flex flex-wrap">
          {courses?.map((c)=>(
                        <Link key={c._id} to={`${c.slug}`} className='course-link'>
                            <div className="card m-2" style={{width: '18rem'}} key={c._id}>
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <span className="card-title">{c.instructor.instructorName}</span>
                                    <p className="card-text"><strong> ₹{c.price}</strong></p>
                                    <button className='btn btn-outline-secondary'>Add to Cart</button>
                                </div>
                            </div>
                        </Link>
                    ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage