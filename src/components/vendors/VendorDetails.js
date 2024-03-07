import React, { useEffect, useState, } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL } from "../../utils/Constant";
import Avatar from "../../Assets/avatars/1.jpg";
import { Container, Row, Col, Modal, Button, FormLabel,FormControl ,FormGroup,Form} from "react-bootstrap"; // Import Modal and Button
import { MdAddIcCall } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import axios from "axios";

const VendorDetails = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedvendor, setselectedVendor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [savedFormData, setSavedFormData] = useState(null);
    const [isLogNoteModalOpen, setIsLogNoteModalOpen] = useState(false);
    const [logNotes, setLogNotes] = useState("");

    

    const [formData, setFormData] = useState({
        bankName: "",
        accountNumber: "",
        bankCountry: "",
        accountHolderName: "",
        iban: "",
        branch: ""
    });

    useEffect(() => {
        dispatch({
            type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
            data: location.state.id,
        });
    }, [dispatch, location.state.id]);

    useEffect(() => {
        setselectedVendor(props.customers.selectedCustomerDetails);
    }, [props.customers.selectedCustomerDetails]);

    const handleBankClick = () => {
        setIsModalOpen(true); // Open the modal when clicking on bank details
    };

    const handleAddressClick = () => {
      setIsAddressModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false); // Close the bank modal
    setIsAddressModalOpen(false); // Close the address modal
};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSave = () => {
      setSavedFormData({ ...formData });
      handleClose();
    };
    const fetchBankDetails = async (vendorId) => {
      try {
          const response = await axios.get(`http://68.178.161.233:8080/handt/v2/customer/getBankDetails/${vendorId}`);
          setFormData({
              bankName: response.data.bankName,
              accountNumber: response.data.accountNumber,
              bankCountry: response.data.bankCountry,
              accountHolderName: response.data.accountHolderName,
              iban: response.data.iban,
              branch: response.data.branch
          });
      } catch (error) {
          console.error("Error fetching bank details:", error);
      }
  };
  
  // Call fetchBankDetails when the component mounts or when selectedvendor changes
  useEffect(() => {
      if (selectedvendor) {
          fetchBankDetails(selectedvendor.id);
      }
  }, [selectedvendor]);
  
 
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
            <Row className="" style={{ height: "" }}>
                {selectedvendor && (
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
                                <h4 className="mt-4">{selectedvendor.name}</h4>
                                <p> {selectedvendor.jobPosition}</p>
                                <Col>
                                    <h6>Title</h6>
                                    <p>{selectedvendor.title}</p>
                                </Col>
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
                                    {selectedvendor.mobile}
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
                                    {selectedvendor.email}
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
                                            <h6>Vendor Code</h6>
                                            <p>{selectedvendor.id}</p>
                                        </Col>
                                        <Col className="">
                                            <h6 onClick={handleBankClick}>Bank</h6> {/* Add onClick event handler */}
                                            <p>{selectedvendor.bankAccounts}</p>
                                        </Col>

                                        <Col className="">
                                        <h6 onClick={handleAddressClick}>Address</h6>
                                            <p>
                                                <span>{selectedvendor.address}</span>,{" "}
                                                <span>{selectedvendor.city}</span>,{" "}
                                                <span>{selectedvendor.state}</span>,{" "}
                                                <span>{selectedvendor.country}</span>,{" "}
                                                <span>{selectedvendor.zipcode}</span>
                                            </p>
                                        </Col>
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
                                            <p>{selectedvendor.businessTypeName}</p>
                                        </Col>
                                        <Col>
                                            <h6>VAT Treatment</h6>
                                            <p>
                                                {selectedvendor.registered
                                                    ? "Registered"
                                                    : "Not Registered"}
                                            </p>
                                            <p>TRN Number: {selectedvendor.trnNo}</p>
                                        </Col>
                                        <Col>
                                            <h6>Phone Number</h6>
                                            <p>{selectedvendor.phone}</p>
                                            <h6>Website</h6>
                                            <p>{selectedvendor.website}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h5 className="mb-6 mt-4 mb-6p text-underline">
                                            Personal Information
                                        </h5>
                                        <Col>
    <h6 onClick={() => setIsLogNoteModalOpen(true)}>Log Notes</h6>
    <p>{selectedvendor.logNotes}</p>
</Col>

                                        <Col>
                                          
                                        </Col>
                                    </Row>
                                </>
                            </div>
                        </Col>
                    </>
                )}
            </Row>
            {/* Modal for Bank Form */}
            <Modal show={isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Bank Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Row className="">
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup className=" m-2 d-flex flex-row">
                <FormLabel className="f-14 w-100 w-100">
            
                  Bank Name ({selectedvendor.bankNumber})
                  <FormControl
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="f-14 w-100 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Number
                  <FormControl
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Country
                  <FormControl
                    name="bankcountry"
                    value={formData.bankcountry}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Holder Name
                  <FormControl
                    name="accountholdername"
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
                <FormLabel className="f-14 w-100 ">
                  IBAN No
                  <FormControl
                    name="iban"
                    value={formData.iban}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Branch
                  <FormControl
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="reset" variant="secondary" onClick={handleClose}>
            Close
          </Button>
    
        </Modal.Footer>
            </Modal>
            <Modal show={isAddressModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="h-20">
            Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            {/* {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  className="inputfocus"
                  inline
                  label="Contact Address"
                  name="group1"
                  type={type}
                  id={`inline-${type}-3`}
                />

                <Form.Check
                  className="inputfocus"
                  inline
                  label="Invoice Address"
                  name="group1"
                  type={type}
                  id={`inline-${type}-4`}
                />
                <Form.Check
                  inline
                  label="Other Address"
                  name="group1"
                  type={type}
                  id={`inline-${type}-5`}
                />
              </div>
            ))} */}
          </Form>
          <div className="f-14 d-flex flex-row" style={{ flex: "1" }}>
            <FormGroup
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormLabel
                className="f-20 "
                style={{
                  flex: 2,
                  fontWeight: "bolder",
                  color: "#25316f",
                }}
              >
                Address
              </FormLabel>
            </FormGroup>
            <FormGroup
              style={{
                display: "flex",
                flex: 3,
                flexDirection: "column",
              }}
            >
              <Form.Control
                className="f-14 br_b-2 rounded-0 mt-2 inputfocus"
                style={{ border: "2px dotted #25316f" }}
                placeholder="Address"
                name="customeraddress"
                value={formData.customeraddress}
                onChange={handleChange}
              />
              <FormGroup className="f-14 d-flex justify-space-between">
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Emirates"
                  name="emirates"
                  value={formData.emirates}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="f-14 d-flex justify-space-between">
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                  name="country"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormGroup>
          </div>
          {/* Display form data values */}
          {savedFormData && (
            <div className="mt-3">
              <h5>Saved Form Data:</h5>
              <p>Address Type: {savedFormData.addressType}</p>
              <p>Customer Address: {savedFormData.customeraddress}</p>
              <p>City: {savedFormData.city}</p>
              <p>Emirates: {savedFormData.emirates}</p>
              <p>Country: {savedFormData.country}</p>
              <p>Zip: {savedFormData.zip}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          
          <Button
            className="b-none"
            style={{
              height: "max-content",
              width: "max-content",
              backgroundColor: "#25316f",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
            </Modal>
            <Modal show={isLogNoteModalOpen} onHide={() => setIsLogNoteModalOpen(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Log Notes</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <FormLabel>
                  <h4>Log Notes</h4>
                </FormLabel>
                <Form.Control
                  className="inputfocus"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
   
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsLogNoteModalOpen(false)}>Close</Button>
    </Modal.Footer>
</Modal>

        </Container>
    );
};

const mapsToProps = (state) => {
    return {
        customers: state.customers,
    };
};

export default connect(mapsToProps)(VendorDetails);
