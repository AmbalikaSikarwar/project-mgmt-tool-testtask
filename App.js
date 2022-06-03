import Testtask from "./testtask";
import Project from "./component/project";
import Feature from "./component/feature";
import Todo from "./component/todo";
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    
    <div className="App">
    <center>
    <Routes>
    
    <Route path="/" element={ <Project /> } />
    <Route path="/feature/:id" element={ <Feature /> } />
    <Route path="/todo/:id" element={ <Todo /> } />
    <Route path="/testtask" element={ <Testtask /> } />
    </Routes>  
    </center>
    </div>
  );
} 

export default App;
