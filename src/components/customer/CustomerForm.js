import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { IoSearch,IoDocumentText,IoPersonOutline  } from "react-icons/io5";

function CustomerForm() {
  return (
    <>
      <Container fluid className="">
        <Row className="border ms-1 me-1 ">
          <Col className=" border d-flex  justify-between m-2 p-2">
            <Button
              type="submit"
              className="bg-blue b-none f-14 p-1 text-uppercase rounded-1"
              style={{
                height: "33px",
                width: "20%",
                backgroundColor: "#25316f",
              }}
            >
              Save
            </Button>
            <Button
              className="bg-gray p-1 text-black rounded-1 b-none ms-2"
              variant="light"
              type="submit"
              style={{ height: "33px", width: "max-content", fontWeight: "bolder" }}
            >
              Invoice
            </Button>
          </Col>
          <Col className=" border d-flex  justify-between m-2 p-2 ">
            <Button
              className="m-1 bg-blue f-14 rounded-1 b-none"
              style={{ backgroundColor: "#25316f", width: "max-content" }}
            >
              Send Message
            </Button>
            <Button
              className="m-1 bg-blue f-14 rounded-1 b-none"
              style={{ backgroundColor: "#25316f", width: "max-content" }}
            >
              Log Notes
            </Button>
            <Button
              className="m-1 bg-blue f-14 rounded-1 b-none"
              style={{ backgroundColor: "#25316f", width: "max-content" }}
            >
              Activities
            </Button>
          </Col>
          <Col className=" border d-flex  justify-between justify-content-end me-3 m-2 p-2 ">
            <span className="f-20 ms-3"><IoSearch /></span>
            <span className="f-20 ms-3"><IoDocumentText/></span>
            <span className="f-20 ms-3"><IoPersonOutline /></span>
          </Col>
        </Row>
        <div>hiiii</div>
      </Container>
    </>
  );
}

export default CustomerForm;
