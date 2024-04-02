import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { axiosClient } from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
 } from "mdb-react-ui-kit";

function Register({setIsLoggedIn,IsLoggedIn}) {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputNameRef = useRef();
  const navigate = useNavigate();


  const [FormValues, SetFormValues] = useState({});
  let formValid = true;

  const validateForm = () => {
    const nameValue = inputNameRef.current.value;
    const emailValue = inputEmailRef.current.value;
    const passwordValue = inputPasswordRef.current.value;

    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (nameValue.trim() === "") {
      alert("Name field is required");
      formValid = false;
    }

    if (!regexEmail.test(emailValue)) {
      alert("Invalid email address");
      formValid = false;
    }

    if (passwordValue.trim() === "") {
      alert("Password field is required");
      formValid = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm();

    if (formValid) {
      const values = {
        name: inputNameRef.current.value,
        email: inputEmailRef.current.value,
        password: inputPasswordRef.current.value,
      };
      SetFormValues(values);

      axiosClient
      .post("/api/register", values)
      .then((response) => {
          localStorage.setItem('token', response.data.token);
          navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });

      // Perform your fetch request here
    }
  };

  useEffect(() => {
   }, [FormValues]);

  return (
    <>
 
    <MDBContainer fluid className="p-3 my-5 h-custom p-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample "
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <form action="" onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="name "
              ref={inputNameRef}
              type="text"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email "
              ref={inputEmailRef}
              type="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password "
              ref={inputPasswordRef}
              type="password"
              size="lg"
            />

            <div className="text-center text-md-start mt-4 pt-2">
              <Button variant="primary" type="submit">
                register
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="#!" className="link-danger">
                  Login
                </a>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
  );
}

export default Register;
