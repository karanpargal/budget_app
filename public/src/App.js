import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Dashboard from "./components/Dashboard";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("/api/budgetapp")
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/logout" element={<Logout />} exact />
            <Route path="/dashboard" element={<Dashboard />} exact />
          {/* <Route path="/" element={<div><BudgetForm expenses={expenses} setExpenses={setExpenses}/><BudgetApp expenses={expenses} setExpenses={setExpenses}/></div>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
