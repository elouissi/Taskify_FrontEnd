import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";


function Nav({isLoggedIn , setIsLoggedIn}) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  const Logout = ()=>{
     axiosClient
    .post("/api/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    })
    .catch((error) => {
      console.error(error);
    });
  
 
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          <a href="#home" className={`${styles.logo}`}>
            wikis{" "}
          </a>
          <ul
            className={`${styles.navMenu} ${isActive ? styles.active : ""}`}
            style={{ margin: "0 auto" }}
          >
            <li onClick={removeActive}>
              <Link to="/" className={`${styles.navLink}`}>
                Home
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/" className={`${styles.navLink}`}>
                All wikis
              </Link>
            </li>
          </ul>
          {!isLoggedIn ? 
            <ul
              className={`${styles.navMenu} ${isActive ? styles.active : ""}`}
              style={{ marginLeft: "auto" }}
            >
              <li onClick={removeActive}>
                <Link to="/Register" className={`${styles.navLink}`}>
                  Register
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link to="/Login" className={`${styles.navLink}`}>
                  Login
                </Link>
              </li>
            </ul>
          :
          <a className={`${styles.navLink}`} style={{ cursor: "pointer" }} onClick={Logout}>
          Logout
        </a>       
         }
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
