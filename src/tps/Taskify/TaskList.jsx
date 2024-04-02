import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";


export default function TaskListe() {
  const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }

    setIsLoading(true);
    fetch("http://127.0.0.1:8000/api/tasks")
      .then((response) => response.json())
       .then((response) => setTaskList(response.data))
      .then((response) => setIsLoading(false));
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.getElementById('search').value
    setSearch(search)
}
const display = () => {
    if (taskList.length > 0) {
        const searchdata = taskList.filter(task => {
            return task.name.includes(search);
        });
        return searchdata.map(task => (
            <TaskItem key={task.id} tasks={task} />
        ));
    }

    return taskList.map(task => (
        <TaskItem key={task.id} tasks={task} />
    ));
};




  if (isLoading) {
    return (


      <div className="container-fluid m-auto w-75 m-5">
        <div>Loading ....</div>
      </div>
    );
  }




  return (
    <>
  
 
    <div className="container-fluid m-auto w-75 m-5">
        <label htmlFor="">search</label>
        <input type="text" onKeyUp={handleSearch} name="" id="search" className="form-control" />
       <h1>Liste des tâches</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {display()}
        </tbody>
      </table>
    </div>
    </>
  );
}
