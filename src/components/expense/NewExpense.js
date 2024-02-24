import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import "./NewExpense.css";
import { Link } from "react-router-dom";


const NewExpense = () => {
  //Dummy Data's
  const tableHeader = [
    "Category",
    "Description",
    "Amount",
    "VAT",
    "Total Amount",
    "Action",
  ];

  //use state
  const [newContact, setNewContact] = useState("");
  const [bankName, setBankName] = useState("");
  const [newAccount, setNewAccount] = useState("");
  const [newIBAN, setNewIBAN] = useState("");
  const [newBranch, setNewBranch] = useState("");
  const [newAdditional, setNewAdditional] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAccModal, setShowAccModal] = useState(false);
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
  const [categoryName, setCategoryName] = useState("");
  const [categorySubType, setCategorySubType] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryAdditional, setCategoryAdditional] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  //Handlers
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleAddContact = (e) => {
    if (e.target.value === "addContact") {
      setShowModal(true);
      e.target.value = ""; // Reset the value of the select element after showing the modal
    }
  };
  const handleSubmitContact = () => {
    console.log("New contact name:", newContact);
    setShowModal(false);
  };
  const handleCloseAccModal = () => {
    setShowAccModal(false);
  };
  const handleAddAccount = (e) => {
    if (e.target.value === "addAccount") {
      setShowAccModal(true);
      e.target.value = "";
    }
  };
  const handleSubmitAccount = () => {
    // Here you can handle the submission of account details
    console.log("Bank Name:", bankName);
    console.log("Account Number:", newAccount);
    console.log("IBAN Number:", newIBAN);
    console.log("Branch:", newBranch);
    console.log("Additional:", newAdditional);

    // Reset fields
    setBankName("");
    setNewAccount("");
    setNewIBAN("");
    setNewBranch("");
    setNewAdditional("");

    setShowAccModal(false); // Close modal
  };
  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };
  const handleAddCategory = (e) => {
    if (e.target.value === "addCategory") {
      setShowCategoryModal(true);
      e.target.value = "";
    }
  };
  const handleSubmitCategory = () => {
    console.log("Name: ", categoryName);
    console.log("Sub Type: ", categorySubType);
    console.log("Description: ", categoryDescription);
    console.log("Additional: ", categoryAdditional);

    setCategoryName("");
    setCategorySubType("");
    setCategoryDescription("");
    setCategoryAdditional("");
    
    setShowCategoryModal(false);
  };
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

  return (
    <>

      <Container fluid className="mt-1">

        <Row className="m-3 p-1 d-flex align-items-center">
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

        <Row className="d-flex align-items-center m-3 p-1">
          <Col className="d-flex align-items-center">
            <Form>
              <Form.Group>
                <Form.Label className="fs-6 fw-bolder">Contact</Form.Label>
                <Form.Select
                  className="rounded-0"
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
                    className="border rounded-0"
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
                    className="rounded-0"
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
            <thead>
              <tr>
                {tableHeader.map((header, index) => (
                  <th key={index} className="th-c">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenseData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Form.Select
                      className="rounded-0"
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
                  <td>
                    <Form.Control
                      className="border-0 rounded-0"
                      as="textarea"
                      row={1}
                    />
                  </td>
                  <td>
                    <Form.Control
                      className="border-0 rounded-0"
                      type="number"
                      placeholder="AED"
                    />
                  </td>
                  <td>
                    <Form.Control
                      className="border-0 rounded-0"
                      type="number"
                      placeholder="AED"
                    />
                  </td>
                  <td>
                    {row.amount ? (
                      <span>{row.totalAmount}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
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

        <div className="m-3">
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

        <Row className="m-3">
          <Col className="col-8">
            <Form>
              <Form.Group>
                <Form.Control
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
                    <td className="fs-6 fw-bolder" style={{ color: "#25316f" }}>
                      Sub-Total
                    </td>
                    <td>0.00</td>
                  </tr>
                  <tr>
                    <td className="fs-6 fw-bolder" style={{ color: "#25316f" }}>
                      VAT
                    </td>
                    <td>0.00</td>
                  </tr>
                  <tr>
                    <td className="fs-6 fw-bolder" style={{ color: "#25316f" }}>
                      Total Amount
                    </td>
                    <td>0.00 AED</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        <Modal
          show={showCategoryModal}
          onHide={handleCloseCategoryModal}
          centered
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bolder c-b">Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Form.Label className="mt-2">Type</Form.Label>
                <Form.Control value="Expense" readOnly />
                <Form.Label className="mt-2">Sub Type</Form.Label>
                <Form.Control
                  type="text"
                  value={categorySubType}
                  onChange={(e) => setCategorySubType(e.target.value)}
                />
                <Form.Label className="mt-2">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
                <Form.Label className="mt-2">Additional</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={categoryAdditional}
                  onChange={(e) => setCategoryAdditional(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <Button className="btn-s fw-bolder" onClick={handleSubmitCategory}>
              Save
            </Button>
            <Button
              className="btn-c fw-bolder"
              onClick={handleCloseCategoryModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-5 fw-bolder c-b">
              Create Contact
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="fs-6 c-b">Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <Button className="btn-s fw-bolder" onClick={handleSubmitContact}>
              Save
            </Button>
            <Button className="btn-c fw-bolder" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showAccModal}
          onHide={handleCloseAccModal}
          centered
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-5 fw-bolder c-b">
              Account Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ gap: "30px" }}>
              <Form.Group>
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="text"
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value)}
                />
                <Form.Label>IBAN Number</Form.Label>
                <Form.Control
                  type="text"
                  value={newIBAN}
                  onChange={(e) => setNewIBAN(e.target.value)}
                />
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  type="text"
                  value={newBranch}
                  onChange={(e) => setNewBranch(e.target.value)}
                />
                <Form.Label>Additional</Form.Label>
                <Form.Control
                  type="text"
                  value={newAdditional}
                  onChange={(e) => setNewAdditional(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <Button className="btn-s fw-bolder" onClick={handleSubmitAccount}>
              Save
            </Button>
            <Button className="btn-c fw-bolder" onClick={handleCloseAccModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
};

export default NewExpense;