import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate,useParams } from 'react-router-dom'


const UpdatedInstructor = () => {
    const [photo,setPhoto]=useState("")
    const [instructorName,setInstructorName]=useState("")
    const [instructorDetails,setInstructorDetails]=useState("")
    const [courses,setCourses]=useState(null)
    const [id,setId]=useState('')
    const navigate=useNavigate()
    const params=useParams()
  
    //Get Single Course
    const getSingleInstructor = async()=>{
        try {
            const {data}= await axios(`/api/instructor/single-instructor/${params.slug}`)
            setInstructorName(data.instructor.instructorName)
            setInstructorDetails(data.instructor.instructorDetails)
            setCourses(data.instructor.courses)
            setId(data.instructor._id)
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        getSingleInstructor()
        // eslint-disable-next-line
    },[])
  
    //Updating the Instructor

  const handleUpdate = async(e)=>{
    e.preventDefault()
    try {
        const instructorData=new FormData()
        instructorData.append("instructorName",instructorName)
        instructorData.append("instructorDetails",instructorDetails)
        photo && instructorData.append("photo",photo)
        const {data}=await axios.patch(`/api/instructor/update-instructor/${id}`,instructorData)
  
        if(data?.success){
          toast.success(`${instructorName} Course Updated`)
          setInstructorName("")
          setInstructorDetails("")
          setCourses(null)
          navigate('/dashboard/admin/create-instructor')
        }
        else{
          toast.error(data.message)
        }
  
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
  }

  //Deleting the Instructor
  const handleDelete = async()=>{
    let ans=window.prompt("Do You Want to Delete This Course?")
    if(ans!=="yes")return;
    if(courses.length > 0 ){
        toast.error(`Can't Delete the Instructor ${instructorName}`)
        return;
    }
    try {
      const {data}=await axios.delete(`/api/instructor/delete-instructor/${id}`)

      if(data?.success){
        toast.success(`${instructorName}'s details deleted `)
        setInstructorDetails("")
        setInstructorName("")
        setCourses(null)
        navigate('/dashboard/admin/create-instructor')
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
    <div>
      <Layout title={'DashBoard - Update Instructor'}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                <h1>Update Instructor</h1>
                <div className="m-1 w-75">
                <div className="mb-3">
                    <input type="text" value={instructorName} placeholder='Instructor Name'
                    className='form-control border-dark'
                    onChange={(e)=>setInstructorName(e.target.value)}/>
                  </div>
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
                          <img src={`/api/instructor/instructor-photo/${id}`} alt={"Instructor Pic"}
                          height={"200px"}
                          className='img img-responsive'/>
                        </div>
                      )}
                  </div>
                  
                  <div className="mb-3">
                    <textarea value={instructorDetails} placeholder='Instructor Details'
                    className='form-control border-dark'
                    onChange={(e)=>setInstructorDetails(e.target.value)} rows={4}></textarea>
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

export default UpdatedInstructor
