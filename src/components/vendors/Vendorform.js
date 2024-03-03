import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Button,
  Container,
  Modal,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import avtar1 from "../../Assets/avatars/1.jpg";
import avtar2 from "../../Assets/avatars/2.jpg";
import avtar3 from "../../Assets/avatars/3.jpg";
import avtar4 from "../../Assets/avatars/4.png";
import avtar5 from "../../Assets/avatars/5.png";
import profile from "../../Assets/images/profile.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Bankform from "./VendorBankForm";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  MASTER_API_CALL,
  CREATE_CUSTOMER_API_CALL,
  REGISTER_API_CALL,
  INITIAL_STATE,
} from "../../utils/Constant";

const isEmailValid = (email1) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email1);
};

function VendorForm(props) {
  const [selectedImage, setSelectedImage] = useState(profile);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);
  const [suppliername, setSupplierName] = useState("");
  const [supllieraddress, setSupplierAddress] = useState("");
  const [city, setCity] = useState("");
  const [emirates, setEmirates] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [vattreatment, setVatTreatment] = useState("");
  const [trnnum, setTrnNum] = useState("");
  const [title, setTitle] = useState("");
  const [jobposition, setJobPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, seterror] = useState("");
  const [bankdetails, setBankDetails] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [vatError, setVatError] = useState(false);

  const dispatch = useDispatch();
  console.log("props message : ",props);

  const avatars = [
    { id: "1", name: "avatar1", src: avtar1 },
    { id: "2", name: "avatar2", src: avtar2 },
    { id: "3", name: "avatar3", src: avtar3 },
    { id: "4", name: "avatar4", src: avtar4 },
    { id: "5", name: "avatar5", src: avtar5 },
    { id: "6", name: "avatar6", src: profile },
  ];

  const openAvatars = () => {
    setIsAvatarsOpen(!isAvatarsOpen);
  };

  const captureImage = (e) => {
    const selectedImageSrc = e.target.src;
    setSelectedImage(selectedImageSrc);
    setIsAvatarsOpen(false);
  };

  const bankModal = () => {
    if (suppliername.trim() !== "") {
      setBankDetails(!bankdetails);
    } else {
      console.error("setName");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      setEmailError(
        isEmailValid(e.target.value) ? "" : "Invalid email format"
      );
    }

    if (e.target.name === "suppliername") setSupplierName(e.target.value);
    if (e.target.name === "supllieraddress") setSupplierAddress(e.target.value);
    if (e.target.name === "city") setCity(e.target.value);
    if (e.target.name === "emirates") setEmirates(e.target.value);
    if (e.target.name === "country") setCountry(e.target.value);
    if (e.target.name === "zip") setZip(e.target.value);
    if (e.target.name === "vattreatment") setVatTreatment(e.target.value);
    if (e.target.name === "trnnumber") setTrnNum(e.target.value);
    if (e.target.name === "title") setTitle(e.target.value);
    if (e.target.name === "jobposition") setJobPosition(e.target.value);
    if (e.target.name === "phone") setPhone(e.target.value);
    if (e.target.name === "mobile") setMobile(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "website") setWebsite(e.target.value);
  };

  const handlesubmit = () => {
    if (suppliername.length === 0) {
      seterror("the suppliername is required");
      return;
    } 

    const sendsupplierdata = {
      name: suppliername,
      jobPosition: jobposition,
      trnNo: trnnum,
      phone: phone,
      mobile: mobile,
      email: email,
      website: website,
      isRegistered: vattreatment,
      title: title,
      createdBy: 1,
      businessTypeId: 3,
      addresses: [
        {
          addressLine1: supllieraddress,
          addressLine2: city,
          city: city,
          state: emirates,
          country: 1,
          zipcode: zip,
          addressTypeId: 1,
        },
      ],
    };
    dispatch({
      type: CREATE_CUSTOMER_API_CALL,
      payload: sendsupplierdata,
    });
    console.log("supplier data", props.customers);
    console.log(sendsupplierdata);
  };

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
    console.log("message :", props.message);
  },[]);

  const handleVatreatment = (item) => {
    console.log(item.target.value);
    setVatTreatment(item.target.value);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Container fluid className=" f-14 ">
          <Row className=" f-14 ms-1 me-1 pb-1 pt-1 mt-3 mb-3">
            <Col className=" f-14 d-flex justify-content-start  ">
              <Button
                type="submit"
                className=" f-14 bg-blue b-none f-14 mt-1 text-uppercase rounded-1"
                style={{
                  height: "28px",
                  width: "13%",
                  backgroundColor: "#25316f",
                }}
                onClick={handlesubmit}
              >
                Save
              </Button>
            </Col>
            <Col className="d-flex justify-content-end me-3 ">
              <Button
                className="m-1 bg-blue f-12 rounded-1 b-none"
                style={{ backgroundColor: "#25316f", width: "max-content" }}
                // onClick={bankmodal}
              >
                Accounting
              </Button>
              <Button
                className="m-1 bg-blue f-12 rounded-1 b-none "
                style={{ backgroundColor: "#25316f", width: "max-content" }}
              >
                Log Notes
              </Button>
            </Col>
          </Row>
          {/*---------------form starts ---------------------*/}
          <Row
            xs={12}
            sm={12}
            lg={9}
            md={9}
            xxl={9}
            className=" f-14 ms-1 mt-2 w-100 "
            style={{ flex: 1 }}
          >
            <Col
              xs={6}
              md={8}
              lg={8}
              xxl={8}
              className="border border-2  shadow"
            >
              <Row style={{ flex: 1 }} className=" ms-0 ">
                <Col
                  xs={10}
                  sm={10}
                  lg={10}
                  md={10}
                  xxl={10}
                  className=" f-14 d-flex p-4"
                ></Col>
                <Col
                  xs={3}
                  sm={3}
                  md={2}
                  lg={2}
                  xxl={2}
                  className="mt-1 d-flex justify-content-end "
                  style={{ zIndex: "9" }}
                >
                  <Form.Group className="text-end d-flex flex-column justify-content-end">
                    <img
                      src={selectedImage}
                      alt="Profile picture for cusotmer"
                      className=" f-14 img-thumbnail rounded-circle"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                      onClickCapture={openAvatars}
                    />

                    <Modal show={isAvatarsOpen} onHide={openAvatars}>
                      <Modal.Body>
                        <strong>Kindly choose the profile picture</strong>
                      </Modal.Body>

                      {isAvatarsOpen && (
                        <div className=" h-20 p-2">
                          <div className="d-flex w-100 flex-wrap position-relative ">
                            {avatars.map((item) => (
                              <img
                                className="ms-2 p-2 cursor-pointer  rounded-full  p-1"
                                style={{ zIndex: "99", width: "20%" }}
                                name={item.name}
                                key={item.id}
                                src={item.src}
                                rounded
                                onClick={captureImage}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </Modal>
                    <Form.Label className="">Profile Picture</Form.Label>
                  </Form.Group>
                </Col>
              </Row>

              <Row
                className="ps-3 pe-3"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Col
                  xxl={7}
                  lg={7}
                  md={7}
                  sm={7}
                  xs={7}
                  className=" f-14 "
                  style={{ position: "relative", top: "-40px" }}
                >
                  <div>
                    <FormGroup>
                      <FormControl
                        type="text"
                        placeholder="supplier Name"
                        onChange={(e) => handleChange(e)}
                        className=" f-14 w-100 h-10 br_b-2  pt-3 ps-3 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        name="suppliername"
                      ></FormControl>
                      {error && !suppliername && (
                        <p
                          className="error f-16 text-capitalize"
                          style={{ color: "red" }}
                        >
                          {error}
                        </p>
                      )}
                    </FormGroup>
                  </div>
                  <div className=" f-14 d-flex flex-row" style={{ flex: "1" }}>
                    <FormGroup
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        justifyContents: "center",
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
                        className=" f-14  br_b-2 rounded-0 mt-2 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        placeholder="Address"
                        name="supllieraddress"
                        onChange={(e) => handleChange(e)}
                      ></Form.Control>
                      <FormGroup className=" f-14 d-flex justify-space-between ">
                        <Form.Control
                          className=" f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="City"
                          name="city"
                          onChange={(e) => handleChange(e)}
                        ></Form.Control>
                        <Form.Control
                          className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="Emirates"
                          onChange={(e) => handleChange(e)}
                          name="emirates"
                        ></Form.Control>
                      </FormGroup>
                      <FormGroup className=" f-14 d-flex justify-space-between ">
                        <Form.Control
                          className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="Country"
                          onChange={(e) => handleChange(e)}
                          name="country"
                        ></Form.Control>
                        <Form.Control
                          className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="Zip"
                          onChange={(e) => handleChange(e)}
                          name="zip"
                        ></Form.Control>
                      </FormGroup>
                    </FormGroup>
                  </div>
                  <FormGroup>
                    <FormLabel className=" txt-ht_blue w-100 mt-2 f-16">
                      Vat Treatment
                      <Form.Select
                        aria-label="Default select example"
                        type="text"
                        placeholder=""
                        className="f-14 w-100 h-10 br_b-2 pt-1 ps-3 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        defaultValue="Unregistered"
                        onChange={(item) => handleVatreatment(item)} // Include this line to handle the change
                        name="vattreatment"
                      >
                        <option value="true">Registered</option>
                        <option value="false">Unregistered</option>
                      </Form.Select>
                    </FormLabel>

                    <div
                      className={`mb-3 ${vatError ? "has-error" : ""}`}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        TRN NO
                        <FormControl
                          className={`f-14 br_b-2 rounded-0 inputfocus ${
                            vatError ? "has-error" : ""
                          }`}
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            setVatError(false);
                          }}
                          name="trnnumber"
                        ></FormControl>
                      </FormLabel>
                      <div>
                        {" "}
                        {vatError && (
                          <span style={{ color: "red" }}>Required</span>
                        )}
                      </div>
                    </div>
                  </FormGroup>

                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    Title
                    <FormControl
                      className="f-14   br_b-2 rounded-0 inputfocus"
                      onChange={(e) => handleChange(e)}
                      name="title"
                      value={title}
                      style={{ border: "2px dotted #25316f", height: "2rem" }}
                    ></FormControl>
                  </FormLabel>
                </Col>

                {/* Second column for job details like that  */}
                <Col
                  xs={5}
                  sm={5}
                  md={5}
                  lg={5}
                  xxl={5}
                  className=" f-14 "
                  style={{ position: "relative", top: "-25px" }}
                >
                  <FormGroup>
                    <FormLabel className=" b txt-ht_blue w-100 f-14">
                      Job Position
                      <FormControl
                        className="f-14   br_b-2 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f", height: "2rem" }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        name="jobposition"
                      ></FormControl>
                    </FormLabel>
                    <FormLabel className=" b txt-ht_blue w-100 f-14">
                      Phone
                      <FormControl
                        className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f", height: "2rem" }}
                        name="phone"
                        onChange={(e) => handleChange(e)}
                      ></FormControl>
                    </FormLabel>

                    <div
                      className={`mb-3 ${mobileError ? "has-error" : ""}}
                      style={{ display: "flex", alignItems: "center" }`}
                    >
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Mobile
                        <div  className="mb-3">
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={mobile}
                            onChange={(value) => {
                              setMobile(value);
                              setMobileError(false);
                            }}
                            className={`inputfocus f-14 br_b-2 rounded-0 ${
                              mobileError ? "has-error" : ""
                            }`}
                            style={{
                              border: "none",
                              backgroundColor: "white",
                              border: "2px dotted #25316f",
                              height: "2rem",
                            }}
                            name="mobile"
                            limitMaxLength
                          />
                        </div>
                      </FormLabel>
                      {mobileError && (
                        <span style={{ color: "red" }}>Required</span>
                      )}
                    </div>

           

                    <FormLabel className=" b txt-ht_blue w-100 f-14">
                      Email
                      <FormControl
                        className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f", height: "2rem" }}
                        name="email"
                        onChange={(e) => handleChange(e)}
                      ></FormControl>
                    </FormLabel>
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                    <FormLabel className=" b txt-ht_blue w-100 f-14">
                      Website
                      <FormControl
                        className="f-14   br_b-2 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f", height: "2rem" }}
                        onChange={(e) => handleChange(e)}
                        name="website"
                      ></FormControl>
                    </FormLabel>
                  </FormGroup>
                </Col>
              </Row>
            </Col>

            <Col className="mt-2" style={{ paddingLeft: 50, paddingRight: 50 }}>
              <FormGroup>
                <FormLabel>
                  <h4>Log Notes</h4>
                </FormLabel>
                <Form.Control
                  className="inputfocus"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
                <Button
                  className=" f-14 bg-blue b-none f-14 text-uppercase rounded-1"
                  style={{
                    height: "30px",
                    width: "max-content",
                    backgroundColor: "#25316f",
                    marginTop: 25,
                  }}
                  type="button"
                >
                  Save
                </Button>
              </FormGroup>
            </Col>

            {/*bamk modal for the bank details */}

            {/* {bankdetails && <Bankform banktoggle={bankmodal} />} */}
          </Row>
        </Container>
      </div>
    </>
  );
}
const mapsToProps = (state) => {
  return {
    master: state.masterData,
    loggedInUser: state.users,
  };
};

export default connect(mapsToProps)(VendorForm);
