import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavLink, Navbar, Dropdown } from "react-bootstrap";
import logo from "../Assets/images/htnav.png";

const NavigationItems = [
  { id: 1, title: "Dashboard", link: "#" },
  { id: 2, title: "Customers", link: "#" },
  { id: 3, title: "Vendors", link: "#" },
  { id: 4, title: "Products", link: "#" },
  { id: 5, title: "Accounting", link: "#" },
  { id: 6, title: "Report", link: "#" },
  { id: 7, title: "Procurement", link: "#" },
  { id: 8, title: "Expense", link: "#" },
];

const dropdownActions = {
  2: [{ id: 1, title: "Customers", link: "#" }],
  3: [{ id: 1, title: "Vendors", link: "#" }],
  7: [
    { id: 1, title: "purchase", link: "#" },
    { id: 2, title: "Payment", link: "#" },
  ],
};

function Navigation2() {
  return (
    <Navbar
      className="f-14 fw-500"
      bg="light"
      expand="lg"
      style={{ paddingLeft: "17px" }}
    >
      <Navbar.Brand className="w-10" href="#">
        <img
          className="w-100"
          style={{ height: "40px" }}
          src={logo}
          alt="logo"
        ></img>
      </Navbar.Brand>
      <Navbar.Toggle>
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse>
        <Nav className="ml-10p" variant="underline">
          {NavigationItems.map((item) =>
            dropdownActions[item.id] ? (
              <Dropdown style={{ paddingLeft: "2%" }} key={item.id}>
                <Dropdown.Toggle
                  style={{ border: "none" }}
                  variant=""
                  id={`dropdown-${item.title}`}
                >
                  {item.title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dropdownActions[item.id].map((action) => (
                    <Dropdown.Item key={action.id} href={action.link}>
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
                href={item.link}
              >
                {item.title}
              </NavLink>
            )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation2;
