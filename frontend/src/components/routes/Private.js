import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/auth";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { toast } from "react-hot-toast";

export default function PrivateRoute() {
  const params = useParams();
  const [ok, setOk] = useState(false);
  const [ok2, setOk2] = useState(false);
  const [auth] = useAuthContext();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/users/user-auth");
        if (res.data.ok) {
          setOk(true);
          const { data } = await axios.get(`/api/users/orders`);
          if (data && params.slug !== "") {
            let hasMatchingCourse = false;
            data.forEach((o) => {
              const matchingCourses = o.courses.filter((c) => c.slug === params.slug && o.status==="Unlocked");
              if (matchingCourses.length > 0) {
                hasMatchingCourse = true;
              }
              const matchingCourses2 = o.courses.filter((c) => c.slug === params.slug && o.status!=="Unlocked");
              if (matchingCourses2.length > 0) {
                toast.error('The Course is Yet Not Unlocked!! Please Wait for Few days')
              }
            });
            setOk2(hasMatchingCourse);
          }
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(error);
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token, params.slug]);

  return ok ? (
    params.slug !== "" && ok2 ? (
      <Outlet />
    ) : !params.slug ? (
      <Outlet />
    ) : (
      <Spinner path="" />
    )
  ) : (
    <Spinner path="" />
  );
}
