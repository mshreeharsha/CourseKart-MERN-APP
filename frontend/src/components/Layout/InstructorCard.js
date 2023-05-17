import React from 'react'


const InstructorCard = ({instructor}) => {
    console.log(instructor.courses)
  return (
  <div className="card">
    <div className="card-header col-sm-5">
      <h3 className="card-title">{instructor.instructorName}</h3>
    </div>
    <div className="card-body">
      <div className="row">
      <div className="col-sm-2 text-center">
        <div style={{ display: 'inline-block' }}>
            <img className="img-fluid rounded-circle" src={`/api/instructor/instructor-photo/${instructor._id}`} alt={instructor.instructorName} />
        </div>
      </div>

        <div className="col-sm-10">
          <h4>Courses Handled</h4>
          <ul key={instructor._id} className="list-group">
            {instructor.courses.length > 0 ?(instructor.courses.map((i)=>(
              <li key={i._id} className="list-group-item">{i.name}</li>
            ))):(
              <li key="noCourse">No Course Alloted</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InstructorCard
