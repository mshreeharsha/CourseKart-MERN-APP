import React,{useEffect,useState} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Courses = () => {
    const [course,setCourse]=useState([])

    const getAllCourses = async()=>{
        try {
            const {data}= await axios('/api/course/get-course')
            if(data?.success){
                setCourse(data?.courses)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        getAllCourses()
    },[])
    
  return (
    <Layout title={"Dashboard - All Courses"}>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className="text-center">ALL COURSES LIST</h1>
                <div className="d-flex flex-wrap">
                    {course?.map((c)=>(
                        <Link key={c._id} to={`/dashboard/admin/courses/${c.slug}`} className='course-link'>
                            <div className="card m-2" style={{width: '18rem'}} key={c._id}>
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <p className="card-title">{c.instructor.instructorName}</p>
                                    <p className="card-text">Rs {c.price}</p>
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

export default Courses
