import React from "react";
import {
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../../Assets/images/H&T.png";
import { Link } from "react-router-dom";
import "../../index.css";

function Signup() {
  return (
    <div className="full-background">
      <Container fluid className=" f-14 d-flex pt-5 justify-content-center ">
        <div className=" f-14 border w-40 p-5 pt-0 shadow rounded h-max bg-white">
          <div className="f-14 text-center">
            <img
              src={Logo}
              alt=" HandT holidays company Logo"
              className=" f-14 w-30 h-40 "
            />
          </div>

          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="f-14 border border-secondary border-2"
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="f-14 border border-secondary border-2"
              type="text"
              placeholder="Username"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="f-14 border border-secondary border-2"
              type="Password"
              placeholder="Password"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            
              className="f-14 border border-secondary border-2"              
              type="Password"
              placeholder="Confirm Password"
            ></Form.Control>
          </Form.Group>
          <Form.Check type="checkbox" className="rounded d-flex mt-2  ">
            <Form.Check.Input className="border border-secondary border-1" />
            <Form.Check className=" f-14 ms-2 mb-2">
              I agreed to the terms and conditions
            </Form.Check>
          </Form.Check>

          <div style={{ textAlign: "center" }}>
            <Button
              variant=""
              className="f-16 m-2 p-2 btn-blue"
              type="submit"
              style={{ backgroundColor: "#25316f", color: "white",textTransform:"uppercase" }}
            >
              Signup
            </Button>
          </div>
          <p className=" f-14 text-center mt-3 mb-1 f-14">
            Don't Have an account?{" "}
            <span
            className="txt-trans_up"
            >
              <Link to="/">Login Here</Link>
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
