import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth();





function Home(props) {
  const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    const handleLogout = (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        setIsLoggedIn(false);
        console.log("User logged out successfully!");
        navigate("/");
      });
    };

    return (
      <div>
        <div>
          <h1>
            <Link to="/">Login</Link>
          </h1>
          <br />
          <h1>
            <Link to="/signup">Signup</Link>
          </h1>
          <br />
          <h1>
            <Link onClick={handleLogout}>Logout</Link>
          </h1>
        </div>

        <br />
        <br />
        <br />

        <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
      </div>
    );
  }


export default Home;
