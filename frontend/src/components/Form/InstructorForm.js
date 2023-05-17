

const InstructorForm = ({handleSubmit,details,name,setName,setDetails,photo,setPhoto}) => {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter the Instructor Name'/>
        </div>
        <div className="mb-3">
            <textarea className="form-control" placeholder='Enter Details' rows={3} value={details} onChange={(e)=>setDetails(e.target.value)}/>
        </div>
        <div className="mb-3">
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo?photo.name : "Upload Photo"}
                      <input type="file" name="photo"accept="images/*" onChange={(e)=>{
                        setPhoto(e.target.files[0])
                      }} hidden/>
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt={"Course Pic"}
                        height={"200px"}
                        className='img img-responsive'/>
                      </div>
                    )}
                  </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default InstructorForm
