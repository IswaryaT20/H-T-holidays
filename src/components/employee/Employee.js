import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Table,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import "./Employee.css";

const Employee = () => {
  //useStates
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empID, setEmpID] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");

  const tableHeader = [
    "Name",
    "Employee ID",
    "DOB",
    "Job Position",
    "Mobile",
    "Country",
    "City",
  ];

  //Handlers
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = () => {
    const nameError = "Employee Name is Required";
    const empIDError = "Employee ID is Required";
    const mobileError = "10 Digit Mobile Number is required";
    setError("");

    if (empName.length === 0) {
      setError(nameError);
      return;
    }
    if (empID.length === 0) {
      setError(empIDError);
      return;
    }
    if (mobileNo.length !== 10 || isNaN(mobileNo)) {
      setError(mobileError);
      return;
    }
    console.log("empName:", empName);
    console.log("empID:", empID);
    console.log("mobileNo:", mobileNo);

    setShowModal(false);
  };

  return (
    <>
      <Container fluid className="mt-1">
        <Row className="w-100 mt-2 p-2">
          <Col
            className="col-2 fw-bolder"
            style={{ color: "#1d1d5e", fontSize: 16 }}
          >
            Employee Details
          </Col>
          <Col className="col-4">
            <InputGroup style={{ width: 300 }}>
              <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <FormControl
                placeholder="Search Employee..."
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "#80808036",
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "white",
                }}
              />
            </InputGroup>
          </Col>
          <Col className="col-5 d-flex justify-content-end">
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                dateFormat={"dd/MM/yyyy"}
                selectsRange
                placeholderText="Select Date Range"
                className="form-control rounded ms-2 inputfocus"
              />
            </div>
            <div className="ms-2">
              <FaCloudDownloadAlt
                className=" fs-2 ms-3"
                style={{ color: "#1d1d5e", cursor: "pointer" }}
              />
              <FaEye
                className="cursor fs-4 ms-3"
                style={{ color: "#1d1d5e", cursor: "pointer" }}
              />
            </div>
          </Col>
        </Row>

        <div className="mt-2">
          <Button
            style={{
              backgroundColor: "#1d1d5e",
              color: "white",
              textAlign: "center",
              width: 75,
              borderColor: "#1d1d5e",
            }}
            onClick={handleShowModal}
          >
            New +
          </Button>
        </div>

        <div className="table-container mt-3">
          <Table striped hover>
            <thead>
              <tr>
                {tableHeader.map((header, index) => (
                  <th
                    key={index}
                    style={{
                      backgroundColor: "#1d1d5e",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </div>
      </Container>
      {/*  -----------------------------Modal Window--------------------------- */}
      <>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          dialogClassName="custom-modal"
        >
          <ModalHeader>
            <ModalTitle style={{ color: "#1d1d5e" }}>Add Employee</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row className="d-flex align-items-center">
                <Col className="col-6 fs-6 fw-bolder text-start">
                  Employee Name : <span style={{ color: "red" }}>*</span>
                </Col>
                <Col className="col-6 text-end">
                  <FormControl
                    className="inputfocus"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                  />
                  {error && !empName ? (
                    <p style={{ color: "red", fontSize: 14 }}>
                      Employee Name is Required
                    </p>
                  ) : null}
                </Col>
              </Row>
              <Row className="mt-3 d-flex align-items-center">
                <Col className="col-6 fs-6 fw-bolder text-start">
                  Employee ID : <span style={{ color: "red" }}>*</span>
                </Col>
                <Col className="col-6 text-end">
                  <FormControl
                    className="inputfocus "
                    value={empID}
                    onChange={(e) => setEmpID(e.target.value)}
                  />
                  {error && !empID ? (
                    <p style={{ color: "red", fontSize: 14 }}>
                      Employee ID is Required
                    </p>
                  ) : null}
                </Col>
              </Row>
              <Row className="mt-3 d-flex align-items-center">
                <Col className="col-6 fs-6 fw-bolder text-start">DOB : </Col>
                <Col className="col-6 text-end">
                  <FormControl className="inputfocus" type="date" />
                </Col>
              </Row>
              <Row className="mt-3 d-flex align-items-center">
                <Col className="col-6 fs-6 fw-bolder text-start">
                  Mobile : <span style={{ color: "red" }}>*</span>
                </Col>
                <Col className="col-6 text-end">
                  <FormControl
                    className="inputfocus"
                    type="number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                  {error && !mobileNo ? (
                    <p style={{ color: "red", fontSize: 14 }}>
                      Enter Valid Number
                    </p>
                  ) : null}
                </Col>
              </Row>
              <Row className="mt-3 d-flex align-items-center">
                <Col className="col-6 fs-6 fw-bolder text-start">
                  Country :{" "}
                </Col>
                <Col className="col-6 text-end">
                  <FormControl className="inputfocus" />
                </Col>
              </Row>
              <Row className="mt-3 d-flex align-items-center">
                <Col className="col-6 fs-6 fw-bolder text-start">City : </Col>
                <Col className="col-6 text-end">
                  <FormControl className="inputfocus" />
                </Col>
              </Row>
              <Row className="mt-3 d-flex align-items-center">
                <Col className="col-6 fs-6 fw-bolder text-start">
                  Location :{" "}
                </Col>
                <Col className="col-6 text-end inputfocus">
                  <FormControl className="inputfocus" />
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-start">
            <Button
              style={{ backgroundColor: "#1d1d5e", borderColor: "#1d1d5e" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              style={{
                backgroundColor: "white",
                borderColor: "#1d1d5e",
                color: "#1d1d5e",
                fontWeight: "500",
              }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    </>
  );
};

export default Employee;
