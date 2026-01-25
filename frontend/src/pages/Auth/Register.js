import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import {toast} from 'react-hot-toast';
import '../../styles/Register.css';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import axios from 'axios';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register',
      {name,email,password,phone,address})
      if(res.data.success)
      {
        toast.success(res.data.message,{
          duration: 5000
        })
        navigate('/login')
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <Layout title="Register CourseKart App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleName"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3 passwordBlock">
            <input
              type={showPassword ? "text":"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
            <button
              type="button"
              className="btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </button>
          </div>
          <div className="mb-3">
            <div className="passwordBlock">
              <input
                type={showConfirmPassword ? "text":"password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                id="exampleInputRePassword1"
                placeholder="Re-enter Your Password"
                required
                onBlur={() => {
                  if (confirmPassword && confirmPassword !== password) {
                    setConfirmPasswordError("Passwords do not match");
                  } else {
                    setConfirmPasswordError("");
                  }
                }}
              />
              <button
                type="button"
                className="btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </button>
            </div>
              {confirmPasswordError && (
                <div className="text-danger mt-1">
                  {confirmPasswordError}
                </div>
              )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhoneNo"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;