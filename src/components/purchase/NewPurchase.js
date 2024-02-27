import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


const NewPurchase = () => {

  return (
    <>
      <Container fluid>
        <Row className="position-relative mt-2 d-flex align-items-center  ">
          <Col  sm={3} md={7} lg={9} xxl={9} className="text-center">
          <h4
          className="d-flex justify-content-center fs-5 fw-bolder"
          style={{ color: "#25316f",placeItems:"center" }}
        >
          Purchase
        </h4>
          </Col>
      
          <Col sm={2} md={5} lg={3} xxl={3} className="d-flex justify-content-end">
            <div>
              <Button className="b-none" style={{
                height: "max-content",
                width: "max-content",
                backgroundColor: "#25316f",
              }} >Close</Button>
              <Button  style={{
                height: "max-content",
                width: "max-content",
                backgroundColor: "#25316f",
              }} className="ms-3 b-none">Save</Button>
            </div>
          </Col>
        </Row>

       

        <>
          <Row className="ms-2 mt-2 ">
            <Col sm={3} md={4} lg={4} xxl={4} className="">
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "8px",
                  width: '300px',
                  height:"auto",
                  borderRadius: 5,
                }}
              >
                <p>
                  <strong className="f--12">Bill To:</strong> <br />
                  <strong className="f-14">H&T HOLIDAYS</strong> <br />
                  <small className="f-12">Tours & Travels</small> <br />
                  <small className="f-12">
                    Building No.10 AlNahyan Camp
                  </small>
                  <br />
                  <small className="f-12">
                    Near Executive Suites, Abu Dhabi
                  </small>
                  <br />
                  <small className="f-12">
                    +971 502226710, +971 542796562
                  </small>
                  <br />
                  <small className="f-12">+971 25634643</small>
                  <br />
                  <small className="f-12">
                    Email : H&Tholidays@gmail.com
                  </small>
                  <br />
                  <small className="f-12">
                    Website :{" "}
                    <a target="blank"
                      href="http://www.handtholidays.ae/"
                      style={{ textDecoration: "none", color: "#25316f" }}
                    >
                      www.htholidays.ae
                    </a>
                  </small>
                </p>
              </div>
            </Col>
            <Col xxl={4} lg={4} md={5} sm={3} className="d-flex justify-content-center">
           
                    <Form.Group className="w-50">
                        <Form.Control className="text-center w-max" type="search" placeholder="+ Add Client" style={{backgroundColor:"#dedef8"}} />
                    </Form.Group>
               
            </Col>
            <Col lg={4} xxl={3} md={3} sm={2} className="text-end pe-2">
                <p>
                    <strong className="f-14 me-4">Purchase Number: <span className="f-12">INV/2024/000001</span></strong> <br/>
                    <small className="me-4">Balance: ₹ 0.00 </small>
                </p>
            </Col>
          </Row>
        </>
      </Container>
     
    </>
  );
};

export default NewPurchase;