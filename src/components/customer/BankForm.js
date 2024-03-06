import React, { useState } from "react";
import {
  Button,
  FormGroup,
  Modal,
  Row,
  Col,
  FormLabel,
  FormControl,
} from "react-bootstrap";

function Bankform({ banktoggle, formData, handleChange }) {
  

  const [formdata,setFormData] = useState(false)
  const handleClose = () => {
    banktoggle();
    formdata({
      bankName: "",
      accountNumber: "",
      iban: "",
      branch: "",
    });
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={handleClose}
        style={{
          width: "100%",
          placeItems: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Bank Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Row className="">
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup className=" m-2 d-flex flex-row">
                <FormLabel className="f-14">
                  Bank Name
                  <FormControl
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="f-14 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 ">
                  {" "}
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
            </Col>
            <Col>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 ">
                  {" "}
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
                <FormLabel className="f-14 ">
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Bankform;
