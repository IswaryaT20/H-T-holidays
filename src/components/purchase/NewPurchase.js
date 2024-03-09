import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  SEARCH_CUSTOMER_API_CALL,
  CREATE_PURCHASE_ORDER_API_CALL,
} from "../../utils/Constant";
import PurchaseForm from "./PurchaseForm";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./Purchase.css";

const NewPurchase = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  //use State
  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [globalDiscountState, setGlobalDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [vatChecked, setVatChecked] = useState(false);
  const [error, setError] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [supplierOptions, setSupplierOptions] = useState([]);

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
  const [showTypeahead, setShowTypeahead] = useState(true);

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
  useEffect(() => {
    dispatch({
      type: SEARCH_CUSTOMER_API_CALL,
      payload: { businessTypeId: 3 },
    });
  }, [dispatch]);

  useEffect(() => {
    if (props.customers.searchList.length > 0) {
      setSupplierOptions(
        props.customers.searchList.map((item) => ({
          id: item.id,
          userName: item.userName,
          name: item.name,
          addresses: item.addresses,
          mobile: item.mobile,
        }))
      );
    } else {
      setSupplierOptions([]);
    }
  }, [props.customers.searchList]);

  const handleSupplierSelection = (selected) => {
    setSelectedSupplier(selected[0]);
    setShowTypeahead(!selected[0]);
  };

  const handleSearchChange = (query) => {
    dispatch({
      type: SEARCH_CUSTOMER_API_CALL,
      payload: { query, businessTypeId: 3 },
    });
  };

  //Values from PurchaseForm
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
    if (selectedSupplier.length === 0) {
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
    }, 1000);
  };

  return (
    <>
      <div style={{ paddingRight: 50, paddingLeft: 50, marginTop: 75 }}>
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
                  {showTypeahead ? (
                    <Typeahead
                      className="typeahead br_b-2 p-1"
                      id="supplierName"
                      onChange={handleSupplierSelection}
                      options={supplierOptions}
                      labelKey="name"
                      onInputChange={handleSearchChange}
                      placeholder="+ Add Supplier"
                      style={{ width: 200, border: "2px dotted #25316f" }}
                    />
                  ) : (
                    <p
                      className={`inputfocus text-start rounded-1 p-2 ${
                        selectedSupplier ? "f0f0f0" : ""
                      }`}
                      style={{ width: 250, backgroundColor: "#f0f0f0" }}
                    >
                      <strong onClick={()=>setShowTypeahead(!showTypeahead)}>{selectedSupplier.name}</strong>
                      <br />
                      {selectedSupplier.addresses && (
                        <div>
                          <small>
                            {selectedSupplier.addresses[0]?.addressLine1}
                          </small>
                          ,<br />
                          <small>
                            {selectedSupplier.addresses[0]?.addressLine2}
                          </small>
                          ,<br />
                          <small>
                            {selectedSupplier.addresses[0]?.city}
                          </small>,{" "}
                          <small>{selectedSupplier.addresses[0]?.state}</small>,{" "}
                          <small>
                            {selectedSupplier.addresses[0]?.zipcode}
                          </small>
                          ,<br />
                          <small>
                            {selectedSupplier.addresses[0].countryName}
                          </small>
                        </div>
                      )}
                    </p>
                  )}
                </Form.Group>
                {error && !selectedSupplier && (
                  <p style={{ color: "red", fontSize: 12 }}>
                    Please enter the supplier name.
                  </p>
                )}
              </Col>

              <Col className="col-4  d-flex justify-content-center">
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    width: 300,
                    // height: "auto",
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
            <Row className="mt-3 mb-3">
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
                      Please enter REF Number.
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
