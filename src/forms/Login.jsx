import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { axiosClient } from "../api/axios";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Login({IsLoggedIn, setIsLoggedIn}) {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const navigate = useNavigate();

  const [FormValues, SetFormValues] = useState({});
  let formValid = true;

  
  if(!IsLoggedIn){
    navigate('/')
  }



  const validateForm = () => {
    const emailValue = inputEmailRef.current.value;
    const passwordValue = inputPasswordRef.current.value;

    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(emailValue)) {
      alert("Invalid email address");
      formValid = false;
    }

    if (passwordValue.trim() === "") {
      alert("Password field is required");
      formValid = false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

    if (formValid) {
      const values = {
        email: inputEmailRef.current.value,
        password: inputPasswordRef.current.value,
      };
      SetFormValues(values);

      await axiosClient.get("/sanctum/csrf-cookie")

      axiosClient
        .post("/api/login", values)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            navigate('/');
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              alert("Invalid email or password");
            } else {
              console.error(error.response.data.message);
            }
          } else {
            console.error(error);
          }
        });
    }
  };

  useEffect(() => {}, [FormValues]);

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom p-5">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://source.unsplash.com/featured/?authentication"
              className="img-fluid"
              alt="Sample"
            />
          </MDBCol>
          <MDBCol col="4" md="6">
            <form action="" onSubmit={handleSubmit}>
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
                  Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?{" "}
                  <a href="#!" className="link-danger">
                    Registre
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

export default Login;
