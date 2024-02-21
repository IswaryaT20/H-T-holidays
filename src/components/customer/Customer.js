import React, { useState, useEffect } from "react";

import {
  Container,
  Navbar,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
  InputGroup,
  Stack,
  Card

} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText"
import { FaFilter } from "react-icons/fa"
import { RiSearch2Line } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiKanbanBold } from "react-icons/pi";
import { IoMenu, IoClose } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import profile from '../../Assets/images/profile.jpg';


function Customer() {

  const [users, setusers] = useState([], false);
  const apiusers = () => {
    fetch('https://api.github.com/users')
      .then(response => {
        return response.json(
          console.log(response)
        )
      }
      ).then((result) => {
        setusers(true);
        setusers(result);
        console.log(result);

      })
      .catch(error => {
        console.error("fetching users:", error)
      })
  }

  useEffect(() => {
    apiusers();
  }, [])


  return (
    <>
      <Container fluid className="border">
        <Row className="d-flex justify-space-between align-items-center pt-2 ms-2 border-3">
          <Col xs={1} xxl={1} lg={1} md={1} className="text-center">
            <Button
              className="rounded text-white btn-blue"
              style={{
                backgroundColor: "#25316f",
                fontSize: "14px",
                width: "max-content",

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
          </Col>
          <Col
            xxl={3}
            lg={3}
            md={2}
            style={{
              fontSize: "14px",
              width: "max-content",
              fontWeight: "bold",
              display:
                window.innerWidth >= 400 && window.innerWidth < 750
                  ? "none"
                  : "block",
            }}
            className="text-center pt-3 align-items-center "
          >
            <p className="">Customer List</p>
          </Col>

          <Col
            xs={3}
            xxl={4}
            lg={4}
            md={3}
            className=" d-flex justify-content-center align-items-center mt-2 mb-2 ms-5 "
          >
            <Form.Group
              controlId="search"
              xxl={2}
              className="d-flex w-100 position-relative"
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="w-100 ps-5"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
              <div className="search-icon  position-absolute start-5 ps-4 pb-1 top-50 translate-middle ms-2">
                <RiSearch2Line className="mt-2 f-20" />
              </div>
            </Form.Group>
          </Col>
          {/* <Col>
          <Stack>
          <InputGroup>
          
          <RiSearch2Line />
            <InputGroupText style={{ backgroundColor: "#25316f" }}>
              <FaFilter style={{ color: "white" }} />
            </InputGroupText>
            <Form.Control
              style={{ background: "#80808036" }}
              placeholder="search here"
            ></Form.Control>
          </InputGroup>
          </Stack>
          </Col> */}

          <Col lg={5} xxl={5} md={2} className="text-end p-1">
            <span
              className="ar_back bg-gray txt-blue f-20 p-1 rounded pb-1 m-1">
              <IoIosArrowBack />
            </span>
            <span className=" bg-gray txt-blue f-20 p-1 rounded m-1">
              <IoIosArrowForward />
            </span>
            <span className=" bg-gray txt-blue f-20 p-1 rounded m-1">
              <PiKanbanBold />
            </span>
            <span className=" bg-gray txt-blue f-20 p-1 rounded m-1">
              <IoMenu />
            </span>
          </Col>
        </Row>

        <Row>
          <h1>Kanban Board</h1>
          <Stack direction="horizontal" className="flex-1 flex-wrap ">
            {users.length > 0 ? (
              users.map((item) => (
                <div key={item.id} className="card-box m-3 shadow">

                  <Card style={{ width: '20rem' }} className="p-2 d-flex flex-row">

                    <Card.Img variant="left"  src={item.avatar_url ? item.avatar_ur : profile} 
                                   className="w-30 rounded-circle mt-2 " />

                    <Card.Body>
                      <Card.Title variant="right" className="mt-2" >{item.login}</Card.Title>
                      <Card.Title variant="right" className="mt-2" >{item.login}</Card.Title>
                     
                    </Card.Body>
                    <Card.Footer>
                    <div variant="Bottom" className="text-end possition-absolute bg-none"> <IoMdTime /> </div>

                    </Card.Footer>

                    <div className="d-flex flex-column">
                      <div variant="bottom" className="text-end "> < IoClose/> </div>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <div>No users to display</div>
            )}

          </Stack>
        </Row>
      </Container>
    </>
  )
}

export default Customer;
