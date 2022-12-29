import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function BudgetForm({ expenses, setExpenses }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) {
      alert("Please provide valid inputs");
      return;
    }

    axios
      .post("/api/budgetapp/", {
        name: name,
        amount: amount,
        date: date,
      })
      .then((res) => {
        setName("");
        setAmount("");
        setDate("");
        const { data } = res;
        setExpenses([...expenses, data])}).catch((e) => {
          alert("Error: " + e);
        });
      };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter expense"
          onChange={handleName}
          value={name}
        />
        <FormControl
          placeholder="Enter amount"
          onChange={handleAmount}
          value={amount}
        />
        <FormControl
          placeholder="Enter date(YYYY-MM-DD)"
          onChange={handleDate}
          value={date}
        />
        <Button variant="primary" type="submit">
          Add expense
        </Button>
      </InputGroup>
    </Form>
  );
}
