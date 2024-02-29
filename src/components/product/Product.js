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

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector, connect } from "react-redux";
import { GET_ALL_PRODUCTS_API_CALL } from "../../utils/Constant";

const Newproduct = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModaledit, setShowModaledit] = useState(false);
  const [search, setSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModaledit = () => setShowModaledit(false);
  const handleShowModaledit = () => setShowModaledit(true);
  const [selectedIndex, setSelectedIndex] = useState(null);




  const [supplierNameError, setSupplierNameError] = useState(false);
  const [productNameError, setProductNameError] = useState(false);





  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const supplierId = "007";
  const createdBy = "14";
  const productUrl = "testURL@gmail.com";

  console.log(props)

  const dispatch = useDispatch()

  useEffect(() => {
    // fetchTableData();
    dispatch({type: GET_ALL_PRODUCTS_API_CALL})
  }, []);




  const handleSubmit = () => {
    if (!supplierName.trim()) {
      setSupplierNameError(true);
      return;
    }
    if (!productName.trim()) {
      setProductNameError(true); 
      return;
    }


    const BodyData = {
      productName: productName,
      supplierId: supplierId,
      productType: productType,
      productDescription: description,
      supplierName: supplierName,
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


  const handleOptionClick1 = (index) => {
    setSelectedIndex(index);
    handleCloseModaledit();
  };

  const tableValue = [
    "Action",
    "Product ID",
    "Product Name",
    "Product Type",
    "Description",
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
            {props.productsData.products.filter((items) => {
                return search.toLowerCase() === ""
                  ? items
                  : items.productName
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .map((items) => (
                <tr key={items.id}>
                <td > 
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                      onClick={() => handleShowModaledit(items.productCode)}
                    >
                    
                      <FaEdit 
                        onClick={() => handleOptionClick1(items.id)} style={{ alignItems: 'center', marginLeft: '22px', marginBottom: '-19px' }}
                      />
                    </div>
                    <MdDelete style={{ marginLeft: '13px' }} />
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
                    style={{ marginLeft: "22%", width: "44%", padding: "2px" }}
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  />
                </div>

                <div
                  className={`mb-3 ${supplierNameError ? "has-error" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px" }}
                  >
                    Supplier Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <FormControl
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{
                      marginLeft: "79px",
                      width: "45%",
                      padding: "2px",
                    }}
                    value={supplierName}
                    onChange={(e) => {
                      setSupplierName(e.target.value);
                setSupplierNameError(false);
                    }}
                  />
                  
                  {supplierNameError && (
                    <span style={{ color: "red"  }}> Required</span>
                  )}
                </div>

                <div
  className={`mb-3 ${productNameError ? "has-error" : ""}`}
  style={{ display: "flex", alignItems: "center" }}
>
  <label
    className="control-label mr-3"
    style={{ fontSize: "14px", padding: "0px" }}
  >
    Product Name <span style={{ color: 'red' }}>*</span>
  </label>
  <Form.Control
    type="text"
    placeholder=" "
    className="inputfocus"
    style={{
      marginLeft: "18%",
      width: "45%",
      padding: "2px",
    }}
    value={productName}
    onChange={(e) => {
      setProductName(e.target.value);
      setProductNameError(false); 
    }}
  />
  {productNameError && (
    <span style={{ color: "red" }}> Required</span> 
  )}
</div>
                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label"
                    style={{ fontSize: "14px" }}
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control inputfocus"
                    rows="4"
                    placeholder="Enter your message"
                    style={{ marginLeft: "25%", width: "45%" }}
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
                    Product Type <span style={{ color: 'red' }}>*</span>
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
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px" }}
                  >
               Supplier Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <FormControl
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "78px", width: "50%", padding: "2px" }}
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


const mapsToProps = (state) => {
  return {
    productsData: state.productsData
  }
}

export default connect(mapsToProps)(Newproduct);