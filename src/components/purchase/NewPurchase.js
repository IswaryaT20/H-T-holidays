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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  SEARCH_CUSTOMER_API_CALL,
  CREATE_PURCHASE_ORDER_API_CALL,
} from "../../utils/Constant";
import PurchaseForm from "./PurchaseForm";

const NewPurchase = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //use State
  const [supplierName, setSupplierName] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [globalDiscountState, setGlobalDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [vatChecked, setVatChecked] = useState(false);
  const [error, setError] = useState("");

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
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [success, setSuccess] = useState("");

  //Handlers

  //getting current date and due date
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    calculateDueDate(currentDate, selectedNet);
    setPurchaseDate(currentDate);
  }, []);

  const calculateDueDate = (date, net) => {
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + net);
    setDueDate(dueDate.toISOString().split("T")[0]);
  };

  const handleNetChange = (e) => {
    const selectedNetValue = parseInt(e.target.value);
    setSelectedNet(selectedNetValue);
    calculateDueDate(purchaseDate, selectedNetValue);
  };

  // getting supplier name
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

  const productList = (item) => {
    console.log("Item", item);
    setAllItems(item);
  };

  const globalDiscount = (value) => {
    setGlobalDiscount(value);
  };

  const overallDescription = (value) => {
    setDescription(value);
  };

  const globalVatChecked = (value) => {
    setVatChecked(value);
  };

  const handleSubmit = () => {
    const refNumError = "Please enter the REF Number";
    const supplierError = "Please select or add supplier";
    setError("");
    if (refNumber.length === 0) {
      setError(refNumError);
      return;
    }
    if (supplierName.length === 0) {
      setError(supplierError);
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
    // console.log("Purchase Date: ", purchaseDate);
    // console.log("Due Date: ", dueDate);
    // console.log("Reference Number: ", refNumber);
    // console.log("Supplier ID: ", selectedSupplier.id);
    // console.log("Net:", selectedNet);
    // console.log("Created By", props.loggedInUser.loginId);
    // const requestData= {
    //   products: tempArray,

    // }

    const requestData = {
      createdBy: props.loggedInUser.loginId,
      supplierId: selectedSupplier.id,
      invoiceDate: purchaseDate,
      dueDate: dueDate,
      net: selectedNet,
      referenceNumber: refNumber,
      memo: description,
      globalDiscount: globalDiscountState,
      products: tempArray,
    };

    dispatch({ type: CREATE_PURCHASE_ORDER_API_CALL, data: requestData });

    setShowAlertModal(true);
    setSuccess("Success");

    setTimeout(() => {
      window.location.reload(true);
      setShowAlertModal(false);
      setSuccess("");
      navigate("/Invoice");
    }, 1500);
  };

  return (
    <>
      <div style={{ paddingRight: 50, paddingLeft: 50 }}>
        <Container fluid className="mt-2">
          <Row className="mt-3">
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
                  onClick={handleSubmit}
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
            <Row className="w-100 mt-3">
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
                  {/* {error && !supplierName && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      Please enter the Supplier name.
                    </p>
                  )} */}
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
                    Purchase Date
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    // readOnly
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
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Net
                  </Form.Label>
                  <Form.Select
                    className="inputfocus rounded-0"
                    style={{ width: 160, height: "30px", fontSize: 14 }}
                    onChange={handleNetChange}
                  >
                    {netOptions.map((item, index) => (
                      <option
                        key={index}
                        style={{ fontSize: 12, height: 20 }}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Ref Number <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    value={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                  />
                  {error && !refNumber && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      Please enter REF Number
                    </p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </>
        </Container>
      </div>
      <PurchaseForm
        allItems={productList}
        globalDiscountValue={globalDiscount}
        description={overallDescription}
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
    loggedInUser: state.users,
  };
};

export default connect(mapsToProps)(NewPurchase);
