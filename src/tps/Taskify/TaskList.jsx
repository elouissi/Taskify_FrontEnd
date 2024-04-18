import { useEffect, useState, useRef } from "react";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { axiosClient } from "../../api/axios";

export default function TaskListe() {
  const [show, setShow] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [values, Setvalues] = useState({
    name: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const hadleName = useRef();
  const hadleselect = useRef();

  const fetchTasks = () => {
    setIsLoading(true);
    axiosClient
      .get("/api/tasks", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTaskList(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    Setvalues({
      name: hadleName.current.value,
      status: hadleselect.current.value,
    });

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("status", values.status);

    axiosClient
      .post("/api/tasks", formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        fetchTasks();
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    setIsLoading(true);
    axiosClient
      .get("/api/tasks", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTaskList(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [navigate, Setvalues]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.getElementById("search").value;
    setSearch(search);
  };
  const display = () => {
    if (taskList.length > 0) {
      const searchdata = taskList.filter((task) => {
        return task.name.includes(search);
      });
      return searchdata.map((task) => (
        <TaskItem
          key={task.id}
          taskList={taskList}
          fetchTasks={fetchTasks}
          tasks={task}
        />
      ));
    }

    return taskList.map((task) => (
      <TaskItem
        key={task.id}
        taskList={taskList}
        fetchTasks={fetchTasks}
        tasks={task}
      />
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
        <input
          type="text"
          onKeyUp={handleSearch}
          name=""
          id="search"
          className="form-control"
        />
        <h1>Liste des tâches</h1>
        <Button variant="primary" onClick={handleShow}>
          créer une tache
        </Button>

        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Statut</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>{display()}</tbody>
        </table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>creer un tache</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  ref={hadleName}
                  type="text"
                  placeholder="nom du tache"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>choisir le status</Form.Label>
                <Form.Select aria-label=" select" ref={hadleselect}>
                  <option selected disabled>
                    Open this select menu
                  </option>
                  <option value="in progress">En cours</option>
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
            <Button variant="primary" onClick={handleCreate}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
