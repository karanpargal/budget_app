import React, { useState, useEffect, Fragment } from "react";
import BudgetApp from "./budgetApp";
import BudgetForm from "./budgetForm";
import axios from "axios";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("http://localhost:3000/login");
    } else {
      fetch("http://127.0.0.1:8000/api/users/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserEmail(data.email);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      {loading === false && (
        <Fragment>
          <BudgetForm expenses={expenses} setExpenses={setExpenses} />
          <BudgetApp expenses={expenses} setExpenses={setExpenses} />
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
