

const InstructorForm = ({handleSubmit,details,name,setName,setDetails}) => {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter the Instructor Name'/>
        </div>
        <div className="mb-3">
            <textarea className="form-control" placeholder='Enter Details' rows={3} value={details} onChange={(e)=>setDetails(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default InstructorForm
