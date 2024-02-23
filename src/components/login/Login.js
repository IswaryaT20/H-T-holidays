import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../../Assets/images/H&T.png";
import { Link } from "react-router-dom";

function Login() {
 


  return (
    <Form>
      <div className="full-background">
        <Container fluid className="d-flex pt-5 justify-content-center ">
          <div className="border text-center w-40 h-40 p-5 pt-0 shadow rounded bg-light">
            <img
              src={Logo}
              alt=" HandT holidays company Logo"
              className="w-40 h-40"
            />
            <FloatingLabel
              id="floatingInput"
              label="Email"
              className="mb-2 "
            >
              <Form.Control
                id="validationCustom01"
                type="email"
                className="w-100 mb-2 rounded h-10 plain_text"
                placeholder="name@example.com"


              />

            </FloatingLabel>
            <FloatingLabel
              id="floatingPassword"
              label="Password"
              className="mb-3 rounded"


            >
              <Form.Control
                id="validationCustom02"
                type="password"
                className="w-100 rounded f-14 plain_text "
                placeholder="Password"

              />

            </FloatingLabel>
            <Form.Check type="checkbox" className="rounded d-flex">
              <Form.Check.Input />
              <Form.Check className="ms-2 mb-2 f-14">Remember Me</Form.Check>
            </Form.Check>

            <Button
              variant=""
              className="m-2 mb-4 p-2 w-30 h-max txt-trans_up"
              style={{ backgroundColor: "#25316f", color: "white" }}
              type="submit"
            >
              Login
            </Button>
            <p className="text-center mt-3 f-14">
              Don't Have an account?{" "}
              <span className="txt-trans_up">
                <Link to="/Signup">Register Here</Link>
              </span>
            </p>
          </div>
        </Container>
      </div>
    </Form>
  );
}

export default Login;
