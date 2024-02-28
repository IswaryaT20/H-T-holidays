import { Form } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { FaSearch } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineContacts } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import avatar1 from "../../../src/Assets/avatars/1.jpg";

function Customer() {
  const [card, setCards] = useState([]);
  const [tablevalue, setTablevalue] = useState([]);
  const [cardActive, setCardActive] = useState(true);
  const [tableActive, setTableActive] = useState(false);

  const handleCard = () => {
    setCardActive(true);
    setTableActive(false);
  };
  const handleTable = () => {
    setTableActive(true);
    setCardActive(false);
  };
  const getCardData = () => {
    fetch("http://68.178.161.233:8080/handt/v2/customer/getAllCustomers")
      .then((response) => response.json())

      .then((result) => {
        // console.log(card);
        const customerfilter = result.data.filter(
          (customerdata) => customerdata.businessTypeId === 1
        );
        setCards(customerfilter);
        setTablevalue(customerfilter);
      });
  };
  useEffect(() => {
    getCardData();
  }, []);

  return (
    <>
      <Stack className="mt-4 d-flex" direction="horizontal" gap={5}>
        <div className="ps-5">
          <Link to="/CustomerForm">
            <Button
              className="rounded text-white btn-blue w-100 b-none"
              style={{
                backgroundColor: "#25316f",
                fontSize: "14px",
                width: "",
                justifyContent: "space-evenly",

                ...(window.innerWidth >= 400 &&
                  window.innerWidth < 750 && {
                    fontSize: "12px",
                    width: "80%",
                    height: "max-content",
                    padding: "1px",
                  }),
              }}
            >
              New +
            </Button>
          </Link>
        </div>
        <div className="">
          <span style={{ color: "#25316f" }}>Customers</span>
        </div>
        <div
          className="group-search d-flex ml-6p"
          style={{
            width: "39%",
          }}
        >
          <div className="p-2 filter-icon mt-1"></div>
          <div className="p-2">
            <InputGroup className="w-max">
              <InputGroupText style={{ backgroundColor: "#25316f" }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <Form.Control
                style={{
                  background: "#80808036",
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "white",
                }}
                placeholder="search here"
              />
            </InputGroup>
          </div>
        </div>
        <div
          className="icons-set align-items-center"
          style={{ paddingLeft: "18%", width: "33%" }}
        >
          <RiArrowLeftSLine />
          <RiArrowRightSLine />
          <AiOutlineContacts
            onClick={handleCard}
            className={cardActive ? "selectedIcon" : ""}
          />
          <IoMdMenu
            onClick={handleTable}
            className={tableActive ? "selectedIcon" : ""}
          />
        </div>
      </Stack>
      {cardActive ? (
        <div
          className="card-container"
          style={{
            background: "#e4e4e4",
            padding: "15px",
            margin: "3% 2% 0px 2%",
          }}
        >
          <div>
            <div className="d-flex flex-wrap" style={{ gap: "15px" }}>
              {card.length > 0
                ? card.map((item) => (
                    <Card
                      key={item.id}
                      className="flex container d-flex flex-row align-items-center p-10"
                      style={{
                        width: "300px",
                        height: "120px",
                      }}
                    >
                      <div
                        className="image-container d-flex flex-column flex-1"
                        style={{
                          marginLeft: "20px",
                        }}
                      >
                        <Card.Img
                          style={{ width: "60px", height: "auto" }}
                          src={avatar1}
                          className="rounded-circle flex-1"
                        ></Card.Img>
                      </div>
                      <div className="image-container d-flex flex-column flex-1">
                        <Card.Body className="flex-1">
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>{item.jobPosition}</Card.Text>
                        </Card.Body>
                      </div>
                    </Card>
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="table-container mt-5">
        {tableActive ? (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Sales Person</th>
                <th>Activities</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {tablevalue.length > 0 ? (
                tablevalue.map((tableItem) => (
                  <tr>
                    <td>{tableItem.jobPosition}</td>
                    <td>{tableItem.jobPosition}</td>
                    <td>{tableItem.jobPosition}</td>
                    <td>{tableItem.jobPosition}</td>
                    <td>{tableItem.jobPosition}</td>
                    <td>{tableItem.jobPosition}</td>
                    <td>{tableItem.jobPosition}</td>
                    <td>{tableItem.jobPosition}</td>
                  </tr>
                ))
              ) : (
                <tr>NO data found</tr>
              )}
            </tbody>
          </Table>
        ) : null}
      </div>
    </>
  );
}

export default Customer;
