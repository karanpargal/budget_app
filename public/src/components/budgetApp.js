import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";

export default function BudgetApp({ expenses = [], setExpenses }) {
  const [show, setShow] = useState(false);
  const [expense, setExpense] = useState("");

  const handleClose = () => setShow(false);

  const handleDeleteExpense = async (id) => {
    axios.delete(`/api/budgetapp/${id}/`).then((res) => {
        const newExpenses = expenses.filter((e) => e.id !== id);
        setExpenses(newExpenses);
    }).catch((err) => {
        alert('Error: ' + err);
    })
    };

  const handleUpdateExpense = async (id, expense) => {
    axios.patch(`/api/budgetapp/${id}/`, expense).then((res) => {
      const {data} = res;
      const newExpenses = expenses.map((e) => {
        if (e.id === id) {
          return data;
        }
        return e;
      });
      setExpenses(newExpenses);
    }).catch((err) => {
      alert('Error: ' + err);
    })
  }

  const handleNameChange = (e) => {
    setExpense({ ...expense, name: e.target.value });
  };

  const handleAmountChange = (e) => {
    setExpense({ ...expense, amount: e.target.value });
  };

  const handleDateChange = (e) => {
    setExpense({ ...expense, date: e.target.value });
  };

  const handleSaveChanges = async () => {
    await handleUpdateExpense(expense.id, { name: expense.name, amount: expense.amount, date: expense.date });
    console.log(expense);
    handleClose();
  }

  const renderListGroupItems = (e) => {
    return (
      <ListGroup.Item
        key={e.id}
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <span style={{ marginRight: "48px" }}>{e.name}</span>
          <span style={{ marginRight: "56px" }}>{e.amount}</span>
          <span style={{ marginRight: "24px" }}>{e.date}</span>
        </div>
        <div>
          <MdEdit
            style={{ cursor: "pointer", marginRight: "24px" }}
            onClick={() => {
              setExpense(e);
              setShow(true);
            }}
          />
          <MdDelete style={{ cursor: "pointer", marginRight: "24px" }} onClick={()=>{handleDeleteExpense(e.id)}}/>
        </div>
      </ListGroup.Item>
    );
  };

  return (
    <div>
      <ListGroup>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <div>
            <span style={{ marginRight: "36px" }}>Expense</span>
            <span style={{ marginRight: "48px" }}>Amount</span>
            <span style={{ marginRight: "24px" }}>Date</span>
          </div>
        </ListGroup.Item>
        {expenses.map(renderListGroupItems)}
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={expense ? expense.name : ""}
            onChange={handleNameChange}
          />
          <FormControl
            value={expense ? expense.amount : "0"}
            onChange={handleAmountChange}
          />
          <FormControl
            value={expense ? expense.date : "2000-01-01"}
            onChange={handleDateChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
