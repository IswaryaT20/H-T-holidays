import React, { useState } from "react";
import {
  Button,
  FormGroup,
  Modal,
  Row,
  Col,
  FormCheck,
  FormControl,
  Input,
  FormLabel,
} from "react-bootstrap";

function VendorBankForm({ banktoggle }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    banktoggle();
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        style={{
          width: "100%",
          placeItems: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bank Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Row className="">
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup className=" m-2 d-flex flex-row">
                <FormLabel className="f-14 w-100">
                  Bank Name
                  <FormControl
                    Label="Account No"
                    className="f-14 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    placeholder="Enter Bank Name"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2 ">
                <FormLabel className="f-14 w-100">
                  {" "}
                  Account Number
                  <FormControl
                    className="f-14 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    placeholder="Enter account number"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100">
                  {" "}
                  IBAN No
                  <FormControl
                    className="f-14 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    placeholder="Enter IBAN Number"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100">
                  Branch
                  <FormControl
                    className="f-14 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    placeholder="Enter Branch Code"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
          className=" f-14 bg-blue b-none f-14 mt-1 text-uppercase rounded-1" style={{
                  height: "28px",
                  width: "13%",
                  color:'white',
                  backgroundColor: "#25316f",
                }}>
            Save
          </Button>
          <Button variant="secondary" 
          className="f-14 bg-blue b-none f-14 mt-1 text-uppercase rounded-1"
          style={{
            height: "28px",
            width: "13%",
            color:'white',
            backgroundColor: "",
          }} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VendorBankForm;
