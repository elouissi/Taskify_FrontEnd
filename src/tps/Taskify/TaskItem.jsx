import Button from 'react-bootstrap/Button';
import { axiosClient } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




export default function TaskItem({ tasks, fetchTasks ,taskList }) {

const [show, setShow] = useState(false);
const [id, setId] = useState();
const [values, Setvalues] = useState({
    name : '',
    status : ''
    
});
const [Search, setSearch] = useState({
    name : '',
    status : ''
});
const navigate = useNavigate();
const handleClose = () => setShow(false);

const hadleName = useRef();
const hadleselect = useRef();


const handleShow = (e) =>{ 
    setShow(true);
    let id = e.target.dataset.id;
    setId(id)

    const searchdata = taskList.filter(task => {
        return task.id.toString().startsWith(id);
    });
    setSearch({
        name: searchdata[0].name,
        status : searchdata[0].status
    })
}
 
    const Update = (e)=>{
             e.preventDefault();
          
            Setvalues({
              name  : hadleName.current.value,
              status : hadleselect.current.value
            })
        
        
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('status', values.status);
 
            
            
             axiosClient
              .put(`/api/tasks/${id}`, values, {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              })
              .then((response) => {
                fetchTasks()
                         navigate("/");
              setShow(false); // Fermer le modèle après la création de la tâche
              })
              .catch((error) => {
                if (error.response) {
                  if (error.response.status === 401) {
                   } else {
                    console.error(error.response.data.message);
                  }
                } else {
                  console.error(error);
                }
              });
          };

        

    




  




    const deleteTask = (e) => {

        let id = e.target.dataset.id;
        axiosClient.delete(`/api/tasks/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                  navigate('/')
                  fetchTasks()
                // Mettre à jour l'affichage ou effectuer d'autres actions après la suppression
            })
            .catch((error) => {
                alert("Error deleting task she not to you");
            });
    }





    return (
        <>
            <tr>
                <td>{tasks.id}</td>
                <td>{tasks.name}</td>
                <td>{tasks.status}</td>
                <td>
                <div className='d-flex g-6'>
                    <Button variant="danger" data-id={tasks.id} onClick={deleteTask}>
                        Delete
                    </Button>
                    <Button variant="success" data-id={tasks.id} onClick={handleShow}>
                        update
                    </Button>
                </div>


                </td>
            </tr>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>creer un tache</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                            ref={hadleName}
                 type="text"
                placeholder={Search.name}
                
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>choisir le status</Form.Label>
              <Form.Select aria-label=" select" ref={hadleselect}
>
                <option selected disabled >{Search.status}</option>
                <option  value="in progress">En cours</option>
                <option value="to do">En attente</option>
                <option value="done">Terminé</option>
              </Form.Select>           
               </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Update}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>

        </>
    )
}
