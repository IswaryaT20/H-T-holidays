import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ExpenseModal from "./ExpenseModal";
import "./Expense.css";

const NewExpense = () => {
  const tableHeader = [
    "Category",
    "Description",
    "Amount",
    "VAT",
    "Total Amount",
    "Action",
  ];

  //use state
  const [expenseData, setExpenseData] = useState([
    {
      id: 1,
      category: "",
      description: "",
      amount: "",
      vat: "",
      totalAmount: "",
    },
  ]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showAccModal, setShowAccModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  //Handlers
  const handleAddContact = (e) => {
    if (e.target.value === "addContact") {
      setShowModal(true);
      e.target.value = ""; // Reset the value of the select element after showing the modal
    }
  };

  const handleAddAccount = (e) => {
    if (e.target.value === "addAccount") {
      setShowAccModal(true);
      e.target.value = "";
    }
  };
  const handleAddCategory = (e) => {
    if (e.target.value === "addCategory") {
      setShowCategoryModal(true);
      e.target.value = "";
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseAccModal = () => setShowAccModal(false);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);
  const handleAddRow = () => {
    setExpenseData([
      ...expenseData,
      {
        id: expenseData.length + 1,
        category: "",
        description: "",
        amount: "",
        vat: "",
        totalAmount: "",
      },
    ]);
  };
  const handleDeleteRow = (id) => {
    setExpenseData(expenseData.filter((item) => item.id !== id));
  };

  //Table Calculation:
  //Row-Wise Calculation
  const handleInputChange = (id, fieldName, value) => {
    const updatedData = expenseData.map((item) => {
      if (item.id === id) {
        const amount = fieldName === "amount" ? value : item.amount || 0;
        const vat = fieldName === "vat" ? value : item.vat || 0;
        const totalAmount = (
          parseFloat(amount) +
          parseFloat(amount) * (parseFloat(vat) / 100)
        ).toFixed(2);
        return { ...item, [fieldName]: value, totalAmount };
      }
      return item;
    });
    setExpenseData(updatedData);
  };

  //Bottom Table Calculation:
  useEffect(() => {
    let newSubtotal = 0;
    let newTotalVAT = 0;
    let newTotalAmount = 0;

    expenseData.forEach((item) => {
      const amount = parseFloat(item.amount || 0);
      const vat = parseFloat(item.vat || 0);

      const totalAmountWithVAT = amount + (amount * vat) / 100;

      newSubtotal += amount;
      newTotalVAT += (amount * vat) / 100;
      newTotalAmount += totalAmountWithVAT;
    });

    setSubTotal(newSubtotal.toFixed(2));
    setTotalVAT(newTotalVAT.toFixed(2));
    setTotalAmount(newTotalAmount.toFixed(2));
  }, [expenseData]);

  return (
    <>
      <Container fluid className="mt-1">
        <Row className="mt-3 w-100 p-1 d-flex align-items-center">
          <Col className="fs-6 fw-bolder c-b">Create Direct Expense</Col>
          <Col className="d-flex justify-content-end">
            <div>
              <Button className="fw-bolder btn-c">
                <Link
                  to="/expense"
                  style={{ textDecoration: "none", color: "#25316f" }}
                >
                  Close
                </Link>
              </Button>
              <Button className="ms-3 fw-bolder btn-s">Save</Button>
            </div>
          </Col>
        </Row>

        <Row className="d-flex align-items-center mt-3 w-100 p-1">
          <Col className="d-flex align-items-center">
            <Form>
              <Form.Group>
                <Form.Label className="fs-6 fw-bolder">Contact</Form.Label>
                <Form.Select
                  className="rounded-0 inputfocus"
                  style={{ width: 175 }}
                  onChange={handleAddContact}
                >
                  <option></option>
                  <option value="addContact" className="fs-6 fw-bolder c-b">
                    + Add Contact
                  </option>
                </Form.Select>
              </Form.Group>
            </Form>
            <div className="ms-4">
              <Form>
                <Form.Group>
                  <Form.Label className="fs-6 fw-bolder">
                    Payment Date <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    className="border rounded-0 inputfocus"
                    required
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="ms-4">
              <Form>
                <Form.Group>
                  <Form.Label className="fs-6 fw-bolder">
                    Pay From <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select
                    className="rounded-0 inputfocus"
                    style={{ width: 175 }}
                    onChange={handleAddAccount}
                  >
                    <option></option>
                    <option value="addAccount" className="fs-6 fw-bolder c-b">
                      + Add Account
                    </option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>

        <div className="m-4">
          <Table>
            <thead style={{ padding: "0.75rem" }}>
              <tr>
                {tableHeader.map((header, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      backgroundColor: "#25316f",
                      color: "white",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenseData.map((row) => (
                <tr key={row.id}>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0.5rem",
                    }}
                  >
                    <Form.Select
                      className="rounded-0 inputfocus"
                      onChange={handleAddCategory}
                    >
                      <option></option>
                      <option
                        className="fs-6 fw-bolder c-b"
                        value="addCategory"
                      >
                        + Add Category
                      </option>
                    </Form.Select>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0.5rem",
                    }}
                  >
                    <Form.Control
                      className="border-0 rounded-0 inputfocus"
                      as="textarea"
                      row={1}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0.5rem",
                    }}
                  >
                    <Form.Control
                      className="border-0 rounded-0 inputfocus"
                      type="number"
                      placeholder="AED"
                      value={row.amount}
                      onChange={(e) =>
                        handleInputChange(row.id, "amount", e.target.value)
                      }
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0.5rem",
                    }}
                  >
                    <Form.Control
                      className="border-0 rounded-0 inputfocus"
                      type="number"
                      placeholder="VAT %"
                      value={row.vat}
                      onChange={(e) =>
                        handleInputChange(row.id, "vat", e.target.value)
                      }
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0.5rem",
                    }}
                  >
                    {row.amount ? (
                      <span>{row.totalAmount}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "0.5rem",
                    }}
                  >
                    <FaTrashCan
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteRow(row.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="mt-3 w-100">
          <Button
            onClick={handleAddRow}
            style={{
              backgroundColor: "#25316f",
              margin: 10,
              borderWidth: 0,
              width: 120,
              fontWeight: "bolder",
            }}
          >
            + Add Items
          </Button>
        </div>

        <Row className="mt-3 w-100">
          <Col className="col-8">
            <Form>
              <Form.Group>
                <Form.Control
                  className="inputfocus"
                  as="textarea"
                  row={4}
                  placeholder="Description"
                  style={{ width: "400px", height: "100px" }}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <div>
              <Table hover bordered>
                <tbody>
                  <tr>
                    <td
                      className="fs-6 fw-bolder text-start"
                      style={{ color: "#25316f" }}
                    >
                      Sub-Total
                    </td>
                    <td className="text-start">{subTotal}</td>
                  </tr>
                  <tr>
                    <td
                      className="fs-6 fw-bolder text-start"
                      style={{ color: "#25316f" }}
                    >
                      VAT (AED)
                    </td>
                    <td className="text-start">{totalVAT}</td>
                  </tr>
                  <tr>
                    <td
                      className="fs-6 fw-bolder text-start"
                      style={{ color: "#25316f" }}
                    >
                      Total Amount (AED)
                    </td>
                    <td className="text-start">{totalAmount}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>

      <ExpenseModal
        showContactModal={showModal}
        showAccountModal={showAccModal}
        showAddCategoryModal={showCategoryModal}
        handleCloseContactModal={handleCloseModal}
        handleCloseAccountModal={handleCloseAccModal}
        handleCloseCategoryModal={handleCloseCategoryModal}
      />
    </>
  );
};

export default NewExpense;
