import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { Button, FormGroup, Modal, FormLabel, FormControl, Container, Row, Col, Form } from "react-bootstrap";
import { SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL, ADD_CUSTOMER_BANK_DETAILS_API_CALL, UPDATE_CUSTOMER_STATUS_CODE } from "../../utils/Constant";
import Avatar from "../../Assets/avatars/1.jpg";
import { MdAddIcCall } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

const CustomerDetails = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedCustomer, setselectedCustomer] = useState(null);
  const [showAddBankDetails, setShowBankDetails] = useState(false);
  const [bankDetails, setBankDetails] = useState({customerId: location.state.id});
  const [showAddressesModal, setShowAddressModal] = useState(false);


  useEffect(() => {
    dispatch({
      type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
      data: location.state.id,
    });
  }, [location.state.id]);

  useEffect(() => {
    setselectedCustomer(props.customers.selectedCustomerDetails);
  }, [props.customers.selectedCustomerDetails]);

  useEffect(() => {
    if (props.customers.code === 200) {
      setShowBankDetails(false)
      dispatch({type: UPDATE_CUSTOMER_STATUS_CODE, payload: 0})
    }
  }, [props.customers.code])

  const bankNameChange = (value) => {
    setBankDetails({...bankDetails, bankName: value})
  }

  const accountHolderNameChange = (value) => {
    setBankDetails({...bankDetails, accountHolderName: value})
  }

  const accountNumberChange = (value) => {
    setBankDetails({...bankDetails, accountNumber: value})
  }

  const ibanNumberChange = (value) => {
    setBankDetails({...bankDetails, code: value})
  }

  const onBranchNameChange = (value) => {
    setBankDetails({...bankDetails, branchName: value})
  }

  const onSelectCountry = (value) => {
    setBankDetails({...bankDetails, country: value})
  }

  const showBankDetails = () => {
    setShowBankDetails(!showAddBankDetails);
  }

  const handleAddAddress = () => {
    setShowAddressModal(!showAddressesModal)
  }

  const saveBankDetails = () => {
    const bankInformation = []
    bankInformation.push(bankDetails)

    dispatch({type: ADD_CUSTOMER_BANK_DETAILS_API_CALL, payload: bankInformation})
  } 

  return (
    <Container
      className="customercontents mt-4"
      style={{
        backgroundColor: "white",
        color: "#1d1d5e",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <Row className="" style={{ height: "", paddingBottom: 50 }}>
        {selectedCustomer && (
          <>
            <Col
              lg={3}
              className="d-flex pt-5 ps-4"
              style={{ borderRight: "1px solid #dbdcdc" }}
            >
              <div className=" profile-contents">
                <img
                  className="w-50 rounded-circle"
                  style={{ border: "5px white solid" }}
                  src={Avatar}
                  alt="profile picture"
                ></img>
                <h4 className="mt-4">{selectedCustomer.name}</h4>
                <p> {selectedCustomer.jobPosition}</p>
                <p className="callsection" style={{ marginTop: "20%" }}>
                  <span
                    className="callicon mr-10 text-white"
                    style={{
                      padding: "10px",
                      borderRadius: "28px",
                      backgroundColor: "#0fbb0f",
                    }}
                  >
                    <MdAddIcCall className="" style={{ fontSize: "20px" }} />
                  </span>
                  {selectedCustomer.mobile}
                </p>
                <p className="mailsection" style={{ marginTop: "15%" }}>
                  <span
                    className="mailicon mr-10 text-white"
                    style={{
                      padding: "10px",
                      borderRadius: "28px",
                      backgroundColor: "#808080bf",
                    }}
                  >
                    <MdOutlineMail className="" style={{ fontSize: "20px" }} />
                  </span>
                  {selectedCustomer.email}
                </p>
              </div>
            </Col>
            <Col lg={9} className="ps-4p">
              <div>
                <>
                  <Row
                    className="w-100"
                    style={{ borderBottom: "1px solid #dbdcdc" }}
                  >
                    <h5 className="mb-6 mt-4 mb-6p text-underline">
                      Official Information
                    </h5>
                    <Col className="">
                      <h6>Customer Code</h6>
                      <p>{selectedCustomer.id}</p>
                    </Col>
                    <Col className="">
                      <h6>Customer Category</h6>
                      <p>{selectedCustomer.customerCategory}</p>
                    </Col>
                    <Col className="">
                      <h6>Address</h6>
                      <p>
                        <span>{selectedCustomer.address}</span>,{" "}
                        <span>{selectedCustomer.city}</span>,{" "}
                        <span>{selectedCustomer.state}</span>,{" "}
                        <span>{selectedCustomer.country}</span>,{" "}
                        <span>{selectedCustomer.zipcode}</span>
                      </p>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row
                    className="w-100"
                    style={{ borderBottom: "1px solid #dbdcdc" }}
                  >
                    <h5 className="mb-6 mt-4 mb-6p text-underline">
                      Additional Information
                    </h5>
                    <Col>
                      <h6>Business Type</h6>
                      <p>{selectedCustomer.businessTypeName}</p>
                    </Col>
                    <Col>
                      <h6>VAT Treatment</h6>
                      <p>
                        {selectedCustomer.registered
                          ? "Registered"
                          : "Not Registered"}
                      </p>
                      <p>TRN Number: {selectedCustomer.trnNo}</p>
                    </Col>
                    <Col>
                      <h6>Phone Number</h6>
                      <p>{selectedCustomer.phone}</p>
                      <h6>Website</h6>
                      <p>{selectedCustomer.website}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{paddingLeft: 25}}>
                    <h5 className="mt-4 text-underline">
                      Bank Deails
                    </h5>
                      {
                        props.customers.selectedCustomerDetails.bankAccounts && props.customers.selectedCustomerDetails.bankAccounts.map(item => {
                          return <div style={{paddingLeft: 8, paddingRight: 8, paddingTop: 8, paddingBottom: 8, display: 'flex', flexDirection: 'column', backgroundColor: '#F5F5F5', marginTop: 2}}>
                              <label style={{fontSize: 16, fontWeight: 'bold', color: '#505050'}}>{item.bankName} - {item.accountNumber}</label>
                              <label style={{fontSize: 12, color: '#505050'}}>{item.bankName},&nbsp;{item.branchName}</label>
                          </div>
                        })
                      }

                      <h6 style={{cursor: 'pointer', marginTop: 35, marginLeft: 8, fontWeight: '600'}} onClick={showBankDetails}><u>Add Bank Details</u></h6>
                      <p>{selectedCustomer.logNotes}</p>
                    </Col>
                    <Col>
                      <h5 className="mt-4 text-underline">Addresses</h5>

                      <h6 style={{cursor: 'pointer', marginTop: 35, marginLeft: 8, fontWeight: '600'}} onClick={handleAddAddress}><u>Add Address</u></h6>
                    </Col>
                  </Row>
                </>
              </div>
            </Col>
          </>
        )}
      </Row>

      <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showAddBankDetails}
        style={{
          width: "100%",
          placeItems: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Bank Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Row className="">
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup className=" m-2 d-flex flex-row">
                <FormLabel className="f-14 w-100 w-100">
                  Bank Name
                  <FormControl
                    name="bankName"
                    className="f-14 w-100 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    onChange={(e) => bankNameChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Number
                  <FormControl
                    name="accountNumber"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => accountNumberChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Country
                   <Form.Select
                          className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="Country"
                          onChange={(e) => onSelectCountry(e.target.value)}
                          name="country"
                        >
                          <option value={0}>Select Country</option>
                          <option value={2}>UAE</option>
                          <option value={1}>INDIA</option>
                        </Form.Select>
                </FormLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Holder Name
                  <FormControl
                    name="accountholdername"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => accountHolderNameChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
                <FormLabel className="f-14 w-100 ">
                  IBAN No
                  <FormControl
                    name="iban"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => ibanNumberChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Branch
                  <FormControl
                    name="branch"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => onBranchNameChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="reset" variant="secondary" onClick={showBankDetails}>
            Close
          </Button>

          <Button type="reset" variant="primary" onClick={saveBankDetails}>
            Save
          </Button>
    
        </Modal.Footer>
      </Modal>
    </>

    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showAddressesModal}
        style={{
          width: "100%",
          placeItems: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Bank Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Row className="">
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup className=" m-2 d-flex flex-row">
                <FormLabel className="f-14 w-100 w-100">
                  Bank Name
                  <FormControl
                    name="bankName"
                    className="f-14 w-100 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    onChange={(e) => bankNameChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Number
                  <FormControl
                    name="accountNumber"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => accountNumberChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Country
                   <Form.Select
                          className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="Country"
                          onChange={(e) => onSelectCountry(e.target.value)}
                          name="country"
                        >
                          <option value={0}>Select Country</option>
                          <option value={2}>UAE</option>
                          <option value={1}>INDIA</option>
                        </Form.Select>
                </FormLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Holder Name
                  <FormControl
                    name="accountholdername"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => accountHolderNameChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
                <FormLabel className="f-14 w-100 ">
                  IBAN No
                  <FormControl
                    name="iban"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => ibanNumberChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Branch
                  <FormControl
                    name="branch"
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    onChange={(e) => onBranchNameChange(e.target.value)}
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="reset" variant="secondary" onClick={showBankDetails}>
            Close
          </Button>

          <Button type="reset" variant="primary" onClick={saveBankDetails}>
            Save
          </Button>
    
        </Modal.Footer>
      </Modal>
    </>
    </Container>
  );
};

const mapsToProps = (state) => {
  return {
    customers: state.customers,
  };
};

export default connect(mapsToProps)(CustomerDetails);
