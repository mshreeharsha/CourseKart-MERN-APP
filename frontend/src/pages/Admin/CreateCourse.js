import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom'
const {Option}=Select


const CreateCourse = () => {
  const [categories,setCategories] = useState([])
  const [instructors,setInstructors] = useState([])
  const [photo,setPhoto]=useState("")
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("")
  const [instructor,setInstructor]=useState("")
  const [duration,setDuration]=useState("")
  const [accessible,setAccessible]=useState("")
  const [topics,setTopics]=useState("")
  const navigate=useNavigate()

  //Getting all category
  const getAllCategory = async () => {
    try {
        const {data} = await axios.get('/api/category/get-category')
        if(data?.success)
        {
            setCategories(data?.category);
        }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    getAllCategory();
      // eslint-disable-next-line
  },[])

  //Getting all Instructors
  const getAllInstructor = async () => {
    try {
        const {data} = await axios.get('/api/instructor/all-instructors')
        if(data?.success)
        {
            setInstructors(data?.instructors);
        }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    getAllInstructor();
      // eslint-disable-next-line
  },[])


  //Creating a Course
  const handleCreate = async(e)=>{
    e.preventDefault()
    try {
      const t=topics.replace(/\n/g, '|');
      console.log(t)
      const courseData=new FormData()
      courseData.append("name",name)
      courseData.append("description",description)
      courseData.append("price",price)
      courseData.append("category",category)
      courseData.append("photo",photo)
      courseData.append("instructor",instructor)
      courseData.append("duration",duration)
      courseData.append("topics",t)
      courseData.append("accessible",accessible)
      const {data}=await axios.post('/api/course/create-course',courseData)

      if(data?.success){
        toast.success(`${name} Course Added`)
        setName("")
        setDescription("")
        setCategory("")
        setInstructor("")
        setAccessible("")
        setPrice("")
        setDuration("")
        setTopics("")
        navigate('/dashboard/admin/courses')
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
  }

  return (
    <Layout title={'DashBoard - Create Course'}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                <h1>Create Course</h1>
                <div className="m-1 w-75">
                  <Select bordered={false} placeholder="Select a Category" 
                  size="large" showSearch className='form-select mb-3 border-dark'
                  onChange={(value)=>{
                    setCategory(value)
                  }}>
                     {categories?.map((c)=>(
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                     ))}
                  </Select>
                  <div className="mb-3">
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo?photo.name : "Upload Photo"}
                      <input type="file" name="photo"accept="images/*" onChange={(e)=>{
                        setPhoto(e.target.files[0])
                      }} hidden/>
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt={"Course Pic"}
                        height={"200px"}
                        className='img img-responsive'/>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input type="text" value={name} placeholder='Course Name'
                    className='form-control border-dark'
                    onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <textarea value={description} placeholder='Course Description'
                    className='form-control border-dark'
                    onChange={(e)=>setDescription(e.target.value)} rows={4}></textarea>
                  </div>
                  <div className="mb-3">
                    <input type="number" value={price} placeholder='Course Price'
                    className='form-control border-dark'
                    onChange={(e)=>setPrice(Math.abs(e.target.value))}/>
                  </div>
                  <div className="mb-3">
                    <Select bordered={false} placeholder="Select a Instructor" 
                  size="large" showSearch className='form-select mb-3 border-dark'
                  onChange={(value)=>{
                    setInstructor(value)
                  }}>
                     {instructors?.map((c)=>(
                      <Option key={c._id} value={c._id}>
                        {c.instructorName}
                      </Option>
                     ))}
                  </Select>
                  </div>
                  <div className="mb-3">
                    <input type="number" value={duration} placeholder='Duration of the Course in hrs'
                    className='form-control border-dark'
                    onChange={(e)=>setDuration(Math.abs(e.target.value))}/>
                  </div>
                  <div className="mb-3">
                    <textarea value={topics} placeholder='Course Content Topics'
                    className='form-control border-dark'
                    onChange={(e)=>setTopics(e.target.value)} rows={6}></textarea>
                  </div>
                  <div className="mb-3">
                    <Select bordered={false} placeholder="Select Accessibility" 
                    size="large" showSearch className='form-select mb-3 border-dark'
                    onChange={(value)=>{
                      setAccessible(value)
                    }}>
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className='btn btn-primary' onClick={handleCreate}>
                      CREATE COURSE
                    </button>
                  </div>
                </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCourse
