import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CourseDetails = () => {

    //to obtain Slug from the URL
    const params=useParams()

    const [course,setCourse]=useState({})

    const[relCourses,setRelCourses] = useState([])
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
        if(params.slug)getCourse()
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

  return (
    <Layout>
        <h1 className='text-center'>{course.name}</h1>
        <div className="container d-flex flex-row" style={{marginTop:'50px'}}>
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
            <div className="col-mt-3 border border-info-subtle border-4 p-2 mb-2" style={{ marginLeft: '20px' }}>
                <h2>Description</h2>
                <div><p style={{fontSize:'18px'}}>{course.description}</p></div>
            </div>
        </div>
        <div className="container" style={{marginTop:'50px'}}>
            <div className="row">
                <h2>Course Content</h2>
            </div>
        </div>
        <div>
            <h1>Similar Products</h1>
            {JSON.stringify(relCourses,null,4)}
        </div>
    </Layout>
  )
}

export default CourseDetails
