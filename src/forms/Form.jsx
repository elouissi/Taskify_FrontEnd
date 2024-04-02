import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function MyForm() {
  const inputNameRef = useRef();
  const inputAgeRef = useRef();
  const selectStatusRef = useRef();

  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    status: ""
  });

  useEffect(() => {
    inputAgeRef.current.value = 456;
    inputNameRef.current.value = 'RTYU';
    selectStatusRef.current.value = 1;
    inputNameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      name: inputNameRef.current.value,
      age: inputAgeRef.current.value,
      status: selectStatusRef.current.value
    };

    setFormValues({
      name: inputNameRef.current.value,
      age: inputAgeRef.current.value,
      status: selectStatusRef.current.value
    });

    // Envoi des données à l'API
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('status', values.status);

    axios.post('http://127.0.0.1:8000/api/tasks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer 4|uPLBnDYi072OWBEV3YM8aIURq86ja36DreOUECtt714fa4b4'
      }
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <form className="container my-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" ref={inputNameRef} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" placeholder="Age" ref={inputAgeRef} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" ref={selectStatusRef} className="form-control">
            <option value="1">En cours</option>
            <option value="2">En attente</option>
            <option value="3">Terminé</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
