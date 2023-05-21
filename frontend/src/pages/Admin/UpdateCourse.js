import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from 'antd'
import { useNavigate,useParams } from 'react-router-dom'
const {Option}=Select

const UpdateCourse = () => {
    const [categories,setCategories] = useState([])
    const [instructors,setInstructors] = useState([])
    const [photo,setPhoto]=useState("")
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [duration,setDuration]=useState("")
    const [instructor,setInstructor]=useState("")
    const [accessible,setAccessible]=useState("")
    const [id,setId]=useState('')
    const [topics,setTopics]=useState("")
    const navigate=useNavigate()
    const params=useParams()
  
    //Get Single Course
    const getSingleCourse = async()=>{
        try {
            const {data}= await axios(`/api/course/get-course/${params.slug}`)
            setName(data.course.name)
            setId(data.course._id)
            setDescription(data.course.description)
            setCategory(data.course.category._id)
            setPrice(data.course.price)
            setDuration(data.course.duration)
            setInstructor(data.course.instructor._id)
            setTopics(data.course.topics.replace(/\|/g, '\n'));
            setAccessible(data.course.accessible)
            console.log(data.course.topics)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        getSingleCourse()
        // eslint-disable-next-line
    },[])

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
  
  
    //Updating a Product
    const handleUpdate = async(e)=>{
      e.preventDefault()
  
      try {
        const t=topics.replace(/\n/g, '|');
        const courseData=new FormData()
        courseData.append("name",name)
        courseData.append("description",description)
        courseData.append("price",price)
        courseData.append("category",category)
        photo && courseData.append("photo",photo)
        courseData.append("instructor",instructor)
        courseData.append("duration",duration)
        courseData.append("accessible",accessible)
        courseData.append("topics",t)
        const {data}=await axios.put(`/api/course/update-course/${id}`,courseData)
  
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
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
  
    //Deleting a Course
    const handleDelete = async()=>{
        try {
            let answer=window.prompt("Do You Want to Delete This Course?")
            if(answer!=="yes")return;
            const {data}=await axios.delete(`/api/course/delete-course/${id}`)
            if(data.success){
                toast.success(data.message)
                navigate('/dashboard/admin/courses')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div>
      <Layout title={'DashBoard - Update Course'}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                <h1>Update Course</h1>
                <div className="m-1 w-75">
                  <Select bordered={false} placeholder="Select a Category" 
                  size="large" showSearch className='form-select mb-3 border-dark'
                  onChange={(value)=>{
                    setCategory(value)
                  }} value={category}>
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
                    {photo?(
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt={"Course Pic"}
                        height={"200px"}
                        className='img img-responsive'/>
                      </div>
                    ):
                    (
                        <div className="text-center">
                          <img src={`/api/course/course-photo/${id}`} alt={"Course Pic"}
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
                  }}
                  value={instructor}>
                     {instructors?.map((c)=>(
                      <Option key={c._id} value={c._id}>
                        {c.instructorName}
                      </Option>
                     ))}
                  </Select>
                  </div>
                  <div className="mb-3">
                    <input type="number" value={duration} placeholder='Duration of Course in hrs'
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
                    }}
                    value={accessible ? "Yes":"No"}>
                      <Option key={"No"} value={0}>No</Option>
                      <Option key={"Yes"} value={1}>Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className='btn btn-primary' onClick={handleUpdate}>
                      UPDATE COURSE
                    </button>
                    <button className='btn btn-danger ms-2' onClick={handleDelete}>
                      DELETE COURSE
                    </button>
                  </div>
                </div>
                </div>
            </div>
        </div>
    </Layout>

    </div>
  )
}

export default UpdateCourse
