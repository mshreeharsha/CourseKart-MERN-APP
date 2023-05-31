import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Dropdown } from 'react-bootstrap';
const UnlockedCourse = () => {
  const params = useParams();
  const [course, setCourse] = useState(null);

  const getCourseDetails = async () => {
    try {
      const { data } = await axios.get(`/api/course/get-course/${params.slug}`);
      if (data && data.course) {
        setCourse(data.course);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseDetails();
    // eslint-disable-next-line
  }, [params.slug]);

  return (
    <Layout>
      <div className="container">
        {course ? (
          <>
            <h1>Welcome to {course.name}</h1>
            <div className="d-flex justify-content-between">
              <div className='col-md-7'>
                <div>
                  <h2>About the Course</h2>
                  <p>{course.description}</p>
                </div>
                <div>
                  <h3>Total Duration</h3>
                  <h5>{course.duration} Hours</h5>
                </div>
                <div>
                  <h2>About the Instructor</h2>
                  {course.instructor && (
                    <>
                      <h4>{course.instructor.instructorName}</h4>
                      <p>{course.instructor.instructorDetails}</p>
                    </>
                  )}
                </div>
                <div>
                  {course.topics && (
                    <ul>
                      {course.topics.split('|').map((topic, index) => (
                        <Dropdown key={index}>
                          <Dropdown.Toggle variant="outline-secondary" id={`dropdown-${index}`} className='custom-dropdown-toggle'>
                            Week {index + 1} : {topic}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item disabled>Will be Uploaded Soon</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
              <div className='col-md-3'>
                <h2>Contents</h2>
                <div>
                  {course.topics && (
                    <ul>
                      {course.topics.split('|').map((topic, index) => (
                        <li key={index}>Week {index+1} : {topic}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
          </div>
          </>
        ) : (
          <p>Loading course details...</p>
        )}
      </div>
    </Layout>
  );
};

export default UnlockedCourse


