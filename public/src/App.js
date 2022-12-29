import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import BudgetApp from "./components/budgetApp";
import BudgetForm from "./components/budgetForm";
import axios from "axios";

function App() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('/api/budgetapp')
    .then((res) => {
      setExpenses(res.data);
    }).catch((err) => {
      alert('Error: ' + err);
    })
  }, []);
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Budget App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <BudgetForm expenses={expenses} setExpenses={setExpenses}/>
        <BudgetApp expenses={expenses} setExpenses={setExpenses}/>
      </Container>
    </div>
  );
}

export default App;
