import React from "react";
import { Form, Col, Row } from "react-bootstrap";

function Vendorform() {
  return (
    <div>
      <button type="button">Save</button>
      <Form.Group>
        <Form.Label>Company Name:</Form.Label>
        <Form.Control
          placeholder="company"
          className="w-20"
          style={{
            borderBottom: "1px solid",
            borderRadius: "0px",
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Row>
          <Col lg={1}>
            <Form.Label>Address:</Form.Label>
          </Col>
          <Col lg={10}>
            <Form.Control
              className="w-20 rounded-0 b-none"
              style={{
                borderBottom: "1px solid",
              }}
            ></Form.Control>
            <Row>
              <Col lg={3}>
                <Form.Control
                  className="w-20 rounded-0"
                  style={{
                    borderBottom: "1px solid",
                  }}
                ></Form.Control>
              </Col>
              <Col lg={6}>
                <Form.Control
                  className="w-20 rounded-0"
                  style={{
                    borderBottom: "1px solid",
                  }}
                ></Form.Control>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
}

export default Vendorform;
