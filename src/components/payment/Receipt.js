import React, { useEffect, useState } from "react";
import {
  Container,
  FormSelect,
  Pagination,
  Row,
  Table,
  Button,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { GET_ALL_CUSTOMERS_API_CALL } from "../../utils/Constant";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useDispatch, connect } from "react-redux";

function Receipt(props) {
  const [getcustomer, setgetcustomer] = useState([]);
  const [entitiesPerPage, setEntitiesPerPage] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch()

  const handleDateChange = (dates) => {
    if (dates === NaN) {
      setStartDate();
      setEndDate();
    } else {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  useEffect(() => {
    dispatch({type: GET_ALL_CUSTOMERS_API_CALL, data: 3})
    // axios
    //   .post("http://68.178.161.233:8080/handt/v2/customer/getAllCustomers")
    //   .then((response) => {
    //     setgetcustomer(response.data.data);
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));
    // console.log(entitiesPerPage);
  }, [entitiesPerPage]);

  // console.log("the data pages",entitiesPerPage);

  return (
    <div>
      <Container fluid>
        <div
          className="d-flex mt-4 pt-4 "
          style={{
            border: "1px solid #80808042",
            paddingLeft: "1%",
            paddingRight: "1%",
            marginBottom: "1%",
          }}
        >
          <Col>
            <Link to="/Customerpay">
              <Button
                className="b-none"
                style={{ backgroundColor: "#25316f", color: "white" }}
              >
                New Receipt
              </Button>
            </Link>
          </Col>
          <Col>
            <InputGroup style={{ height: "10px", width: "100%" }}>
              <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <FormControl
                placeholder="Search Customer..."
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
              <span className="showentity mt-1">Show entities</span>
              <FormSelect
                className="d-flex form-select align-item-center ms-2 w-40 mb-3 fs-6 inputfocus"
                onChange={(e) => {
                  setEntitiesPerPage(e.target.value);
                  console.log("Selected entities per page:", e.target.value);
                }}
                value={entitiesPerPage}
              >
                <option className="f-10" value={10}>
                  10
                </option>
                <option className="f-10" value={25}>
                  25
                </option>
                <option className="f-10" value={50}>
                  50
                </option>
              </FormSelect>
            </div>
          </Col>
        </div>
        <div className="table-container " style={{ width: "100%" }}>
          <table className="table" style={{ overflowY: "scroll" }} responsive>
            <thead>
              <tr>
                <th style={{ backgroundColor: "#25316f", color: "white" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#25316f", color: "white" }}>
                  Date
                </th>
                <th style={{ backgroundColor: "#25316f", color: "white" }}>
                  Customer Name
                </th>
                <th style={{ backgroundColor: "#25316f", color: "white" }}>
                  They Owe You
                </th>
                <th style={{ backgroundColor: "#25316f", color: "white" }}>
                  You Owe Them
                </th>
              </tr>
            </thead>
            <tbody>
              {props.customers.customersList
                .filter((item) => {
                  return (
                    (search.toLowerCase() === ""
                      ? item
                      : item.name
                          .toLowerCase()
                          .includes(search.toLowerCase())) &&
                    (!startDate ||
                      new Date(item.date) >= new Date(startDate)) &&
                    (!endDate || new Date(item.date) <= new Date(endDate))
                  );
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
                return (
                  (search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase())) &&
                  (!startDate || new Date(item.date) >= new Date(startDate)) &&
                  (!endDate || new Date(item.date) <= new Date(endDate))
                );
              }).length === 0 && (
                <tr>
                  <td colSpan={5} style={{ fontWeight: "600", color: "red" }}>
                    No data found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
    customers: state.customers
  }
}

export default connect(mapsToProps)(Receipt);
