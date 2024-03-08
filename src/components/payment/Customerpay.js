import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Stack,
  Row,
  FormGroup,
  FormControl,
  Card,
  ListGroup,
  FormLabel,
  FormCheck,
  FormSelect,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { IoMdContact } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { Link } from "react-router-dom";
import Customer from "../customer/Customer";
import { AE } from "country-flag-icons/react/3x2";
import { MdPayments } from "react-icons/md";
import { useDispatch, useSelector, connect } from "react-redux";
import { SEARCH_CUSTOMER_API_CALL } from "../../utils/Constant";
import Receipt from "./Receipt";
import axios from "axios";
import { MASTER_API_CALL } from "../../utils/Constant";
import { Axios } from "axios";

function Customerpay(props) {
  const [masterCategory, setMasterCategory] = useState("");
  const [masterCategoryError, setMasterCategoryError] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymenttype] = useState("");
  const [Referenceno, setReferenceno] = useState("");
  const [chequeNumber, setchequeNumber] = useState("");
  const [Chequedate, setChequedate] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [masterPaytype, setMasterpaytype] = useState([]);
  const [chequerefnum, setChequerefnum] = useState(false); // Define chequerefnum state
  const [Paymentsummary, setPaymentsummary] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [success, setSuccess] = useState();
  const [errormessage, setErrormessage] = useState("");
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState("");
  useEffect(() => {
    if (showAlertModal) {
      const timeoutId = setTimeout(() => {
        setShowAlertModal(false);
        // window.location.reload();
      }, 500);
  
      return () => clearTimeout(timeoutId);
    }
  }, [showAlertModal]);


  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    if (e.target.name === "customernamesearch") {
      setCustomerName(e.target.value);
    }
    if (e.target.name === "amount") {
      setAmount(e.target.value);
    }
    if (e.target.name === "paymenttype") {
      setPaymenttype(e.target.value);
    }
    if (e.target.name === "referenceno") {
      setReferenceno(e.target.value);
    }
    if (e.target.name === "chequedate") {
      setChequedate(e.target.value);
    }
    if (e.target.name === "collectiondate") {
      setCollectionDate(e.target.value);
      console.log("payment", e.target.value);
    }
    if (e.target.name === "chequeNumber") {
      setchequeNumber(e.target.value);
    }
  };

  const customerSelect = () => {
    const searchname = customerName;

    if (searchname) {
      setLoading(true);

      // Add a delay of 1 second
      setTimeout(() => {
        dispatch({
          type: SEARCH_CUSTOMER_API_CALL,
          payload: { query: searchname },
        });
      }, 1000);
    }
  };

  useEffect(() => {
    customerSelect();
  }, [customerName]);

  useEffect(() => {
    console.log("the selectedcustomer", selectedCustomer);
    const selectedcustomerOutstanding = selectedCustomer?.id || 0; // Use optional chaining to handle null
    axios
      .post("http://68.178.161.233:8080/handt/v2/payment/getPaymentSummary", {
        customerId: selectedcustomerOutstanding,
      })
      .then((response) => {
        console.log("the payment summary", response.data.data);
        setPaymentsummary(response.data.data); 

      })
      
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedCustomer]);

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
  }, []);
  console.log("the master api", props.masterData.paymentTypes);
  console.log("the master api", selectedPaymentTypeId);

  const customerdetails = (item) => {
    setSelectedCustomer(item);
    setShowInput(false);
  };

  useEffect(() => {
    setChequerefnum(selectedPaymentTypeId === "3");
  }, [selectedPaymentTypeId]);

  const handlereceieve = (e) => {
    e.preventDefault();
    setErrormessage("");

    setErrormessage("");
    if (customerName.length === 0) {
      setErrormessage("Please enter the supplier name.");
      return;
    }
    if (amount.length === 0) {
      setErrormessage("Please enter Amount.");
      return;
    }

    const customerpayment = {
      customerId: selectedCustomer.id,
      createdBy: 3,
      paymentType: selectedPaymentTypeId,
      amount: amount,
      referenceNumber: Referenceno,
      chequeNumber: chequeNumber,
      chequeDate: Chequedate,
      description: null,
      collectionDate: collectionDate,
    };

    axios
      .post(
        "http://68.178.161.233:8080/handt/v2/payment/addReceipt",
        customerpayment
      )
      .then((response) => console.log(response.data.data))

      .catch((error) => console.log(error));

    console.log("payment", collectionDate);
    window.location.reload();
    setSuccess('Success');
    setShowAlertModal(true);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Container fluid className="flex mt-5 pt-3">
        <Row className="w-100 ms-0 mt-2 bg-blur" style={{}}>
          <Col lg={2}></Col>
          <Col
            className="border shadow p-3 w-80 "
            style={{
              minHeight: 520,
              maxHeight: 820,
              backgroundColor: "white ",
            }}
          >
            <Stack
              direction="horizontal"
              className=" mt-2 p-2 "
              gap={3}
              style={{ backgroundColor: "#e4e4e4", height: "50px" }}
            >
              <div className="f-20 text-capitalize">Receipt</div>
              <button
                className="p-1 ms-auto f-14 btn-blue"
                onClick={handlereceieve}
              >
                Receive
              </button>
              <Link to="/Receipt">
                <button className="p-1 f-14 me-2 btn-blue">Cancel</button>
              </Link>
            </Stack>

            <Row className="f-20 mt-3">
              <Col>
                <p className="f-20 ms-auto d-flex align-items-center">
                  <IoMdContact style={{ fontSize: 40 }} />
                  <span className="ms-2 f-18 text-capitalize">
                    Contact details
                  </span>
                </p>
                <FormGroup>
                  {showInput && (
                    <FormControl
                      id="name"
                      type="search"
                      name="customernamesearch"
                      className="inputfocus f-14 br_b-2 rounded-0 mt-2"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="Search Customer Name"
                      onChange={(e) => handleSearchChange(e)}
                    />
                  )}
                  {customerName && !customerName && (
                    <p variant="danger" className="mt-2">
                      {customerName}
                    </p>
                  )}

                  {showInput &&
                    props.customers.searchList &&
                    props.customers.searchList.length > 0 && (
                      <Card className="mt-3" style={{ width: "18rem" }}>
                        <ListGroup
                          variant="flush"
                          style={{ maxHeight: "15rem", overflowY: "scroll" }}
                        >
                          {props.customers.searchList.map((item) => (
                            <ListGroup.Item
                              key={item.id}
                              onClick={() => customerdetails(item)}
                              style={{ cursor: "pointer" }}
                            >
                              <strong onClick={() => setShowInput(true)}>
                                Name:
                              </strong>
                              {item.name}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <Link to="/CustomerForm">
                          <Button variant="link">Add Customer +</Button>
                        </Link>
                      </Card>
                    )}
                  {selectedCustomer ? (
                    <div
                      xxl={2}
                      lg={2}
                      className="w-80 p-2"
                      style={{ backgroundColor: "#e4e4e4" }}
                    >
                      <h3
                        className="mt-1"
                        onClick={() => setShowInput(!showInput)}
                      >
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
                              {/* {selectedCustomer.id},
                              <br /> */}
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
                    <span></span>
                  )}
                </FormGroup>
              </Col>

              <Col className="font-large f-20 text-end text-capitalize">
                <p className="d-flex flex-column fs-4 mt-2">
                  Outstanding Amount 
                  {/* {Paymentsummary &&
                    Object.values(Paymentsummary).map((value, index) => (
                      <span key={index} className="f-18 mt-2">
                        {value.totalOutstanding} AED
                      </span>
                    ))} */}
                    <span  className="f-18 mt-2"> 0.00 AED</span>
                </p>

                <div className="mt-4">
                  <FormLabel className="d-flex justify-content-end align-items-center f-16 txt-ht_blue fw-bold font-bolder ">
                    <span className="mb-1 me-2">
                      <IoCalendar
                        style={{
                          fontSize: 20,
                        }}
                      />
                    </span>
                    <span>Receipt Date :</span>
                    <FormControl
                      type="date"
                      label=""
                      className="w-40 ms-2 inputfocus"
                      defaultValue={currentDate}
                      min={currentDate}
                    ></FormControl>
                  </FormLabel>
                </div>
                <div className="mt-4 d-flex justify-content-around">
                  <FormLabel className="d-flex justify-content-end ms-auto align-items-center f-16 txt-ht_blue fw-bold font-bolder me-2">
                    <span>Currency :</span>
                  </FormLabel>
                  <AE
                    className="w-40 mt-1"
                    country="AE"
                    style={{
                      height: "20",
                    }}
                  />
                </div>
              </Col>
            </Row>
            <div
              className=""
              style={{
                margin: "5px 5px 5px 5px",
                width: "98%",
              }}
            >
              <div className="p-1 pt-3">
                <FormGroup className="d-flex align-items-center">
                  <FormLabel className="d-flex align-items-center mt-8 f-16 fw-bold txt_ht-blue">
                    <span className="ms-2 me-2">
                      <MdPayments style={{ fontSize: 20 }} />
                    </span>
                    Receipt details
                  </FormLabel>
                  {/* <FormCheck
                    type="switch"
                    className="fs-4 ms-3 mt-1"
                    onClick={handleSwitchClick}
                  /> */}
                </FormGroup>
              </div>
              {/* {switchpayment ? ( */}
              <div className="p-1">
                <FormGroup className="d-flex justify-content-around">
                  <FormLabel>
                    Payment Type *
                    <FormSelect
                      className="inputfocus w-100"
                      name="paymenttype"
                      style={{ flex: 3, marginRight: "1px" }}
                      onChange={(event) => {
                        const selectedId = event.target.value;
                        setMasterCategory(selectedId);
                        setMasterCategoryError(false);
                        setSelectedPaymentTypeId(selectedId);

                        // Set chequerefnum based on the selected value
                        setChequerefnum(selectedId === "3"); // Assuming '3' is the value for "Cheque"
                        console.log("Selected Payment Type ID:", selectedId);
                        console.log("Selected chequerefnum", chequerefnum);
                      }}
                      placeholder="Select Payment type"
                    >
                      <option>Select the Payment Mode</option>
                      {props.masterData.paymentTypes &&
                        props.masterData.paymentTypes.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.value}
                          </option>
                        ))}
                    </FormSelect>
                  </FormLabel>

                  <FormLabel className="ms-4">
                    Amount
                    <FormControl
                      type="number"
                      className="inputfocus"
                      value={amount}
                      name="amount"
                      style={{
                        width: 250,
                      }}
                      onChange={(e) => handleSearchChange(e)}
                    ></FormControl>
                    {errormessage && !amount && (
                      <p variant="danger" className="mt-2">
                        {errormessage}
                      </p>
                    )}
                  </FormLabel>
                  <FormLabel>
                    Reference No
                    <FormControl
                      name="referenceno"
                      style={{
                        width: 250,
                      }}
                      onChange={(e) => handleSearchChange(e)}
                    ></FormControl>
                  </FormLabel>
                </FormGroup>
                <div className="p-1">
                  {chequerefnum && (
                    <FormGroup className="d-flex justify-content-between ">
                      <FormLabel className="ms-2">
                        Cheque Date
                        <FormControl
                          className="inputfocus"
                          type="date"
                          name="chequedate"
                          min={currentDate}
                          style={{
                            width: 250,
                          }}
                          onChange={(e) => handleSearchChange(e)}
                        ></FormControl>
                      </FormLabel>

                      <FormLabel className="ms-2 me-2">
                        Collection Date
                        <FormControl
                          className="mt-1 inputfocus"
                          type="date"
                          name="collectiondate"
                          min={currentDate}
                          value={collectionDate}
                          onChange={(e) => handleSearchChange(e)}
                          style={{
                            width: 250,
                          }}
                        ></FormControl>
                      </FormLabel>

                      <FormLabel className="me-2">
                        Cheque Number
                        <FormControl
                          className="inputfocus"
                          name="chequeNumber"
                          type="text"
                          style={{
                            width: 250,
                          }}
                          onChange={(e) => handleSearchChange(e)}
                        ></FormControl>
                      </FormLabel>
                    </FormGroup>
                  )}
                </div>
              </div>
              {/* ) : null} */}
            </div>

            <div className="d-flex flex-column align-item-center text-end pe-3 pt-3">
              <p className="txt-ht_blue f-16 fw-bold">
                <span>Due Amount :</span>
                <span
                  className="fst-normal"
                  style={{
                    color: "black",
                    marginLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  0.00 AED
                </span>
              </p>
              <p className="txt-ht_blue f-16 fw-bolder">
                <span>Paid Amount :</span>
                <span
                  className="fst-normal"
                  style={{
                    color: "black",
                    marginLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  0.00 AED
                </span>
              </p>
              {/* <p className="txt-ht_blue f-16 fw-bolder">
                Knock Off Amount :
                <span
                  className="fst-normal"
                  style={{
                    color: "black",
                    marginLeft: '10px',
                  }}
                >
                  ₹ 51,117.60
                </span>
              </p> */}
              <p className="txt-ht_blue f-16 fw-bolder">
                <span> Remaining Amount :</span>
                <span
                  className=""
                  style={{
                    color: "black",
                    marginLeft: "10px",
                    fontSize: "12px",
                  }}
                >
                  0.00 AED
                </span>
              </p>
            </div>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
      <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)}>
        <Modal.Header>
          <Modal.Title style={{ fontSize: "12px" }}>Product Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success === "Success" ? (
            <>
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
            </>
          ) : (
            <Alert variant="danger">Data Saved Unsuccessfully</Alert>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    masterData: state.masterData,
    loggedInUser: state.users,
  };
};

export default connect(mapsToProps)(Customerpay);