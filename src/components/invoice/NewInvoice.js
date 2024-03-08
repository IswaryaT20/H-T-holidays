import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import InvoiceForm from "./InvoiceForm";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  // GET_ALL_PRODUCTS_API_CALL,
  // GET_ALL_CUSTOMERS_API_CALL,
  SEARCH_CUSTOMER_API_CALL,
  CREATE_INVOICE_API_CALL,
} from "../../utils/Constant";

const NewInvoice = (props) => {
  const dispatch = useDispatch();

  //use State
  const netOptions = [
    { label: "Net 0", value: 0 },
    { label: "Net 5", value: 5 },
    { label: "Net 10", value: 10 },
    { label: "Net 15", value: 15 },
    { label: "Net 30", value: 30 },
    { label: "Net 60", value: 60 },
    { label: "Net 90", value: 90 },
  ];
  const [selectedNet, setSelectedNet] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const [isDraft, setIsDraft] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showInput, setShowInput] = useState(true);

  const [allItems, setAllItems] = useState([]);
  const [globalDiscountState, setGlobalDiscountState] = useState(0);
  const [description, setDescription] = useState("");
  const [vatChecked, setVatChecked] = useState(false);
  const [error, setError] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [success, setSuccess] = useState("");

  //Handlers
  const handletoggleDraft = () => {
    setIsDraft(!isDraft);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInvoiceDate(currentDate);
    calculateDueDate(currentDate, selectedNet);

    // dispatch({ type: GET_ALL_PRODUCTS_API_CALL });
    // dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
  }, []);

  const calculateDueDate = (date, net) => {
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + net);
    setDueDate(dueDate.toISOString().split("T")[0]);
  };

  const handleNetChange = (e) => {
    const selectedNetValue = parseInt(e.target.value);
    setSelectedNet(selectedNetValue);
    calculateDueDate(invoiceDate, selectedNetValue);
  };

  const handleSearchChange = (e) => {
    if (e.target.name === "customerNameSearch") {
      setCustomerName(e.target.value);
    }
  };

  const selectCustomer = () => {
    if (customerName) {
      setTimeout(() => {
        dispatch({
          type: SEARCH_CUSTOMER_API_CALL,
          payload: { query: customerName },
        });
      }, 1000);
    }
  };

  useEffect(() => {
    selectCustomer();
  }, [customerName]);

  const customerDetails = (item) => {
    if (selectedCustomer === item) {
      setShowInput(!showInput); // Toggle the showInput state when the selected supplier is clicked
    } else {
      setSelectedCustomer(item);
      setShowInput(false);
    }
  };

  const productList = (item) => {
    setAllItems(item);
  };

  const globalDiscount = (value) => {
    setGlobalDiscountState(value);
  };

  const overallDescription = (value) => {
    setDescription(value);
  };

  const globalVatChecked = (value) => {
    setVatChecked(value);
  };

  const handleSubmit = () => {

    const customerError = "Please enter customer name";
    setError("");
    if (customerName.length === 0) {
      setError(customerError);
      return;
    }

    const tempArray = allItems.map((item) => {
      return {
        productId: item.id,
        description: item.description,
        quantity: item.qty,
        unitPrice: item.price,
        discountPercentage: item.discount,
        vatPercentage: item.vat,
        unitPriceTaxInclusive: vatChecked,
      };
    });

    const requestData = {
      createdBy: props.loginUsers.loginId,
      customerId: selectedCustomer.id,
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      net: selectedNet,
      referenceNumber: "Nil",
      memo: description,
      globalDiscount: globalDiscountState,
      products: tempArray,
    };

    dispatch({ type: CREATE_INVOICE_API_CALL, data: requestData });
    setShowAlertModal(true);
    setSuccess("Success");

    setTimeout(() => {
      window.location.reload(true)
    }, 500);
  };

  return (
    <>
      <Container fluid className="mt-2">
        <div style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Row>
            <Col>
              <Form>
                <Form.Check
                  style={{ fontWeight: "500", color: "#1d1d5e" }}
                  type="switch"
                  id="custom-switch"
                  label={isDraft ? "Draft Invoice" : "Invoice"}
                  onChange={handletoggleDraft}
                />
              </Form>
            </Col>
            <Col className="d-flex justify-content-end">
              <div>
                <Link
                  to="/Invoice"
                  style={{
                    textDecoration: "none",
                    color: "#1d1d5e",
                    fontWeight: "500",
                  }}
                >
                  <Button
                    className="fw-bolder"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#1d1d5e",
                      color: "#1d1d5e",
                    }}
                  >
                    Close
                  </Button>
                </Link>
                <Button className="ms-3 btn-save" onClick={handleSubmit}>
                  {isDraft ? "Save Draft" : "Save"}
                </Button>
              </div>
            </Col>
          </Row>

          <h1
            className="d-flex justify-content-center fs-6 fw-bolder"
            style={{ color: "#1d1d5e" }}
          >
            {isDraft ? "DRAFT INVOICE" : "NEW INVOICE"}
          </h1>

          <>
            <Row className="w-100">
              <Col className="col-4">
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    width: 300,
                    height: "auto",
                    borderRadius: 5,
                  }}
                >
                  <p>
                    <strong style={{ fontSize: 12 }}>Bill From:</strong> <br />
                    <strong style={{ fontSize: 14 }}>H&T HOLIDAYS</strong>{" "}
                    <br />
                    <small style={{ fontSize: 12 }}>Tours & Travels</small>{" "}
                    <br />
                    <small style={{ fontSize: 12 }}>
                      Building No.10 AlNahyan Camp
                    </small>
                    <br />
                    <small style={{ fontSize: 12 }}>
                      Near Executive Suites, Abu Dhabi
                    </small>
                  </p>
                </div>
              </Col>
              <Col className="col-4 d-flex justify-content-center">
                <Form.Group>
                  {showInput && (
                    <Form.Control
                      className={`inputfocus text-center rounded-0 ${
                        selectedCustomer ? "bg-light" : ""
                      }`}
                      type="search"
                      name="customerNameSearch"
                      placeholder="+ Add Customer"
                      value={customerName}
                      onChange={(e) => handleSearchChange(e)}
                      style={{
                        backgroundColor: "#dedef8",
                        width: "250px",
                        cursor: "text",
                      }}
                    />
                  )}
                  {showInput &&
                    props.customers.searchList &&
                    props.customers.searchList.length > 0 && (
                      <Card>
                        <ListGroup
                          style={{ maxHeight: "15rem", overflowY: "scroll" }}
                        >
                          {props.customers.searchList.map((item) => (
                            <ListGroupItem
                              key={item.id}
                              onClick={() => customerDetails(item)}
                              style={{ cursor: "pointer" }}
                            >
                              <strong>Name: </strong>
                              {item.name}
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                        <Link to="/CustomerForm">
                          <Button variant="link">Add Customer +</Button>
                        </Link>
                      </Card>
                    )}
                  {selectedCustomer && (
                    <div
                      className="p-2 rounded"
                      style={{ backgroundColor: "#f0f0f0", width:300 }}
                    >
                      <h5
                        className="mt-1"
                        onClick={() => setShowInput(!showInput)}
                      >
                        {selectedCustomer.name}
                      </h5>
                      {selectedCustomer.addresses &&
                        selectedCustomer.addresses.length > 0 && (
                          <div>
                            {/* Supplier address details */}
                            <p
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                flex: "flex-wrap",
                              }}
                            >
                              {selectedCustomer.addresses[0].addressLine1},
                              <br />
                              <small className="mt-1">
                                {selectedCustomer.addresses[0].addressLine2},
                              </small>
                              <br />
                              <small>{selectedCustomer.addresses[0].city},</small>
                              <small className="ms-2">
                                {selectedCustomer.addresses[0].state}
                              </small>
                              <br />
                              <small>
                                {selectedCustomer.addresses[0].countryName},
                              </small>
                              <small className="ms-2">
                                {selectedCustomer.addresses[0].zipcode}.
                              </small>
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                  {error && !customerName && (
                    <p style={{ color: "red", fontSize:12 }}>Please enter the customer name.</p>
                  )}
                </Form.Group>
              </Col>
              <Col className="col-4 d-flex justify-content-end">
                <p>
                  <strong>Balance: AED </strong>
                </p>
              </Col>
            </Row>
          </>

          <>
            <Row className="mt-3 mb-3">
              <Col className="col-7 d-flex justify-content-start">
                <Form.Group>
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Invoice Date
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Due Date
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Net *
                  </Form.Label>
                  <Form.Select
                    className="inputfocus rounded-0"
                    style={{ width: 175, height: "30px", fontSize: 14 }}
                    onChange={handleNetChange}
                  >
                    {netOptions.map((net, index) => (
                      <option
                        key={index}
                        value={net.value}
                        style={{ fontSize: 12, height: 20 }}
                      >
                        {net.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Sales Person
                  </Form.Label>
                  <Form.Control
                    value={props.loginUsers.loginName}
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        </div>
      </Container>
      <InvoiceForm
        allItems={productList}
        globalDiscount={globalDiscount}
        memo={overallDescription}
        vatChecked={globalVatChecked}
      />

<>
        <Modal show={showAlertModal}>
          <ModalHeader>
            <ModalTitle>Purchase Data</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {success === "Success" ? (
              <div className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-circle-check"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#3bb54a"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "31%" }}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <p className="mb-0 ml-2">Data Saved Successfully</p>
            </div>
            ) : (
              <Alert variant="danger">Data Saved Unsuccessfully</Alert>
            )}
          </ModalBody>
        </Modal>
      </>
    </>
  );
};

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    loginUsers: state.users,
  };
};

export default connect(mapsToProps)(NewInvoice);
