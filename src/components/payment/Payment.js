import React, { useEffect, useState } from "react";
import {
  Container,
  FormSelect,
  Pagination,
  Button,
  Col,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { GET_ALL_CUSTOMERS_API_CALL } from "../../utils/Constant";
import { useDispatch, connect } from "react-redux";

function Payment(props) {
  const [entitiesPerPage, setEntitiesPerPage] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_CUSTOMERS_API_CALL, data: 3 });
  }, [entitiesPerPage]);

  // console.log("the data pages",entitiesPerPage);

  return (
    <div style={{paddingLeft:50, paddingRight:50}}>
      <Container fluid>
        <div
          className="d-flex mt-4 pt-4 "
          style={{
            paddingLeft: "1%",
            paddingRight: "1%",
            marginBottom: "1%",
          }}
        >
          <Col>
            <Link to="/SupplierPay">
              <Button
                className="b-none"
                style={{ backgroundColor: "#1d1d5e", color: "white" }}
              >
                New Payment
              </Button>
            </Link>
          </Col>
          <Col>
            <InputGroup style={{ height: "10px", width: "100%" }}>
              <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <FormControl
                placeholder="Search Supplier..."
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "#80808036",
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "white",
                  height: "35px",
                }}
              />
            </InputGroup>
          </Col>

          <Col className="d-flex align-items-center justify-content-end me-3">
            <div className="d-flex align-items-start pt-1 ms-3">
              <span className="showentity mt-1" style={{color:"#1d1d5e"}}>Show entities</span>
              <FormSelect
                className="d-flex form-select align-item-center ms-2 w-40 mb-3 fs-6 inputfocus rounded-0"
                onChange={(e) => {
                  setEntitiesPerPage(e.target.value);
                  console.log("Selected entities per page:", e.target.value);
                }}
                value={entitiesPerPage}
                style={{height:"35px", fontSize:10}}
              >
                <option className="f-12" value={10}>
                  10
                </option>
                <option className="f-12" value={25}>
                  25
                </option>
                <option className="f-12" value={50}>
                  50
                </option>
              </FormSelect>
            </div>
          </Col>
        </div>
        <div className="table-container " style={{ width: "100%" }}>
          <Table className="table" style={{ overflowY: "scroll" }} bordered size="sm">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Payment Date
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Supplier Name
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Amount Payable
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Amount Receivable
                </th>
              </tr>
            </thead>
            <tbody>
              {props.customers.customersList
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.name}</td>
                    <td>{item.theyOweYou}</td>
                    <td>{item.youOweThem}</td>
                  </tr>
                ))}
              {props.customers.customersList.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search.toLowerCase());
              }).length === 0 && (
                <tr>
                  <td colSpan={5} className="fst-italic" style={{ color: "red" }}>
                    No data found!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center ms-auto text-center mt-3">
          <Pagination size="md"></Pagination>
        </div>
      </Container>
    </div>
  );
}

const mapsToProps = (state) => {
  return {
    customers: state.customers,
  };
};

export default connect(mapsToProps)(Payment);
