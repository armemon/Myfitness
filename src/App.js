import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { auth , AuthContextProvider, useAuthState} from "./firebase";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";


import "./App.css";

const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        isAuthenticated ? <C {...routeProps} /> : <Navigate to="/login" />
      }
    />
  )
}

const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        !isAuthenticated ? <C {...routeProps} /> : <Navigate to="/" />
      }
    />
  )
}
function App() {
  const [userName, setUserName] = useState("");

 useEffect(() => {
    async function fetchUserName() {
      const user = await auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
      })
    }
    fetchUserName();
  }, []);

  return (
    <div className="App">
      <AuthContextProvider>
      <Router>
        <Routes>
          <AuthenticatedRoute path="/" element={<Login />} />
          <UnauthenticatedRoute path="/signup" element={<Signup />} />
            <UnauthenticatedRoute path="/home" element={<Home name={userName} />} />
            </Routes>
          
        
        </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;
