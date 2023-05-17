import React from 'react'
import { useState,useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import InstructorForm from '../../components/Form/InstructorForm'
import {} from 'antd'
import InstructorCard from '../../components/Layout/InstructorCard'
import { Link } from 'react-router-dom'


const CreateInstructor = () => {
  const [instructor,setInstructor]=useState([])
  const [instructorName,setName]=useState('')
  const [instructorDetails,setDetails]=useState('')
  const [photo,setPhoto]=useState("")


  //Handle Form SUbmit

  const handleSubmit= async(e)=>{
    e.preventDefault()

    try {
      const instructorData=new FormData()
      instructorData.append("instructorName",instructorName)
      instructorData.append("instructorDetails",instructorDetails)
      instructorData.append("photo",photo)
      const {data}= await axios.post('/api/instructor/create-instructor',instructorData)

      
      if(data?.success){
        toast.success(`${instructorName} Instructor Added`)
        setName('')
        setDetails('')
        setPhoto('')
        getAllInstructor()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
  }

  //Getting All Instructors

  const getAllInstructor = async()=>{
    try {
      const instructors= await axios.get('/api/instructor/all-instructors')
      console.log(instructors.data.instructors)
      if(instructors.data.success){
        setInstructor(instructors.data.instructors)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    getAllInstructor()
    // eslint-disable-next-line
  },[])

  return (
    <Layout title={'DashBoard - Add Instructor'}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-8">
                <h1>Manage Instructor</h1>
                  <div className="p-3 w-50">
                    <InstructorForm handleSubmit={handleSubmit} name={instructorName} details={instructorDetails} setName={setName} setDetails={setDetails}
                    photo={photo} setPhoto={setPhoto}/>
                  </div>
                </div>
                {instructor.map((inst)=>(
                      <Link key={inst._id} to={`/dashboard/admin/instructor/${inst.slug}`} className='instructor-link'>
                        <InstructorCard instructor={inst}/>
                      </Link>
                  ))}
            </div>
        </div>
    </Layout>
  )
}

export default CreateInstructor
