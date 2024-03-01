import React, { useState } from "react";
import {
  Col,
  Container,
  Button,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import { CiCalendar } from "react-icons/ci";
import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import "./Expense.css";

const Expense = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const onSearch = (e) => {
  //   setSearch(e.target.value);
  // };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  //Dummy Values
  const tableHeader = [
    "No",
    "Contact",
    "Pay For",
    "Payment Date",
    "VAT Amount",
    "Amount Paid",
    "Payment Type",
  ];

  const fakeData = [
    {
      No: "1",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "02-01-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "2",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "02-02-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "3",
      Contact: "abilesh",
      Pay_For: "Bill",
      Payment_date: "02-01-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "4",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "02-27-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "5",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "27-09-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "6",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "27-05-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "7",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "27-03-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "8",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "27-02-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
    {
      No: "9",
      Contact: "8220390465",
      Pay_For: "Bill",
      Payment_date: "03-07-2024",
      VAT_amt: "500",
      amt_paid: "3500",
      payment_type: "cash",
    },
  ];

  return (
    <>
      <Container fluid className="mt-1">
        <Row className="w-100 mt-2 p-2">
          <Col
            className="col-2 fw-bolder"
            style={{ color: "#1d1d5e", fontSize: 16 }}
          >
            My Expense
          </Col>
          <Col className="col-4">
            <InputGroup style={{ width: 300 }}>
              <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <FormControl
                placeholder="Search Expense..."
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
          <Col className="col-6 d-flex justify-content-end">
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
            <div className="d-flex align-items-center ms-4">
              <FaCloudUploadAlt
                className="fs-2"
                style={{ color: "#1d1d5e", cursor: "pointer" }}
              />
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

        <div>
          <Link to="/NewExpense">
          <Button
            style={{ backgroundColor: "#1d1d5e", fontWeight: "500", border: 0 }}
          >
            New Expense
          </Button>
          </Link>
        </div>
        {/* Table */}
        <div className="table-container mt-2">
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
            <tbody>
              {fakeData
                .filter((item) => {
                  return (
                    (search.toLowerCase() === ""
                      ? item
                      : item.Contact.toLowerCase().includes(
                          search.toLowerCase()
                        )) &&
                    (!startDate ||
                      new Date(item.Payment_date) >= new Date(startDate)) &&
                    (!endDate ||
                      new Date(item.Payment_date) <= new Date(endDate))
                  );
                })
                .map((item, index) => (
                  <tr
                    key={index}
                    style={{ textAlign: "center" }}
                    className="fs-6"
                  >
                    <td>{item.No}</td>
                    <td>{item.Contact}</td>
                    <td>{item.Pay_For}</td>
                    <td>{item.Payment_date}</td>
                    <td>{item.VAT_amt}</td>
                    <td>{item.amt_paid}</td>
                    <td>{item.payment_type}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default Expense;
