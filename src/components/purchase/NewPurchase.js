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
import { Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { SEARCH_CUSTOMER_API_CALL } from "../../utils/Constant";
import axios from "axios";
import PurchaseForm from "./PurchaseForm";

const NewPurchase = (props) => {
  //use State
  const [supplierName, setSupplierName] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [showInput, setShowInput] = useState(true);

  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [refNumber, setRefNumber] = useState("");

  const netOption = [
    "Net 0",
    "Net 5",
    "Net 10",
    "Net 15",
    "Net 30",
    "Net 60",
    "Net 90",
  ];

  const dispatch = useDispatch();

  //Handlers
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setPurchaseDate(currentDate);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSupplierName(value);
  };

  const selectSupplier = () => {
    if (supplierName) {
      setTimeout(() => {
        dispatch({
          type: SEARCH_CUSTOMER_API_CALL,
          payload: { query: supplierName, businessTypeId: 3 },
        });
      }, 1000);
    }
  };

  useEffect(() => {
    selectSupplier();
  }, [supplierName]);

  const supplierDetails = (item) => {
    if (selectedSupplier === item) {
      setShowInput(!showInput); // Toggle the showInput state when the selected supplier is clicked
    } else {
      setSelectedSupplier(item);
      setShowInput(false);
    }
  };

  const handleSubmit = () => {
    const requestData = {
      createdBy: props.loggedInUser.loginId,
      supplierId: "",
      invoiceDate: purchaseDate,
      dueDate: dueDate,
      net: "",
      referenceNumber: refNumber,
      memo: "",
      globalDiscount: "",
      products: [
        {
          productId: "",
          quantity: "",
          unitPrice: "",
          description: "",
          discountPercentage: "",
          vatPercentage: "",
          unitPriceTaxInclusive: "",
        },
      ],
    };

    axios.post(
      "http://68.178.161.233:8080/handt/v2/purchaseOrder/getPurchaseOrders"
    );
  };

  return (
    <>
      <div style={{ paddingRight: 50, paddingLeft: 50 }}>
        <Container fluid className="mt-2">
          <Row>
            <Col className="d-flex justify-content-end">
              <div>
                <Link to="/Purchase">
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
                <Button
                  className="ms-3 fw-bolder"
                  style={{ backgroundColor: "#1d1d5e", borderColor: "#1d1d5e" }}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>

          <h1
            className="d-flex justify-content-center fs-6 fw-bolder"
            style={{ color: "#1d1d5e" }}
          >
            NEW PURCHASE ORDER
          </h1>

          <>
            <Row className="w-100">
              <Col className="col-4">
                <Form.Group>
                  {showInput && (
                    <Form.Control
                      className={`inputfocus text-center rounded-0 ${
                        selectedSupplier ? "bg-light" : ""
                      }`}
                      type="search"
                      name="supplierNameSearch"
                      placeholder="+ Add Supplier"
                      value={supplierName}
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
                      <Card className="" style={{ width: 250 }}>
                        <ListGroup
                          style={{ maxHeight: "15rem", overflowY: "scroll" }}
                        >
                          {props.customers.searchList.map((item) => (
                            <ListGroupItem
                              key={item.id}
                              onClick={() => supplierDetails(item)}
                              style={{ cursor: "pointer" }}
                            >
                              <strong>Name: </strong>
                              {item.name}
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                        <Link to="/VendorForm">
                          <Button variant="link">Add Vendor+</Button>
                        </Link>
                      </Card>
                    )}
                  {/* Selected supplier details */}
                  {selectedSupplier && (
                    <div
                      className="w-75 p-2 rounded"
                      style={{ backgroundColor: "#f0f0f0" }}
                    >
                      <h5
                        className="mt-1"
                        onClick={() => setShowInput(!showInput)}
                      >
                        {selectedSupplier.name}
                      </h5>
                      {selectedSupplier.addresses &&
                        selectedSupplier.addresses.length > 0 && (
                          <div>
                            {/* Supplier address details */}
                            <p
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                flex: "flex-wrap",
                              }}
                            >
                              {selectedSupplier.addresses[0].addressLine1},
                              <br />
                              <small className="mt-1">
                                {selectedSupplier.addresses[0].addressLine2},
                              </small>
                              <br />
                              <small>
                                {selectedSupplier.addresses[0].city},
                              </small>
                              <small className="ms-2">
                                {selectedSupplier.addresses[0].state}
                              </small>
                              <br />
                              <small>
                                {selectedSupplier.addresses[0].countryName},
                              </small>
                              <small className="ms-2">
                                {selectedSupplier.addresses[0].zipcode}.
                              </small>
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col className="col-4  d-flex justify-content-center">
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
                    <strong style={{ fontSize: 12 }}>Bill To:</strong> <br />
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
                    {/* <br />
                    <small style={{ fontSize: 12 }}>
                      +971 502226710, +971 542796562
                    </small>
                    <br />
                    <small style={{ fontSize: 12 }}>+971 25634643</small> */}
                    {/* <br />
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
                    </small> */}
                  </p>
                </div>
              </Col>

              <Col className="col-4 d-flex justify-content-end">
                <p>
                  <strong>Balance: AED </strong>
                </p>
              </Col>
            </Row>
          </>

          <>
            <Row className="mt-2 mb-3">
              <Col className="col-8 d-flex justify-content-start">
                <Form.Group>
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Invoice Date
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Due Date
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    type="date"
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Net *
                  </Form.Label>
                  <Form.Select
                    className="inputfocus rounded-0"
                    style={{ width: 160, height: "30px", fontSize: 14 }}
                  >
                    {netOption.map((item, index) => (
                      <option key={index} style={{ fontSize: 12, height: 20 }}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Ref Number
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    value={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        </Container>
      </div>
      <PurchaseForm />
    </>
  );
};

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    loggedInUser: state.users,
  };
};

export default connect(mapsToProps)(NewPurchase);
