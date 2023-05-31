import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuthContext } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
//AdminOrders
const AdminOrders = () => {
  const navigate=useNavigate()
  const [status] = useState([
    "Not Process",
    "Processing",
    "Unlocked"
  ]);
  //const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth] = useAuthContext();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/users/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/users/orders-status/${orderId}`, {
        status: value,
      });
      if(data){
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(orders)
  return (
    <Layout title={"All Orders Information"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
        <div className="col-md-9">
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
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.courses?.length}</td>
                    </tr>
                  </tbody>
                </table>}
                <div className="container d-flex flex-row">
                  {o.cancelled!==1 && o?.courses?.map((c) => (
                    
                      <div className="card m-2" style={{width: '18rem'}} key={c._id} 
                      onClick={()=>{
                        navigate(`/dashboard/admin/courses/${c.slug}`)
                      }}>
                               
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <span className="card-title">{c.instructor.instructorName}</span>
                                    <p className="card-text"><strong> ₹{c.price}</strong></p>
                                </div>
                      </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Cancelled Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                {o.cancelled===1 && <table className="table">
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
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.courses?.length}</td>
                    </tr>
                  </tbody>
                </table>}
                <div className="container d-flex flex-row">
                  {o.cancelled===1 && o?.courses?.map((c) => (
                    
                      <div className="card m-2" style={{width: '18rem'}} key={c._id} 
                      onClick={()=>{
                        navigate(`/dashboard/admin/courses/${c.slug}`)
                      }}>
                               
                                <img src={`/api/course/course-photo/${c._id}`} className="card-img-top" alt={c.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <span className="card-title">{c.instructor.instructorName}</span>
                                    <p className="card-text"><strong> ₹{c.price}</strong></p>
                                </div>
                      </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;