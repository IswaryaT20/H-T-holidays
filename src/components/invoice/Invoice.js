import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  Table,
  Container,
  InputGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import "./Invoice.css";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  GET_ALL_INVOICE_API_CALL,
  RESET_INVOICE_ARRAY,
} from "../../utils/Constant";

const Newproduct = (props) => {
  const dispatch = useDispatch();

  //use states
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //Handlers
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

  console.log(props);

  useEffect(() => {
    dispatch({ type: RESET_INVOICE_ARRAY });
    dispatch({ type: GET_ALL_INVOICE_API_CALL });
  }, []);

  //Dummy table headers
  const tableValue = [
    "Invoice No",
    "Customer Name",
    "Invoice Date",
    "Due Date",
    "Net Date",
    "Total Amount (AED)",
    "Action",
  ];
  console.log(props.invoice.listInvoice)

  return (
    <Container fluid className="mt-2">
      <div style={{ paddingLeft: 50, paddingRight: 50 }}>
        <Row className="ms-1">
          <Col lg={6} xxl={6} className="col-6 p-1">
            <div
              className="p-2 shadow rounded-3"
              style={{ background: "#87ceeb2e", height: 180 }}
            >
              <h6
                className="pt-3 f-20"
                style={{ marginLeft: "20px", marginBottom: "20px" }}
              >
                Invoice Summary
              </h6>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginBottom: "10 px",
                    marginLeft: "3%",
                    color: "grey",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total Amount
                  <br />
                  <span style={{ color: "black" }}>AED</span>
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "19%",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid
                  <br />
                  <span style={{ color: "black" }}>AED 0.00</span>
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "26%",
                    color: "blue",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Paid
                  <br />
                  <span style={{ color: "black" }}>AED 0.00</span>
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6} xxl={6} className="col-6 p-1">
            <div
              className="p-2 shadow rounded-3"
              style={{ background: "#87ceeb2e", height: 180 }}
            >
              <h6
                className="pt-3 f-20 "
                style={{ marginLeft: "20px", marginBottom: "20px" }}
              >
                Invoice Summary
              </h6>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "3%",
                    color: "grey",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total Amount :{" "}
                  <span style={{ color: "black" }}>AED 0.00</span>
                </p>
                <p
                  style={{
                    marginLeft: "51%",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid : <span style={{ color: "black" }}>AED 0.00</span>
                </p>
              </div>
              <ProgressBar
                className="progress"
                now={60}
                style={{ width: "93%", marginLeft: "21px" }}
              />
              <div className="d-flex">
                <div class="square"></div>
                <p
                  style={{
                    marginLeft: "-7%",
                    fontSize: "14px",
                    marginTop: "2px",
                    fontWeight: "500",
                  }}
                >
                  Paid
                  <br />
                  0.00
                </p>
                <div
                  class="square"
                  style={{ marginLeft: "15%", background: "#d2d4d7" }}
                ></div>
                <p
                  style={{
                    marginLeft: "-6%",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid
                  <br />
                  0.00
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "2%" }}>
          <Col className="col-8" style={{ paddingLeft: "2%" }}>
            <div className="d-flex">
              <Link
                to="/NewInvoice"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  style={{
                    backgroundColor: "#1d1d5e",
                    borderColor: "#1d1d5e",
                    width: "80px",
                  }}
                >
                  New +
                </Button>
              </Link>
              <InputGroup
                style={{ height: "10px", width: "39%", marginLeft: "10%" }}
              >
                <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                  <FaSearch className="text-white" />
                </InputGroupText>
                <FormControl
                  placeholder="Search Invoice..."
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    background: "#80808036",
                    boxShadow: "none",
                    outline: "none",
                    borderColor: "white",
                  }}
                />
              </InputGroup>
            </div>
          </Col>
          <Col
            className="d-flex justify-content-end"
            style={{ marginLeft: "75px" }}
          >
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              dateFormat={"dd/MM/yyyy"}
              placeholderText="Select Date Range"
              className="rounded"
            />
          </Col>
        </Row>
        <div
          style={{ paddingLeft: "1%", paddingRight: "1%" }}
          className="table-container mt-3"
        >
          <Table striped hover size="sm" bordered>
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
              {/* {props.invoice.listInvoice.map((item) => (
                <tr key={item.id}>
                  <td>{item.invoiceOrderId}</td>
                  <td>{item.customerName}</td>
                  <td>{item.invoiceDate}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.net}</td>
                  <td>{item.totalAmount}</td>
                  <td>
                    <FiDownload />
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

const mapsToProps = (state) => {
  return {
    invoice: state.invoice,
  };
};

export default connect(mapsToProps)(Newproduct);
