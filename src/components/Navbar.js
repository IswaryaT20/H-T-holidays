import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavLink, Navbar, Dropdown } from "react-bootstrap";
import logo from "../Assets/images/htnav.png";
import { Link } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { storeToLocalStorage, KEY_IS_LOGGED_IN, USER_ACCOUNT_LOGOUT, } from "../utils/Constant";
import { useDispatch } from "react-redux";

const NavigationItems = [
  { id: 2, title: "Customers", link: "/" },
  { id: 3, title: "Vendors", link: "#" },
  { id: 4, title: "Products", link: "/Product" },
  { id: 5, title: "Accounting", link: "#" },
  { id: 6, title: "Report", link: "#" },
];

const dropdownActions = {
  2: [
    { id: 1, title: "Customers", link: "/" },
    { id: 2, title: "Invoice", link: "/Invoice" },
  ],
  3: [
    { id: 1, title: "Vendors", link: "/vendor" },
    { id: 2, title: "Purchase", link: "/Purchase" },
  ],
  5: [
    {
      id: 1,
      title: "Expense",
      link: "/Expense",
    },
    {
      id: 2,
      title: "Customer Receipt",
      link: "/Receipt",
    },
    {
      id: 3,
      title: "Supplier Receipt",
      link: "/Payment",
    },
  ],
};

function Navigation2() {

  const dispatch = useDispatch();
  return (
    <Navbar
      className="f-14 fw-500"
      bg="light"
      expand="lg"
      style={{ paddingLeft: "17px" }}
    >
      <Navbar.Brand className="w-10" href="/">
        <img
          className=""
          style={{ height: "40px",width:170 }}
          src={logo}
          alt="logo"
        ></img>
      </Navbar.Brand>
      <Navbar.Toggle>
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse>
        <Nav className="ml-10p f-16 " variant="underline">
          {NavigationItems.map((item) =>
            dropdownActions[item.id] ? (
              <Dropdown className="" style={{ paddingLeft: "2%" }} key={item.id}>
                <Dropdown.Toggle className="f-16 "
                  style={{ border: "none" }}
                  variant=""
                  id={`dropdown-${item.title}`}
                >
                  {item.title}
                </Dropdown.Toggle>
                <Dropdown.Menu >
                  {dropdownActions[item.id].map((action) => (
                    <Dropdown.Item className="" key={action.id} as={Link} to={action.link}>
                      {action.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <NavLink
                className=" ml-4p trans"
                style={{ border: "none", marginLeft: "2%" }}
                key={item.id}
                as={Link}
                to={item.link}
              >
                {item.title}
              </NavLink>
            )
          )}
        </Nav>
      </Navbar.Collapse>
      <div className="logoutalign" style={{ marginRight: "2%"}} onClick={() => {
        storeToLocalStorage(KEY_IS_LOGGED_IN, "false")
        dispatch({type: USER_ACCOUNT_LOGOUT})
        console.log("on click")
      }}>
        <Nav className="me-4">
          <Dropdown alignRight >
            <Dropdown.Toggle
              style={{
                border: "none",
                background: "transparent",
              }}
            >
              <RiLogoutCircleLine
                style={{
                  color: "white",
                  border: "1px solid #25316f",
                  fontSize: "22px",
                  background: "#25316f",
                  height: "30px",
                  width: "30px",
                  cursor: "pointer",
                }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{}}>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Navigation2;
