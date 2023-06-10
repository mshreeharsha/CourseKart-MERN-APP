import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuthContext } from "../../context/auth";
import { Link,useNavigate } from "react-router-dom";
import moment from "moment";

const Orders = () => {
  const navigate=useNavigate()
  const [orders, setOrders] = useState([]);
  const [auth] = useAuthContext();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/users/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  
  return (
    <Layout title={"Dashboard - User Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
          <div>
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  {o.cancelled!==1 && <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      </tr>
                    </tbody>
                  </table>}
                  <div className="d-flex flex-row flex-wrap">
                    {o.cancelled!==1 && o?.courses?.map((c,i) => (
                      <div className="card m-2" style={{width: '25rem'}} key={i}>
                      <Link key={c._id} to={`/course/${c.slug}`} className='course-link'>
                        <div className="d-flex">
                        <div className="col-md-6">
                          <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                        </div>
                        <div className="col-md-6 card-body">
                          <h5 className="card-title">{c.name}</h5>
                          <span className="card-title">{c.instructor.instructorName}</span>
                          <p className="card-text"><strong> ₹{c.price}</strong></p>
                        </div>
                        </div>
                    </Link>
                      {o.status === "Unlocked"?(<div className="border border-info-subtle border-4 p-2 mb-2" style={{maxHeight:'30vh'}}>
                        <p>The Course Is <strong>Unlocked Now</strong></p>
                        <p>U can Access the Contents</p>
                        <button className="btn btn-warning"
                        onClick={()=>{
                          navigate(`/dashboard/user/UnlockedCourses/${c.slug}`)
                        }}>Access the Contents</button>
                      </div>):(<div className="border border-info-subtle border-4 p-2 mb-2" style={{maxHeight:'30vh'}}>
                        <p>The Course Is <strong>Not Yet Unlocked</strong></p>
                        <p>It will be Accessible in Few Days</p>
                      </div>)}
                    </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h1 className="text-center">Cancelled Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  {o?.cancelled===1 && <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      </tr>
                    </tbody>
                  </table>}
                  <div className="d-flex flex-row flex-wrap">
                    {o?.cancelled===1 && o?.courses?.map((c,i) => (
                      <div className="card m-2" style={{width: '25rem'}} key={i}>
                      <Link key={c._id} to={`/course/${c.slug}`} className='course-link'>
                        <div className="d-flex">
                        <div className="col-md-6">
                          <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                        </div>
                        <div className="col-md-6 card-body">
                          <h5 className="card-title">{c.name}</h5>
                          <span className="card-title">{c.instructor.instructorName}</span>
                          <p className="card-text"><strong> ₹{c.price}</strong></p>
                        </div>
                        </div>
                    </Link>
                    </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;