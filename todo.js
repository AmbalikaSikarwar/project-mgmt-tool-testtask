import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

const Todo = () => {
    const {id} = useParams()
    console.log(id)

    let initTodo;
  if (localStorage.getItem("todo") === null) {
    initTodo = [];
  }
  
  else {
     initTodo = JSON.parse(localStorage.getItem("todo"));
  }

    const [isVisible, SetIsVisible] = useState(null)
    const [todo, Settodo]= useState(initTodo);
    const [name, SetName] =  useState("");
    const [newName, SetNewName] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo])

    const addtodo = (name) => {
      console.log("name",name)
          let sno;
          if (todo.length === 0) {
            sno = 0;
          }
          else {
            sno = todo[todo.length - 1].sno + 1;
          }
      
          const mytodo = {
            sno: sno,
            name:name,
            projectId : id
            
          }
          SetName("")
          Settodo([...todo, mytodo]);
          console.log(mytodo);
        }

      const deletetodo = (id) =>{
        console.log("id",id)
        Settodo(todo.filter((item)=>item.sno != id));
      }
      const handleEdit=(id,name)=>{
        SetNewName(name)
        SetIsVisible(id)
      }
      
      const handleUpdate=(id)=>{
        const upttodo = todo.find((data)=>data.sno == id)
        upttodo.name = newName 
        const todos = todo.map((data)=>{
          if(data.sno == id){
            return upttodo
          }
          else{
            return data
          }
        })
        console.log(56565,upttodo)
        Settodo(todos)
        SetIsVisible()
      }

      const updateValue = (e)=>{
        SetNewName(e.target.value)
      }
      const handleNavigate = () =>{
        navigate("")
      }
     const backward = () => {
         navigate(`/feature/${id}`)
     }

    const handleOnChange = () =>{
      setIsChecked(!isChecked);
    }

  
  return (
    <div>
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardBody>
      <MDBCardTitle>TODOS</MDBCardTitle>
      <MDBCardText> 
      <div>
          {todo.filter((data)=>data.projectId==id).map((data, index)=>{
           return(
               <div key={index} >
               {isVisible === data.sno?
              <div>
                <input type="text" value={newName}  onChange={(e)=>updateValue(e)}/>
               <button class="btn btn-outline-info" onClick={()=>handleUpdate(data.sno, data.name)}>update</button>
              </div>
               :
             <div key={index} >
                <p> {isChecked ? <del>{data.name}</del> : data.name}</p>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="checkbox" checked={isChecked} onChange = {handleOnChange}></input>{" "}
                <button  class="btn btn-outline-info" onClick={()=>handleEdit(data.sno,data.name)}>Edit</button>&nbsp;&nbsp;
               <button onClick={()=>deletetodo(data.sno)}  class="btn btn-outline-info" >Delete</button>
              
             </div>
              }
               </div>
           )
       })}
       
       </div>
         
       <hr />
        <input type="text" placeholder='Add todo' value={name} onChange={(e)=>SetName(e.target.value)}/>
        <button onClick={()=>addtodo(name)} class="btn btn-outline-dark" >+</button>
        <br />
        <button onClick={backward} class="btn btn-outline-dark" >Back</button>
    
        
        </MDBCardText>
       </MDBCardBody>
       </MDBCard>
        </div>
  )
}

export default Todo; 
