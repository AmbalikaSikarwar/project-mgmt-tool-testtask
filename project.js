import React,{useState, useEffect} from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Project() {

const projectList = [
   {
    id: 1,   
    project: 'Project 1'
   },
   {
       id: 2,
       project: "project 2"
   },
   {
    id: 3,   
    project: 'Project 3'
   },
   {
       id: 4,
       project: "project 4"
   }

];

const navigate = useNavigate()
const [input, setInput] = useState("")
const [data, setData] = useState(projectList)
const [editing, setEditing] = useState()
const [updateProject, setUpdateProject] = useState()

useEffect(() => {
  localStorage.setItem("project", JSON.stringify(data));
}, [data]);



const  handleUpdate = (e) =>{
   setUpdateProject(e.target.value)
}

const handleClick = () => {
    console.log("adding data")
    const projects = input;
    const ids = data.map((post) => {
      return post.id;
    });
      const id = Math.max.apply(null, ids) + 1;
    const post = { id: id, project: projects };
    data.push(post);
    console.log("data",data)
    setData([...data]);
    
  };

  const deleteUser = (id) => {
    console.log("delete data", id)
    const ids = id
    setData(data.filter((item) => item.id !== ids))
  }

  const editUser = (id, project) => {
    console.log("editpost", id,project)
    setEditing(id);
    setUpdateProject(project)
    console.log(updateProject)
    // setData({id:id, project:project})
  } 

 const updateProjects = (id, project) => {
   console.log("update", project)
   setEditing();
   const upddata = data?.find(item => (item.id == id))
   console.log(99999,upddata)
   upddata.project = updateProject 
   console.log(project)
   const change = data.map((oldproject) => {
    if (oldproject.id == id)
    {
      return upddata
    }
   else {
     return oldproject 
   }
 
   })
   setUpdateProject(change)

  }

 const filterProject = (id) => {
   navigate(`/feature/${id}`)

 } 

  return (
    <div>
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardBody>
        <MDBCardTitle>PROJECTS </MDBCardTitle>
        <MDBCardText>
        {
            data.map(proj => { 
             return (
             <div>
             {
              editing == proj.id ? (
             <div>
             <input type="text"
             value={updateProject}
             onChange={handleUpdate}/>

            <button class="btn btn-outline-info" onClick={() => {
              updateProjects(proj.id, proj.project)
            }}>
            Update
            </button> 
             <br />
             </div>
             ) : (
               <div>
               <p onClick={() => {filterProject(proj.id)}}>{proj.id} {proj.project}</p>
              <button class="btn btn-outline-info" onClick={() => editUser(proj.id, proj.project)}>Edit</button>{" "}
              <button class="btn btn-outline-info" onClick={()=>{deleteUser(proj.id)}} > Delete</button>
                 
              </div>
             )
            }
             
             </div>             
                )
            })
        }
        <p><input type="text" onChange = {(e) => setInput(e.target.value)}  placeholder="Add Project"></input><button onClick={handleClick} class="btn btn-outline-dark">+</button></p>  
        
        </MDBCardText>
        
      </MDBCardBody>
    </MDBCard>
    </div>
  )
}

export default Project;
