
import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuthContext } from "../../context/auth";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate=useNavigate()
  //context
  const [auth ,setAuth] = useAuthContext()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  //get user data
  useEffect(()=>{
    console.log(auth)
    const {name,email,phone,address} = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    // eslint-disable-next-line
  },[auth?.user])
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put('/api/users/profile',
      {name,email,password,phone,address});
      if(data?.error){
        toast.error(data?.error);
      }
      else{
        setAuth({ ...auth,user: data?.updatedUser});
        let ls = localStorage.getItem("auth");  
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate('/dashboard/user')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={'DashBoard - User Profile'}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                  <div className="form-container ">
                    <form onSubmit={handleSubmit}>
                      <h4 className="title">USER PROFILE</h4>
                        <div className="mb-3">
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="form-control" id="exampleName" placeholder="Enter Your Name" 
                            autoFocus/>
                        </div>
                        <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                          className="form-control" id="exampleInputEmail" placeholder="Enter Your Email "   disabled/>
                        </div>
                        <div className="mb-3">
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password"
                            />
                       </div>
                        <div className="mb-3">
                          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="form-control" id="exampleInputPhoneNo" placeholder="Enter Your Phone" />
                        </div>
                        <div className="mb-3">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control"
                          id="exampleInputAddress" placeholder="Enter Your Address" />
                        </div>
                        <button type="submit" className="btn btn-primary">UPDATE</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile
