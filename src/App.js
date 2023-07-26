/** @format */

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";

function App() {
    const [role, setRole] = useState(false);

    useEffect(() => {
        const db = JSON.parse(localStorage.getItem("user_d"));
        if (db && db.radio === true) {
            setRole(true);
        } else {
            setRole(false);
        }
    }, [role]);
    // console.log(role);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login role={role} setRole={setRole} />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* Pass the role prop to the Dashboard component */}
                    <Route path="/dash" element={<Dashboard role={role} setRole={setRole} />} />
                </Routes>
            </BrowserRouter>

            {/* <Signup />
      <Login /> */}
        </>
    );
}

export default App;
