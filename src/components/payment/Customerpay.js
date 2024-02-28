import React from "react";
import { Col, Container, Stack,Button, Row } from "react-bootstrap";

function customerpay() {
  return (
    <>
      <Container fluid className="flex">
        <Row className="w-100  ms-0 mt-2" style={{ flex: 1 }}>
          <Col style={{ flex: 1 }}></Col>
          <Col className=" border" style={{            
            height:520,
            flex: 6 
          }}>
            <Stack direction="horizontal" className="border w-100 mt-2 h-max p-2" gap={4} style={{backgroundColor:'#e4e4e4'}}>
              <div className=" f-16 font-bold">Receive Payment</div>
              <Button variant="secondary" className="p-1 ms-auto f-14 bg-blue">Receive</Button>
              <Button variant=''className="p-1 f-14 me-2 btn-blue">Cancel</Button>
            </Stack>
            <Stack direction="vertical">

            </Stack>
          </Col>

          <Col style={{ flex: 1 }}></Col>
        </Row>
      </Container>
    </>
  );
}

export default customerpay;
