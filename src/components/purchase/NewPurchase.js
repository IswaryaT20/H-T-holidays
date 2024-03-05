import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewPurchase = () => {
  //use State
  const [invoiceDate, setInvoiceDate] = useState("");
  // const [addClient, setAddClient] = useState(false);

  //Handlers

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInvoiceDate(currentDate);
  }, []);

  return (
    <>
      <div style={{ paddingRight: 50, paddingLeft: 50 }}>
        <Container fluid className="mt-2">
          <Row>
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
            <Row className="w-100">
              <Col className="col-4">
                <Form.Group>
                  <Form.Control
                    className="inputfocus text-center rounded-0"
                    type="search"
                    placeholder="+ Add Supplier"
                    style={{ backgroundColor: "#dedef8", width: "250px" }}
                  />
                </Form.Group>
              </Col>

              <Col className="col-4  d-flex justify-content-center">
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    width: 300,
                    height: "auto",
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
                    <br />
                    <small style={{ fontSize: 12 }}>
                      +971 502226710, +971 542796562
                    </small>
                    <br />
                    <small style={{ fontSize: 12 }}>+971 25634643</small>
                    <br />
                    <small style={{ fontSize: 12 }}>
                      Email : H&Tholidays@gmail.com
                    </small>
                    <br />
                    <small style={{ fontSize: 12 }}>
                      Website :{" "}
                      <a
                        target="blank"
                        href="http://www.handtholidays.ae/"
                        style={{ textDecoration: "none", color: "#1d1d5e" }}
                      >
                        www.htholidays.ae
                      </a>
                    </small>
                  </p>
                </div>
              </Col>

              <Col className="col-4 d-flex justify-content-end">
                <p>
                  <strong>Balance: ₹ </strong>
                </p>
              </Col>
            </Row>
          </>

          <>
            <Row className="mt-2 mb-3">
              <Col className="col-8 d-flex justify-content-start">
                <Form.Group>
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Invoice Date
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Due Date
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                    type="date"
                  />
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    Net *
                  </Form.Label>
                  <Form.Select
                    className="inputfocus rounded-0"
                    style={{ width: 160, height: "30px", fontSize: 14 }}
                  >
                    <option></option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="ms-2">
                  <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                    REF Number
                  </Form.Label>
                  <Form.Control
                    className="inputfocus rounded-0"
                    style={{ height: "30px", fontSize: 14 }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        </Container>
      </div>
    </>
  );
};

export default NewPurchase;
