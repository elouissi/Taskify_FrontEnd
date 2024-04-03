import Button from 'react-bootstrap/Button';
import { axiosClient } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function TaskItem({ tasks }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [taskList, setTaskList] = useState([]);



    const fetchTasks = () => {
        setIsLoading(true);
        axiosClient.get("/api/tasks", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => {
            setTaskList(response.data.data);
         })
        .catch((error) => {
            console.error(error);
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
                fetchTasks()
                navigate('/')
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
                    <Button variant="danger" data-id={tasks.id} onClick={deleteTask}>
                        Delete
                    </Button>
                </td>
            </tr>
        </>
    )
}
