import Layout from '../../components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const Users = () => {

    const [users,setUsers]=useState([])

    //Get All Users
    const getAllUsers = async()=>{
        try {
            const {data}=await axios.get('/api/users/all-users')
            if(data){
                setUsers(data.users)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        getAllUsers()
    },[])
    console.log(users)
  return (
    <Layout title={'DashBoard - Users'}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Users</h1>
                    <div className='row'>
                        {users.map((u)=>(
                            <div className="card m-2" key={u._id} style={{width:'400px'}}>
                                <div className="card-body">
                                    <h4 className="card-title">{u.name}</h4>
                                    <p className="card-text"><strong>Email :</strong> {u.email}</p>
                                    <p className="card-text"><strong>Phone No : </strong>{u.phone}</p>
                                    <p className="card-text"><strong>Address :</strong>  {u.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
};

export default Users;
