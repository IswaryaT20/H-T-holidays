import React, { useEffect, useState } from "react";
import {
  Container,
  FormSelect,
  Pagination,
  Row,
  Table,
  Button,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Receipt() {
  const [getcustomer, setgetcustomer] = useState([]);
  const [entitiesPerPage, setEntitiesPerPage] = useState("");
  useEffect(() => {
    axios
      .post("http://68.178.161.233:8080/handt/v2/customer/getAllCustomers")
      .then((response) => {
        setgetcustomer(response.data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    console.log(entitiesPerPage);
  }, [entitiesPerPage]);

  // console.log("the data pages",entitiesPerPage);

  return (
    <div>
      <Container fluid>
        <div className="d-flex align-items-center m-2 border">
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
          <Col className="d-flex align-items-center justify-content-end">
            <DatePicker
              dateFormat={"dd/MM/yyyy"}
              selectsRange
              placeholderText="Select Date Range"
              className="form-control rounded inputfocus"
            />
            </Col>
            <Col className="d-flex align-items-center justify-content-end me-3">
            <div className="d-flex align-items-start pt-1 ms-3">
              Show entities
              <FormSelect
                className="d-flex form-select align-item-center ms-2 w-40 mb-3 fs-6"
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
        <div
          className="border border-3"
          style={{ height: 350, width: "100%", overflowY: "scroll" }}
        >
          <Table className="table" responsive>
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
              {getcustomer.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.name}</td>
                  <td>{item.theyOweYou}</td>
                  <td>{item.youOweThem}</td>
                </tr>
              ))}
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

export default Receipt;
