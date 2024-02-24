import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCloudArrowDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";

const Newproduct = () => {
  //use states
  const [showModal, setShowModal] = useState(false);
  const [showModaledit, setShowModaledit] = useState(false);
  const [search, setSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModaledit = () => setShowModaledit(false);
  const handleShowModaledit = () => setShowModaledit(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //Handlers
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleOptionClick = (index) => {
    setSelectedIndex(index);
    setShowForm(!showForm);
  };

  const handleOptionClick1 = (index) => {
    setSelectedIndex(index);
    handleCloseModaledit();
  };

 
  const tableValue = [
    "ID",
    "Date",
    "Product Id",
    "Product Type",
    "Transaction Type",
    "Product Name",
    "Description",
  ];

  return (
    <div>
      <Row style={{ marginTop: "6%" }}>
        <Col className="col-8" style={{ paddingLeft: "3%" }}>
          <div className="d-flex">
            <Button
              onClick={handleShowModal}
              style={{
                background: "#1d1d5e",
                color: "white",
                width: "11%",
                height: "31px",
                textAlign: "center",
                border: "none",
                padding: "0px",
                marginTop: "3px",
              }}
            >
              New +
            </Button>

            <p
              style={{
                marginLeft: "13px",
                marginTop: "6px",
                marginRight: "13px",
                color: "#1d1d5e",
              }}
            >
              Products
            </p>

            <FormControl
              placeholder="Search Products..."
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "30%", height: "20%" }}
            />
            <IoIosSearch className="search" />
            <FaCloudArrowDown
              style={{ marginLeft: "30px", marginTop: "10px" }}
            />
          </div>
        </Col>
        <Col className="">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Select Date Range"
            className="rounded ms-2"
          />
        </Col>
      </Row>
      <div fluid style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              {tableValue.map((tablename, index) => (
                <th key={index}>{tablename}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return (
                  (search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase())) &&
                  (!startDate || new Date(item.date) >= new Date(startDate)) &&
                  (!endDate || new Date(item.date) <= new Date(endDate))
                );
              })
              .map((item) => (
                <tr key={item.id}>
                  <td style={{ position: "relative" }}>
                    <SlOptionsVertical
                      onClick={() => handleOptionClick(item)}
                    />

                    {selectedIndex === item && showForm && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          zIndex: 999,
                          backgroundColor: "white",
                          padding: "10px",
                          marginTop: "-5px",
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                          onClick={() => handleShowModaledit(item.id)}
                        >
                          {/* Passing the id of the current item */}
                          <p style={{ margin: "0px", fontSize: "14px" }}>
                            Edit
                          </p>
                          <CiEdit onClick={() => handleOptionClick1(item.id)} />
                        </div>

                        <hr style={{ margin: "8px 0 !important" }} />

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <p style={{ margin: "0px", fontSize: "14px" }}>
                            Delete
                          </p>
                          <MdDeleteForever />
                        </div>
                        <hr />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "20px",
                          }}
                        >
                          <p style={{ margin: "0px", fontSize: "14px" }}>
                            Download
                          </p>
                          <MdOutlineFileDownload />
                        </div>
                      </div>
                    )}
                  </td>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.product_id}</td>
                  <td>{item.product_type}</td>
                  <td>{item.transctation_type}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px", color: "#1d1d5e" }}>
            New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <p
              style={{
                border: "none",
                marginRight: "10px",
                color: "#1d1d5e",
                marginBottom: "16px",
                fontSize: "16px",
                marginTop: "10px",
                margin: "-2px 6px 17px -4px",
              }}
            >
              General Info
            </p>
          </div>
          <Row>
            <Col>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px" }}
                  >
                    Transaction type
                  </label>

                  <Form.Control
                    type="text"
                    placeholder=" "
                    style={{ marginLeft: "17%", width: "50%", padding: "2px" }}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px" }}
                  >
                    Product_Id
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    style={{ marginLeft: "26%", width: "50%", padding: "2px" }}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px" }}
                  >
                    Product_Name
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    style={{ marginLeft: "20%", width: "50%", padding: "2px" }}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label className="control-label" style={{ fontSize: "14px" }}>
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your message"
                    style={{ marginLeft: "25%", width: "50%" }}
                  ></textarea>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="button"
            onClick={handleCloseModal}
            style={{
              background: "#1d1d5e",
              color: "white",
              width: "13%",
              height: "31px",
              textAlign: "center",
              border: "none",
              padding: "0px",
              marginTop: "4px",
              marginRight: "22px",
            }}
          >
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModaledit}
        onHide={handleCloseModaledit}
        className="modelcontent"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px", color: "#1d1d5e" }}>
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <p
              style={{
                border: "none",
                marginRight: "10px",
                color: "#1d1d5e",
                marginBottom: "16px",
                fontSize: "16px",
                marginTop: "10px",
                margin: "-2px 6px 17px -4px",
              }}
            >
              General Info
            </p>
          </div>
          <Row>
            <Col>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px" }}
                  >
                    Transaction type
                  </label>

                  <Form.Control
                    type="text"
                    placeholder=" "
                    style={{ marginLeft: "17%", width: "50%", padding: "2px" }}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px" }}
                  >
                    Product_Id
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    style={{ marginLeft: "26%", width: "50%", padding: "2px" }}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px" }}
                  >
                    Product_Name
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    style={{ marginLeft: "20%", width: "50%", padding: "2px" }}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label className="control-label" style={{ fontSize: "14px" }}>
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your message"
                    style={{ marginLeft: "25%", width: "50%" }}
                  ></textarea>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="button"
            onClick={handleCloseModaledit}
            style={{
              background: "#1d1d5e",
              color: "white",
              width: "13%",
              height: "31px",
              textAlign: "center",
              border: "none",
              padding: "0px",
              marginTop: "4px",
              marginRight: "22px",
            }}
          >
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Newproduct;
