import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
import AddressForm from "./Addressform";
import Bankform from "./BankForm";
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




function CustomerForm(props) {
  const [selectedImage, setSelectedImage] = useState(profile);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);
  const [address, setaddress] = useState(false);
  const [bankdetails, setbankdetails] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [vatError, setVatError] = useState(false);
  const [name, setName] = useState("");
  const [jobposition, setJobposition] = useState("");
  const [trnnum, setTrnnum] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState();
  const [customeraddress, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [emirates, setEmirates] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [title, setTitle] = useState("");
  const [vattreatment, setVattreatment] = useState("false");
  const [customerType, setCustomerType] = useState(); // individual
  const dispatch = useDispatch();
  const avatars = [
    { id: "1", name: "avatar1", src: avtar1 },
    { id: "2", name: "avatar2", src: avtar2 },
    { id: "3", name: "avatar3", src: avtar3 },
    { id: "4", name: "avatar4", src: avtar4 },
    { id: "5", name: "avatar5", src: avtar5 },
    { id: "6", name: "avatar6", src: profile },
  ];

  const [businessType, setBusinessType] = useState([]);
  console.log("props message:", props);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    iban: "",
    branch: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });


    if (e.target.name === "customername") setName(e.target.value);
    if (e.target.name === "jobposition") setJobposition(e.target.value);
    if (e.target.name === "trnnumber") setTrnnum(e.target.value);
    if (e.target.name === "phone") setPhone(e.target.value);
    if (e.target.name === "mobile") {
      setMobile(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
      setEmailError(
        isEmailValid(e.target.value) ? "" : "Invalid email format."
      );
    }
    if (e.target.name === "website") setWebsite(e.target.value);
    if (e.target.name === "customeraddress") setAddress(e.target.value);
    if (e.target.name === "city") setCity(e.target.value);
    if (e.target.name === "emirates") setEmirates(e.target.value);
    if (e.target.name === "country") setCountry(e.target.value);
    if (e.target.name === "zip") setZip(e.target.value);
    if (e.target.name === "title") setTitle(e.target.value);
  };
  const selectBusinessType = (businessType) => {
    console.log(businessType);
    setCustomerType(businessType.id);
  };
  const onSelectCategory = (item) => {
    console.log(item.target.value);
    setCategory(item.target.value);
  };
  const handleVatreatment = (item) => {
    console.log(item.target.value);
    setVattreatment(item.target.value);
  };
  const handlesubmit = () => {
    if (customerType === 1 && !name.trim()) {
      setNameError(true);
      return;
    }
    if (!mobile.trim() || mobileError) {
      setMobileError(true);
      return;
    }
    if (!category || (typeof category === "string" && !category.trim())) {
      setCategoryError(true);
      return;
    }
    if (
      vattreatment === "true" &&
      (!trnnum || (typeof trnnum === "string" && !trnnum.trim()))
    ) {
      setVatError(true);
      return;
    }
    const requestData = {
      name: name,
      jobPosition: jobposition,
      trnNo: trnnum,
      phone: phone,
      mobile: mobile,
      email: email,
      website: website,
      isRegistered: vattreatment,
      category: category,
      title: title,
      country: country,
      emirates: emirates,
      zip: zip,
      createdBy: props.loggedInUser.loginId,
      customerCategoryId: category,
      businessTypeId: customerType,
      addresses: [
        {
          addressLine1: customeraddress,
          addressLine2: city,
          city: city,
          zipcode: zip,
          country: 1,
          state: city,
          addressTypeId: 1,
        },
      ],
      bankAccounts:[
        {
          bankName:1245,
          accountNumber:67890,
          branchName:"union Bank of India",
          accountHolderName:"Sudhar",
          country:1,
          code:country,
        }
      ]
    };

    dispatch({ type: CREATE_CUSTOMER_API_CALL, payload: requestData });
    console.log("data", props.customers);
  };

  const openAvatars = () => {
    setIsAvatarsOpen(!isAvatarsOpen);
  };

  const captureImage = (e) => {
    const selectedImageSrc = e.target.src;
    setSelectedImage(selectedImageSrc);
    setIsAvatarsOpen(false);
  };

  const addressmodal = () => {
    setaddress(!address);
  };
  const bankmodal = () => {
    setbankdetails(!bankdetails);
  };

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
    console.log(props.message);
  }, []);

  useEffect(() => {
    if (props.master.businessTypes.length > 0) {
      setCustomerType(props.master.businessTypes[0].id);
      setBusinessType(
        props.master.businessTypes.filter((item) => {
          return item.id === 1 || item.id === 2;
        })
      );
    }
  }, [props.master.businessTypes]);
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
                onClick={addressmodal}
                id="address"
              >
                Contact & Address
              </Button>
              <Button
                className="m-1 bg-blue f-12 rounded-1 b-none"
                style={{ backgroundColor: "#25316f", width: "max-content" }}
                onClick={bankmodal}
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
                >
                  <div key={`inline-radio`} className="mb-1 mt-2">
                    {businessType.map((item) => {
                      return (
                        <Form.Check
                          inline
                          label={item.value}
                          name="customerType"
                          type="radio"
                          checked={item.id == customerType}
                          value={item.value}
                          onChange={(e) => selectBusinessType(item)}
                          id={item.id}
                        />
                      );
                    })}
                  </div>
                </Col>
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
                      onClick={openAvatars}
                    />
                    <Modal show={isAvatarsOpen} onHide={openAvatars}>
                      <Modal.Body>Kindly choose the profile picture</Modal.Body>

                      {isAvatarsOpen && (
                        <div className=" h-20 p-2">
                          <div className="d-flex w-100 flex-wrap position-relative border">
                            {avatars.map((item) => (
                              <img
                                className="ms-2 p-2 cursor-pointer  rounded-full border p-1"
                                style={{ zIndex: "99", width: "30%" }}
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
                  <div key={`inline-radio`} className="mb-3">
                    <div
                      className={`mb-3 ${nameError ? "has-error" : ""}`}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {customerType === 1 && (
                        <FormGroup>
                          <FormControl
                            type="text"
                            placeholder="Customer Name"
                            className={`f-14 w-100 h-10 br_b-2 pt-3 ps-3 mb-2 rounded-0 inputfocus ${
                              nameError ? "has-error" : ""
                            }`}
                            checked={customerType === "individual"}
                            onChange={(e) => {
                              handleChange(e);
                              setNameError(false);
                            }}
                            style={{ border: "2px dotted #25316f" }}
                            id={`inline-radio-1`}
                            name="customername"
                            required
                          ></FormControl>
                          {nameError && (
                            <span style={{ color: "red" }}>
                              Customer Name is Required
                            </span>
                          )}
                        </FormGroup>
                      )}
                    </div>

                    <FormGroup>
                      <FormControl
                        type="text"
                        placeholder="Company Name"
                        checked={customerType === "company"}
                        onChange={(e) => handleChange(e)}
                        className=" f-14 w-100 h-10 br_b-2  pt-3 ps-3 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        id={`inline-radio-1`}
                        name="companyname"
                      ></FormControl>
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
                        name="customeraddress"
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
                  <div
                    className={`mb-3 ${categoryError ? "has-error" : ""}`}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FormLabel className=" txt-ht_blue  w-100 mt-2 f-16">
                      Customer Category
                      <Form.Select
                        aria-label="Default select example"
                        type="text"
                        placeholder="Customer Name"
                        className={`f-14 w-100 h-10 br_b-2 pt-1 ps-3  rounded-0 inputfocus ${
                          categoryError ? "has-error" : ""
                        }`}
                        style={{ border: "2px dotted #25316f" }}
                        onChange={(e) => {
                          onSelectCategory(e);
                          setCategoryError(false);
                        }}
                        value={category}
                        name="category"
                      >
                        <option>Select the Category</option>
                        {props.master.customerCategories.map((categoryitem) => (
                          <option
                            key={categoryitem.id}
                            id={categoryitem.id}
                            value={categoryitem.id}
                          >
                            {categoryitem.value}
                          </option>
                        ))}
                      </Form.Select>
                    </FormLabel>
                    {categoryError && (
                      <span style={{ color: "red" }}>Category is Required</span>
                    )}
                  </div>

                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    Title
                    <FormControl
                      className="f-14   br_b-2 rounded-0 inputfocus"
                      onChange={(e) => handleChange(e)}
                      name="title"
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
                        type="number"
                        className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                        style={{ border: "2px dotted #25316f", height: "2rem" }}
                        name="phone"
                        onChange={(e) => handleChange(e)}
                      ></FormControl>
                    </FormLabel>
                    <div
                      className={`mb-3 ${mobileError ? "has-error" : ""}`}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Mobile
                        <div key={`inline-radio`} className="mb-3">
                          <FormControl
                            placeholder="Enter phone number"
                            value={mobile}
                            onChange={(value) => {
                              setMobile(value.target.value);
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
                        type="email"
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
                        value={vattreatment}
                        onChange={(e) => handleVatreatment(e)} // Include this line to handle the change
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
              </FormGroup>
            </Col>

            {/*addreess modal for the extra address */}
            {address && (
              <AddressForm
                className="inputfocus"
                addresstoggle={addressmodal}
              />
            )}
               {bankdetails && <Bankform  banktoggle={bankmodal}
          formData={formData} 
          handleChange={handleChange}  />}
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
export default connect(mapsToProps)(CustomerForm);
