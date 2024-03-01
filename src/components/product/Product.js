import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  Table,
  Modal,
  Form,
  Alert,
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
import { GET_ALL_PRODUCTS_API_CALL, ADD_PRODUCT_API_CALL, GET_ALL_CUSTOMERS_API_CALL } from "../../utils/Constant";

const Newproduct = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModaledit, setShowModaledit] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [search, setSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModaledit = () => setShowModaledit(false);
  const handleShowModaledit = () => setShowModaledit(true);
  const handleCloseAlertModal = () => setShowAlertModal(false);
  const handleShowAlertModal = () => setShowAlertModal(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [supplierNameError, setSupplierNameError] = useState(false);
  const [productNameError, setProductNameError] = useState(false);
  const [productType, setProductType] = useState(" H_T HOLIDAYS");
  const [productUrl, setProductUrl] = useState();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierId, setSupplierId] = useState();
  const [startingIndex, setStartIndex] = useState(0)
  const [endingIndex, setEndingIndex] = useState(15)
  const [success, setsuccess] = useState();

  const dispatch = useDispatch()

  useEffect(() => {
    // fetchTableData();
    dispatch({ type: GET_ALL_PRODUCTS_API_CALL })
    
    if (props.customers.customersList.length === 0) {
      dispatch({type: GET_ALL_CUSTOMERS_API_CALL})
    }
  }, []);


  const handleSelectSupplier = (e) => {
    setSupplierId(parseInt(e.target.value))
  }


  const handleSubmit = () => {

    if (!productName.trim()) {
      setProductNameError(true);
      return;
    }

    const bodyData = {
      productName: productName,
      supplierId: supplierId,
      productType: productType,
      productDescription: description,
      supplierName: supplierName,
      createdBy: props.loggedInUser.loginId,
      productUrl: productUrl,
    };


    dispatch({ type: ADD_PRODUCT_API_CALL, payload: bodyData })
    setShowModal(false);
  };

  const handleOptionClick1 = (index) => {
    setSelectedIndex(index);
    handleCloseModaledit();
  };

  const paginationEvent = (index) => {
    setEndingIndex(index * 15)
    setStartIndex((index -1) * 15 )
    // setStartIndex()
  }

  const tableValue = [
    "Action",
    "Product ID",
    "Product Name",
    "Product Type",
    "Description",
  ];


  const renderPagination =  useCallback(() => {

    console.log(props)
    const totalNoOfProducts =  props.productsData.products
    const noOfPages = totalNoOfProducts.length /15;
    const reminder = totalNoOfProducts.length % 15

    const totalPages = parseInt(noOfPages) + (reminder > 0 ? 1 : 0)

    return <div style={{display: 'flex', flexDirection: 'row'}}>
      {
        Array.from({length: totalPages}, (_, index) => {
          return <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#AAAAAA', borderStyle: 'solid', display: 'flex', cursor: 'pointer'}} onClick={() => paginationEvent(index + 1)}>
            {index + 1}
          </div>
        })  
      }
    </div>
  }, [props.productsData.products])

  return (
    <div style={{paddingRight: 50, paddingLeft: 50}}>
      <Row style={{ marginTop: "2%" }}>
        <Col className="col-8" style={{ }}>
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
        className="mt-4"
        fluid
        style={{ flex: 1 }}
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
            }).slice(startingIndex, endingIndex)
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
                    style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                  >
                    Product Type
                  </label>

                  <FormControl
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ flex: 3, padding: "2px", background: '#d9e1ee8c' }}
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)} readOnly
                  />
                </div>

                <div
                  className={`mb-3 ${supplierNameError ? "has-error" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                  >
                    Supplier Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Select
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ flex: 3, padding: "2px" }}
                    onChange={(e) => { handleSelectSupplier(e)}}
                  >
                    {
                      props.customers.customersList.filter(item => item.businessTypeId !== 1).map(item => {
                        return <option value={item.id}>{item.name}</option>
                      })
                    }
                  </Form.Select>

                  {/* {supplierNameError && (
                    <span style={{ color: "red", marginTop: '48px', marginLeft: '-29%', fontSize: '12px' }}>Supplier Name Required</span>
                  )} */}
                </div>

                <div
                  className={`mb-3 ${productNameError ? "has-error" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                  >
                    Product Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{
                      flex: 3,
                      padding: "2px",
                    }}
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      setProductNameError(false);
                    }}
                  />
                  {productNameError && (
                    <span style={{ color: "red", marginTop: '48px', marginLeft: '-29%', fontSize: '12px' }}>Product Name Required</span>
                  )}
                </div>

                <div
                  className={`mb-3 ${productNameError ? "has-error" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label mr-3"
                    style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                  >
                    Product URL
                  </label>
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{
                      flex: 3,
                      padding: "2px",
                    }}
                    value={productUrl}
                    onChange={(e) => {
                      setProductUrl(e.target.value);
                      setProductNameError(false);
                    }}
                  />
                  </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    className="control-label"
                    style={{ fontSize: "14px", flex: 2 }}
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control inputfocus"
                    rows="4"
                    placeholder="Enter your message"
                    style={{ flex: 3 }}
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
                    style={{ marginLeft: "22%", width: "50%", padding: "2px", background: '#d9e1ee8c' }}
                    defaultValue="  H_T HOLIDAYS"
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
                    Supplier Name
                  </label>
                  <FormControl
                    type="text"
                    placeholder=" "
                    className="inputfocus"
                    style={{ marginLeft: "89px", width: "50%", padding: "2px" }}

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
      <Modal show={showAlertModal} onHide={handleCloseAlertModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success === 'Success' ? (
            <Alert variant="success"> {success} </Alert>
          ) : (
            <Alert variant="danger">Data Saved Unsuccessfully</Alert>
          )}
        </Modal.Body>
      </Modal>
      {
        props.productsData.error ? <Alert clas>[props.productsData.error.status]</Alert> : null

      }

      <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end', marginTop: 20, paddingBottom: 100}}>
      {
        props.productsData.products?.length > 0 ? renderPagination() : null
      }
      </div>
     
    </div>
  );
};

const mapsToProps = (state) => {
  return {
    productsData: state.productsData,
    loggedInUser: state.users,
    customers: state.customers
  }
}

export default connect(mapsToProps)(Newproduct);