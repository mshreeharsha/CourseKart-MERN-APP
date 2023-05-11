import React from 'react'
import { useState,useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import InstructorForm from '../../components/Form/InstructorForm'
import {} from 'antd'
import Modal from 'antd/es/modal/Modal'


const CreateInstructor = () => {
  const [instructor,setInstructor]=useState([])
  const [instructorName,setName]=useState('')
  const [instructorDetails,setDetails]=useState('')
  const [visible,setVisible]=useState(false)
  const [selected,setSelected]=useState(null)
  const [updatedName,setUpdatedName]=useState('')
  const [updatedDetails,setUpdatedDetails]=useState('')


  //Handle Form SUbmit

  const handleSubmit= async(e)=>{
    e.preventDefault()

    try {
      const {data}= await axios.post('/api/instructor/create-instructor',{instructorName,instructorDetails})

      
      if(data?.success){
        toast.success(`${instructorName} Instructor Added`)
        getAllInstructor()
        setName('')
        setDetails('')
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


  //Updating the Instructor

  const handleUpdate = async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.patch(`/api/instructor/update-instructor/${selected._id}`,{instructorName:updatedName,instructorDetails:updatedDetails})

      if(data?.success){
        toast.success(data.message)
        setSelected(null)
        setUpdatedDetails('')
        setUpdatedName('')
        setVisible(null)
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

  //Deleting the Instructor
  const handleDelete = async(inst)=>{
    try {
      const {data}=await axios.delete(`/api/instructor/delete-instructor/${inst._id}`)

      if(data?.success){
        toast.success(`${inst.instructorName}'s details deleted `)
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
                    <InstructorForm handleSubmit={handleSubmit} name={instructorName} details={instructorDetails} setName={setName} setDetails={setDetails}/>
                  </div>
                </div>
                <div className="col-md-9 mx-auto">
                  <table className="table table-hover table-bordered table-responsive">
                    <thead>
                      <tr>
                        <th scope="col" style={{"textAlign":"center"}}>Name</th>
                        <th scope="col" style={{"textAlign":"center"}} >Details</th>
                        <th scope="col" style={{"textAlign":"center"}} >Courses</th>
                        <th scope="col" style={{"textAlign":"center","width": "20%"}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {instructor.map((inst)=>(
                      <>
                        <tr key={inst._id}>
                          <td>{inst.instructorName}</td>
                          <td>{inst.instructorDetails}</td>
                          <td><ul>{inst.courses.length> 0 ?(inst.courses.map((cname)=>(
                            <li key={cname}>{cname}</li>
                          ))):<li key={"Nocourse"}>{"No Course Alloted"}</li>}</ul></td>
                          <td>
                          <button className='btn btn-primary ms-2'
                             onClick={() => {setVisible(true) ;
                               setUpdatedName(inst.instructorName);
                               setUpdatedDetails(inst.instructorDetails);
                               setSelected(inst)
                              }}
                             >Edit</button>
                            {inst.courses.length===0 && <button className='btn btn-danger ms-2' onClick={()=>{
                              handleDelete(inst)
                            }}>Delete</button>}
                          </td>
                        </tr>
                      </>
                        ))}
                      
                    </tbody>
                  </table>
                </div>
                <Modal onCancel={()=>setVisible(false)} 
                footer={null} 
                open={visible}
                >
                  <InstructorForm 
                  name={updatedName} details={updatedDetails} setName={setUpdatedName} setDetails={setUpdatedDetails}
                  handleSubmit={handleUpdate}
                  />
                </Modal>
            </div>
        </div>
    </Layout>
  )
}

export default CreateInstructor
