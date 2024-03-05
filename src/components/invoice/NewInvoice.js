import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import InvoiceForm from "./InvoiceForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  GET_ALL_PRODUCTS_API_CALL,
  GET_ALL_CUSTOMERS_API_CALL,
  SEARCH_CUSTOMER_API_CALL,
} from "../../utils/Constant";

const NewInvoice = (props) => {
  const dispatch = useDispatch();
  //use State
  const netOption = [
    "Net 0",
    "Net 5",
    "Net 10",
    "Net 15",
    "Net 30",
    "Net 60",
    "Net 90",
  ];
  const [isDraft, setIsDraft] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showInput, setShowInput] = useState(true);

  const [allItems, setAllItems] = useState([]);

  const productList = (item) => {
    setAllItems(item);
  };

  //Handlers
  const handletoggleDraft = () => {
    setIsDraft(!isDraft);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInvoiceDate(currentDate);

    dispatch({ type: GET_ALL_PRODUCTS_API_CALL });
    dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
  }, []);

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
    setSelectedCustomer(item);
    setShowInput(false);
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
                <Button className="ms-3 btn-save">
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
                    <br />
                    <small style={{ fontSize: 12 }}>
                      +971 502226710, +971 542796562
                    </small>
                    <br />
                    <small style={{ fontSize: 12 }}>+971 25634643</small>
                    <br />
                    <small style={{ fontSize: 12 }}>
                      Email : H&Tholidays@gmail.com
                    </small>
                    <br />
                    <small style={{ fontSize: 12 }}>
                      Website :{" "}
                      <a
                        target="blank"
                        href="http://www.handtholidays.ae/"
                        style={{ textDecoration: "none", color: "#1d1d5e" }}
                      >
                        www.htholidays.ae
                      </a>
                    </small>
                  </p>
                </div>
              </Col>
              <Col className="col-4 d-flex justify-content-center">
                <Form.Group>
                  {showInput && (
                    <Form.Control
                      className="inputfocus text-center rounded-0"
                      type="search"
                      name="customerNameSearch"
                      placeholder="+ Add Client"
                      value={customerName}
                      onChange={(e) => handleSearchChange(e)}
                      style={{ backgroundColor: "#dedef8", width: "250px" }}
                    />
                  )}
                  {showInput &&
                    props.customers.searchList &&
                    props.customers.searchList.length > 0 && (
                      <Card className="" style={{ width: 150 }}>
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
                  {selectCustomer ? (
                    <div
                      className="w-75 p-2"
                      style={{ backgroundColor: "#e4e4e4" }}
                    >
                      <h3 className="mt-1" onClick={handleSearchChange}>
                        {selectedCustomer.name}
                      </h3>
                      {selectedCustomer.addresses &&
                        selectedCustomer.addresses.length > 0 && (
                          <div
                            style={{
                              fontSize: 20,
                              position: "relative",
                              top: "-2px",
                            }}
                          >
                            <p
                              className=" w-70"
                              style={{
                                fontSize: 16,
                                fontWeight: "500",
                                flex: "flex-wrap",
                              }}
                            >
                              {selectedCustomer.addresses[0].addressLine1},
                              <br />
                              <span className="mt-1">
                                {selectedCustomer.addresses[0].addressLine2},
                              </span>
                              <br />
                              <span>{selectedCustomer.addresses[0].city},</span>
                              <span className="ms-2">
                                {selectedCustomer.addresses[0].state}
                              </span>
                              <br />
                              <span>
                                {selectedCustomer.addresses[0].countryName},
                              </span>
                              <span className="ms-2">
                                {selectedCustomer.addresses[0].zipcode}.
                              </span>
                            </p>
                          </div>
                        )}
                    </div>
                  ) : (
                    <span>Select a customer</span>
                  )}
                </Form.Group>
              </Col>
              <Col className="col-4 d-flex justify-content-end">
                <p>
                  <strong>Balance: ₹ </strong>
                </p>
              </Col>
            </Row>
          </>

          <>
            <Row className="mt-2 mb-3">
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
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Net *
                  </Form.Label>
                  <Form.Select
                    className="inputfocus rounded-0"
                    style={{ width: 175, height: "30px", fontSize: 14 }}
                  >
                    {netOption.map((net, index) => (
                      <option key={index} style={{ fontSize: 12, height: 20 }}>
                        {net}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Sales Person
                  </Form.Label>
                  <Form.Select
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                  >
                    <option disabled style={{ fontSize: 12 }}>
                      Select Sales Person
                    </option>
                    <option style={{ fontSize: 12 }}>Sales Person 1</option>
                    <option style={{ fontSize: 12 }}>Sales Person 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </>
        </div>
      </Container>
      <InvoiceForm items={productList} />
    </>
  );
};

const mapsToProps = (state) => {
  return {
    customers: state.customers,
  };
};

export default connect(mapsToProps)(NewInvoice);
