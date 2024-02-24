import React from "react";
import {
  Col,
  Row,
  Button,
  Container,
  FormCheck,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import { IoSearch, IoDocumentText, IoPersonOutline } from "react-icons/io5";

function CustomerForm() {
  return (
    <>
      <Container fluid className=" f-14 ">
        <Row className=" f-14 border ms-1 me-1 ">
          <Col className=" f-14 d-flexjustify-between m-2 p-2">
            <Button
              type="submit"
              className=" f-14 bg-blue b-none f-14 p-1 text-uppercase rounded-1"
              style={{
                height: "33px",
                width: "12%",
                backgroundColor: "#25316f",
              }}
            >
              Save
            </Button>
            <Button
              className=" f-14 bg-gray p-1 text-black rounded-1 b-none ms-2"
              variant="light"
              type="submit"
              style={{
                PaddingLeft: "5px",
                height: "33px",
                width: "max-content",
                fontWeight: "bolder",
              }}
            >
              Invoice
            </Button>
          </Col>
          <Col className="d-flex  m-2 p-2 justify-between justify-content-end me-3 m-2 p-2">
            <Button
              className="m-1 bg-blue f-12 rounded-1 b-none"
              style={{ backgroundColor: "#25316f", width: "max-content" }}
            >
              Contact & Address
            </Button>
            <Button
              className="m-1 bg-blue f-12 rounded-1 b-none"
              style={{ backgroundColor: "#25316f", width: "max-content" }}
            >
              Accounting
            </Button>
            <Button
              className="m-1 bg-blue f-12 rounded-1 b-none"
              style={{ backgroundColor: "#25316f", width: "max-content" }}
            >
             Log Notes
            </Button>
            
          </Col>
        </Row>

        <Row
          xs={12}
          sm={12}
          lg={12}
          md={12}
          xxl={12}
          className=" f-14 border ms-3 w-70 m-1 p-2"
          style={{ flex: 1 }}
        >
          <Row style={{ flex: 1 }}>
            <Col
              xs={10}
              sm={10}
              lg={12}
              md={10}
              xxl={12}
              className=" f-14 d-flex"
            >
              <Form.Check
                type="checkbox"
                className=" f-16 d-flex"
                name=""
                id=""
              >
                <Form.Check.Input />
                <Form.Check className="f-16 ms-2">Individual </Form.Check>
              </Form.Check>
              <Form.Check
                type="checkbox"
                className="f-16 d-flex ms-3"
                name=""
                id=""
              >
                <Form.Check.Input />
                <Form.Check className=" f-16 ms-2">Company</Form.Check>
              </Form.Check>
            </Col>
            <Col xs={3} sm={3} md={2} lg={2} xxl={2}>
              <Form.Group>
                <div className="">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className=" f-14 img-thumbnail rounded"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Form.Label>Profile Picture</Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-around" }}>
            {/* First column for personal details like that */}
            <Col xxl={7} lg={7} md={5} sm={6} xs={8} className=" f-14 pt-1">
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Customer Name"
                  className=" f-14 w-100 h-10 br_b-2 pt-3 ps-3 mb-2 rounded-0"
                  style={{ border: "2px dotted #25316f" }}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Company Name"
                  className=" f-14 w-100 h-10 br_b-2  pt-3 ps-3 rounded-0"
                  style={{ border: "2px dotted #25316f" }}
                ></FormControl>
              </FormGroup>
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
                    style={{ flex: 2, fontWeight: "bolder", color: "#25316f" }}
                  >
                    Address
                  </FormLabel>
                </FormGroup>
                <FormGroup
                  style={{ display: "flex", flex: 3, flexDirection: "column" }}
                >
                  <Form.Control
                    className=" f-14  br_b-2 rounded-0 mt-2"
                    style={{ border: "2px dotted #25316f" }}
                    placeholder="Address"
                  ></Form.Control>
                  <FormGroup className=" f-14 d-flex justify-space-between ">
                    <Form.Control
                      className=" f-14  br_b-2 rounded-0 mt-2 me-2"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="City"
                    ></Form.Control>
                    <Form.Control
                      className=" f-14  br_b-2 rounded-0 mt-2 ms-2"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="Emirates"
                    ></Form.Control>
                  </FormGroup>
                  <FormGroup className=" f-14 d-flex justify-space-between ">
                    <Form.Control
                      className=" f-14  br_b-2 rounded-0 mt-2 me-2"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="Country"
                    ></Form.Control>
                    <Form.Control
                      className=" f-14  br_b-2 rounded-0 mt-2 ms-2"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="Zip"
                    ></Form.Control>
                  </FormGroup>
                </FormGroup>
              </div>
              <FormGroup>
                <FormLabel className=" txt-ht_blue  w-100 mt-1 f-16">
                  Vat Treatment
                  <Form.Select
                    aria-label="Default select example"
                    type="text"
                    placeholder="Customer Name"
                    className=" f-14 w-100 h-10 br_b-2 pt-1 ps-3  rounded-0"
                    style={{ border: "2px dotted #25316f" }}
                    defaultValue="Unregistered"
                  >
                    <option value="Registered">Registered</option>
                    <option value="Unregistered">Unregistered</option>
                  </Form.Select>
                </FormLabel>
                <FormLabel className=" txt-ht_blue w-100 f-16 ">
                  PAN
                  <FormControl
                    className="f-14 br_b-2 rounded-0"
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  TRN NO
                  <FormControl
                    className="f-14 br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
              </FormGroup>
            </Col>

            {/* Second column for job details like that <Col xxl={7} lg={7} md={5} sm={6} xs={8} className=" f-14 pt-1"> */}
            <Col xs={3} sm={3} md={4} lg={4} xxl={4} className=" f-14 mt-2 ">
              <FormGroup>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  Job Position
                  <FormControl
                    className="f-14   br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  Phone
                  <FormControl
                    className="f-14   br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  Mobile
                  <FormControl
                    className="f-14   br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  Email
                  <FormControl
                    className="f-14   br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  Website
                  <FormControl
                    className="f-14   br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  Title
                  <FormControl
                    className="f-14   br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
                <FormLabel className=" b txt-ht_blue w-100 f-14">
                  Tags
                  <FormControl
                    className="f-14   br_b-2 rounded-0 "
                    style={{ border: "2px dotted #25316f", height: "2rem" }}
                  ></FormControl>
                </FormLabel>
              </FormGroup>
            </Col>
            {/* profile side */}
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default CustomerForm;
