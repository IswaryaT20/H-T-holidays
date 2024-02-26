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

function Vendors() {
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
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((result) => setCards(result));
  };
  useEffect(() => {
    getCardData();
  }, []);
  const gettablevalue = () => {
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((res) => setTablevalue(res));
  };
  useEffect(() => {
    gettablevalue();
  }, []);

  return (
    <>
      <Stack className="mt-4 d-flex" direction="horizontal" gap={5}>
        <div className="ps-5">
          <Link to="/VendorForm">
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
          <span style={{ color: "#25316f" }}>Vendors</span>
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
                className="inputfocus"
                style={{
                  background: "#80808036",
                }}
                placeholder="search Vendors "
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
                          src={item.avatar_url}
                          className="rounded-circle flex-1"
                        ></Card.Img>
                      </div>
                      <div className="image-container d-flex flex-column flex-1">
                        <Card.Body className="flex-1">
                          <Card.Title>{item.login}</Card.Title>
                          <Card.Text>details here</Card.Text>
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
                    <td>{tableItem.id}</td>
                    <td>{tableItem.node_id}</td>
                    <td>{tableItem.login}</td>
                    <td>{tableItem.html_url}</td>
                    <td>{tableItem.gists_url}</td>
                    <td>{tableItem.login}</td>
                    <td>{tableItem.login}</td>
                    <td>{tableItem.login}</td>
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

export default Vendors;
