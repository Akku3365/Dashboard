import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";

function App() {

  const [role, setRole] = useState("");

  useEffect(()=> {
    const db = JSON.parse(localStorage.getItem('user_d'));
   if(db) {
    setRole(db.radio)
   } else {
    localStorage.clear();
   }
  },[])

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup  role={role} setRole={setRole} />} />
          <Route path="/dash" element={<Dashboard role={role} setRole={setRole} />} />
        </Routes>
      </BrowserRouter>

      {/* <Signup />
      <Login /> */}

    </>
  );
}

export default App;
