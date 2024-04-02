import { BrowserRouter,Routes,Route } from "react-router-dom";
import TaskListe from "../tps/Taskify/TaskList";
import Register from '../forms/Register'; // Le chemin d'importation doit être ajusté en fonction de la structure de votre projet
import Login from '../forms/Login'; // Le chemin d'importation doit être ajusté en fonction de la structure de votre projet
import Nav from '../navbar/Nav'; // Le chemin d'importation doit être ajusté en fonction de la structure de votre projet
import { useEffect, useState } from "react";



export default function RouteShema(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsLoggedIn(true)
    }

  }, [setIsLoggedIn])

    return(
        <BrowserRouter>
              <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
           <Routes>
             <Route path='/' element={<TaskListe />} />
             <Route path='/Register' element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
             <Route path='/Login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
           </Routes>
           
        </BrowserRouter>
    )
}