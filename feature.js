import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

const Feature = () => {
    const {id} = useParams()
    console.log(id)

    let initFeature;
  if (localStorage.getItem("feature") === null) {
    initFeature = [];
  }
  
  else {
     initFeature = JSON.parse(localStorage.getItem("feature"));
  }
    const [isVisible, SetIsVisible] = useState(null)
    const [feature, SetFeature]= useState(initFeature);
    const [name, SetName] =  useState("");
    const [newName, SetNewName] = useState("");
  

    const navigate = useNavigate();

    useEffect(() => {
      localStorage.setItem("feature", JSON.stringify(feature));
    }, [feature])

    const addFeature = (name) => {
      console.log("name",name)
          let sno;
          if (feature.length === 0) {
            sno = 0;
          }
          else {
            sno = feature[feature.length - 1].sno + 1;
          }
      
          const myFeature = {
            sno: sno,
            name:name,
            projectId : id
            
          }
          SetName("")
          SetFeature([...feature, myFeature]);
          console.log(myFeature);
        }

      const deleteFeature = (id) =>{
        console.log("id",id)
        SetFeature(feature.filter((item)=>item.sno != id));
      }
      const handleEdit=(id,name)=>{
        SetNewName(name)
        SetIsVisible(id)
      }
      
      const handleUpdate=(id)=>{
        const uptfeature = feature.find((data)=>data.sno == id)
        uptfeature.name = newName 
        const features = feature.map((data)=>{
          if(data.sno == id){
            return uptfeature
          }
          else{
            return data
          }
        })
        console.log(56565,uptfeature)
        SetFeature(features)
        SetIsVisible()
      }

      const updateValue = (e)=>{
        SetNewName(e.target.value)
      }
      const handleNavigate = (id) =>{
        navigate(`/todo/${id}`)
      }
     
  
  return (
    <div>
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardBody>
      <MDBCardTitle>FEATURES</MDBCardTitle>
      <MDBCardText> 
      <div>
          {feature.filter((data)=>data.projectId==id).map((data, index)=>{
           return(
               <div key={index} >
               {isVisible == data.sno?
              <div>
                <input type="text" value={newName}  onChange={(e)=>updateValue(e)}/>
               <button class="btn btn-outline-info" onClick={()=>handleUpdate(data.sno, data.name)}>save</button>
              </div>
               
               :
             <div key={index} >
              <p onClick={()=>handleNavigate(data.sno)}>{data.name}</p>
                &nbsp;&nbsp;&nbsp;&nbsp;
               <button  class="btn btn-outline-info" onClick={()=>handleEdit(data.sno,data.name)}>Edit</button>&nbsp;&nbsp;
               <button onClick={()=>deleteFeature(data.sno)}  class="btn btn-outline-info" >Delete</button>
              
             </div>
              }
               </div>
           )
       })}
       </div>
         
       <hr />
        <input type="text" placeholder='Add Feature' value={name} onChange={(e)=>SetName(e.target.value)}/>
        <button onClick={()=>addFeature(name)} class="btn btn-outline-dark" >+</button>
        <br />
        <button onClick={()=>navigate("/")} class="btn btn-outline-dark" >Back</button>
    
        
        </MDBCardText>
       </MDBCardBody>
       </MDBCard>
        </div>
  )
}

export default Feature; 
