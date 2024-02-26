import React, { useState } from "react";

import {
  Col,
  Row,
  Button,
  Container,
  Modal,
  FloatingLabel,
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
import AddressForm from "./VendorAddressform";
import Bankform from "./VendorBankForm";

function VendorForm() {
  const [selectedImage, setSelectedImage] = useState(profile);
  const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);
  const [address, setaddress] = useState(false);
  const [bankdetails, setbankdetails] = useState(false);

  const [VendorType, setVendorType] = useState("individual"); // individual
  const handleVendorTypeChange = (event) => {
    setVendorType(event.target.value);
  };

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

  const addressmodal = () => {
    setaddress(!address);
  };
  const bankmodal = () => {
    setbankdetails(!bankdetails);
  };

  return (
    <>
      <Container fluid className=" f-14 ">
        <Row className=" f-14 border border-2 ms-1 me-1 ">
          <Col className=" f-14 d-flex justify-content-start  ">
            <Button
              type="submit"
              className=" f-14 bg-blue b-none f-14 mt-1 text-uppercase rounded-1"
              style={{
                height: "28px",
                width: "13%",
                backgroundColor: "#25316f",
              }}
            >
              Save
            </Button>
            <Button
              className=" f-14 bg-gray m-1 text-black rounded-1 b-none mt-1 ms-2"
              variant="light"
              type="submit"
              style={{
                PaddingLeft: "5px",
                height: "30px",
                width: "max-content",
                fontWeight: "bolder",
              }}
            >
              Invoice
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
          <Col xs={9} md={9} lg={9} xxl={9} className="border border-2  shadow">
            <Row style={{ flex: 1 }} className=" ms-0 ">
              <Col
                xs={10}
                sm={10}
                lg={10}
                md={10}
                xxl={10}
                className=" f-14 d-flex ps-2 pe-2"
              >
                <div key={`inline-radio`} className="mb-1 mt-2">
                  <Form.Check
                    inline
                    label="Individual"
                    name="VendorType"
                    type="radio"
                    value="individual"
                    checked={VendorType === "individual"}
                    onChange={handleVendorTypeChange}
                    id={`inline-radio-1`}
                  />
                  <Form.Check
                    inline
                    label="Company"
                    name="VendorType"
                    type="radio"
                    value="company"
                    checked={VendorType === "company"}
                    onChange={handleVendorTypeChange}
                    id={`inline-radio-2`}
                  />
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

                  {isAvatarsOpen && (
                    <div className="avatargroup">
                      <div
                        className="d-flex flex-wrap position-relative"
                        style={{
                          width: "fit-content",
                          overflowY: "scroll",
                          WebkitScrollSnapType: "inline",
                        }}
                      >
                        {avatars.map((item) => (
                          <img
                            className="ms-2 p-2 cursor-pointer  rounded-full border p-1"
                            style={{ zIndex: "99", width: "42%" }}
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
                  <Form.Label className="">Profile Picture</Form.Label>
                </Form.Group>
              </Col>
            </Row>

            {/* First column for personal details like that */}
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
                  {VendorType === "individual" && (
                    <FormGroup>
                      <FormControl
                        type="text"
                        placeholder="Vendor Name"
                        className=" f-14 w-100 h-10 br_b-2 pt-3 ps-3 mb-2 rounded-0 inputfocus"
                        checked={VendorType === "individual"}
                        onChange={handleVendorTypeChange}
                        style={{ border: "2px dotted #25316f" }}
                        id={`inline-radio-1`}
                      ></FormControl>
                    </FormGroup>
                  )}
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Company Name"
                      checked={VendorType === "company"}
                      onChange={handleVendorTypeChange}
                      className=" f-14 w-100 h-10 br_b-2  pt-3 ps-3 rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f" }}
                      id={`inline-radio-1`}
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
                    ></Form.Control>
                    <FormGroup className=" f-14 d-flex justify-space-between ">
                      <Form.Control
                        className=" f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        placeholder="City"
                      ></Form.Control>
                      <Form.Control
                        className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        placeholder="Emirates"
                      ></Form.Control>
                    </FormGroup>
                    <FormGroup className=" f-14 d-flex justify-space-between ">
                      <Form.Control
                        className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        placeholder="Country"
                      ></Form.Control>
                      <Form.Control
                        className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        placeholder="Zip"
                      ></Form.Control>
                    </FormGroup>
                  </FormGroup>
                </div>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  INPUT 1
                  <FormControl
                    className="f-14 br_b-2 rounded-0 inputfocus"
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                INPUT 2
                  <FormControl
                    className="f-14 br_b-2 rounded-0 inputfocus"
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                INPUT 3
                  <FormControl
                    className="f-14 br_b-2 rounded-0 inputfocus"
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                INPUT 4
                  <FormControl
                    className="f-14 br_b-2 rounded-0 inputfocus"
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                INPUT 5
                  <FormControl
                    className="f-14 br_b-2 rounded-0 inputfocus"
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
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    Phone
                    <FormControl
                      className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f", height: "2rem" }}
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    Mobile
                    <FormControl
                      className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f", height: "2rem" }}
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    Email
                    <FormControl
                      className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f", height: "2rem" }}
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    Website
                    <FormControl
                      className="f-14   br_b-2 rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f", height: "2rem" }}
                    ></FormControl>
                  </FormLabel>
                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    Title
                    <FormControl
                      className="f-14   br_b-2 rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f", height: "2rem" }}
                    ></FormControl>
                  </FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel className=" txt-ht_blue  w-100 mt-2 f-16">
                    Vat Treatment
                    <Form.Select
                      aria-label="Default select example"
                      type="text"
                      placeholder="Vendor Name"
                      className=" f-14 w-100 h-10 br_b-2 pt-1 ps-3  rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f" }}
                      defaultValue="Unregistered"
                    >
                      <option value="Registered">Registered</option>
                      <option value="Unregistered">Unregistered</option>
                    </Form.Select>
                  </FormLabel>

                  <FormLabel className=" b txt-ht_blue w-100 f-14">
                    TRN NO
                    <FormControl
                      className="f-14 br_b-2 rounded-0 inputfocus"
                      style={{ border: "2px dotted #25316f", height: "2rem" }}
                    ></FormControl>
                  </FormLabel>
                </FormGroup>
              </Col>
            </Row>
          </Col>

          <Col className="mt-2">
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
                className=" f-14 bg-blue b-none f-14 mt-1 text-uppercase rounded-1"
                style={{
                  height: "30px",
                  width: "max-content",
                  backgroundColor: "#25316f",
                }}
                type="button"
              >
                Save
              </Button>
            </FormGroup>
          </Col>

          {/*addreess modal for the extra address */}
          {address && (
            <AddressForm className="inputfocus" addresstoggle={addressmodal} />
          )}
          {bankdetails && <Bankform banktoggle={bankmodal} />}
        </Row>
      </Container>
    </>
  );
}

export default VendorForm;