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
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaCloudArrowDown } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";

const Newproduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModaledit, setShowModaledit] = useState(false);
  const [search, setSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModaledit = () => setShowModaledit(false);
  const handleShowModaledit = () => setShowModaledit(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [productId, setProductId] = useState("HT-");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const supplierId = "007";
  const createdBy = "14";
  const productUrl = "testURL@gmail.com";

  const fetchTableData = () => {
    axios
      .post("http://68.178.161.233:8080/handt/v2/products/getProducts")
      .then((response) => {
        console.log(response);
        setTableData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleSubmit = () => {
    const BodyData = {
      productName: productName,
      supplierId: supplierId,
      productType: productType,
      productDescription: description,
      createdBy: createdBy,
      productUrl: productUrl,
    };

    axios
      .post("http://68.178.161.233:8080/handt/v2/products/addProduct", BodyData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
    setShowModal(false);
  };

  //Handlers
  const handleOptionClick = (index) => {
    setSelectedIndex(index);
    setShowForm(!showForm);
  };

  const handleOptionClick1 = (index) => {
    setSelectedIndex(index);
    handleCloseModaledit();
  };

  const tableValue = [
    "",
    "PRODUCT ID",
    "PRODUCT NAME",
    "PRODUCT TYPE",
    "DESCRIPTION",
  ];

  return (
    <div>
      <Row style={{ marginTop: "2%" }}>
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
                marginLeft: "38px",
                marginTop: "6px",
                marginRight: "13px",
                color: "#1d1d5e",
              }}
            >
              Products
            </p>

            <InputGroup
              style={{ height: "10px", width: "27%", marginLeft: "10%" }}
            >
              <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <FormControl
                placeholder="Search Products..."
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "#80808036",
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "white",
                }}
              />
            </InputGroup>
            <div className="ms-3 d-flex align-items-center">
              <FaCloudArrowDown
                style={{
                  fontSize: 26,
                  color: "#1d1d5e",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <div
        className="mt-4 table-container"
        fluid
        style={{ paddingLeft: "2%", paddingRight: "2%" }}
      >
        <Table striped hover>
          <thead>
            <tr>
              {tableValue.map((tablename, index) => (
                <th
                  key={index}
                  style={{ backgroundColor: "#1d1d5e", color: "white" }}
                >
                  {tablename}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData
              .filter((items) => {
                return search.toLowerCase() === ""
                  ? items
                  : items.productName
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .map((items) => (
                <tr key={items.id}>
                  <td style={{ position: "relative" }}>
                    <SlOptionsVertical
                      onClick={() => handleOptionClick(items)}
                    />
                    {selectedIndex === items && showForm && (
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
                          onClick={() => handleShowModaledit(items.productCode)}
                        >
                          <p style={{ margin: "0px", fontSize: "14px" }}>
                            Edit
                          </p>
                          <CiEdit
                            onClick={() => handleOptionClick1(items.id)}
                          />
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
                  <td>{items.productId}</td>
                  <td>{items.productName}</td>
                  <td>{items.productType}</td>
                  <td>{items.productDescription}</td>
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
                    Product Type
                  </label>

                  <FormControl
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "22%", width: "50%", padding: "2px" }}
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
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
                    Product Code
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="inputfocus"
                    style={{ marginLeft: "21%", width: "50%", padding: "2px" }}
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    readOnly
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
                    Product Name
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "20%", width: "50%", padding: "2px" }}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
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
                    className="form-control inputfocus"
                    rows="4"
                    placeholder="Enter your message"
                    style={{ marginLeft: "25%", width: "50%" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="button"
            onClick={handleSubmit}
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
                    Product Type
                  </label>

                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "22%", width: "50%", padding: "2px" }}
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
                    Product Code
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="inputfocus"
                    style={{ marginLeft: "21%", width: "50%", padding: "2px" }}
                    readOnly
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
                    Product Name
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
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
                    className="form-control inputfocus"
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