import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL } from "../../utils/Constant";
import Avatar from "../../Assets/avatars/1.jpg";
import { Container, Row, Col } from "react-bootstrap";
import { MdAddIcCall } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

const CustomerDetails = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedCustomer, setselectedCustomer] = useState(null);

  console.log(props);

  useEffect(() => {
    dispatch({
      type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
      data: location.state.id,
    });
  }, [dispatch, location.state.id]);

  useEffect(() => {
    setselectedCustomer(props.customers.selectedCustomerDetails);
  }, [props.customers.selectedCustomerDetails]);

  return (
    <Container
      className="customercontents mt-4"
      style={{
        backgroundColor: "white",
        color: "#1d1d5e",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <Row className="" style={{ height: "" }}>
        {selectedCustomer && (
          <>
            <Col
              lg={3}
              className="d-flex pt-5 ps-4"
              style={{ borderRight: "1px solid #dbdcdc" }}
            >
              <div className=" profile-contents">
                <img
                  className="w-50 rounded-circle"
                  style={{ border: "5px white solid" }}
                  src={Avatar}
                  alt="profile picture"
                ></img>
                <h4 className="mt-4">{selectedCustomer.name}</h4>
                <p> {selectedCustomer.jobPosition}</p>
                <p className="callsection" style={{ marginTop: "20%" }}>
                  <span
                    className="callicon mr-10 text-white"
                    style={{
                      padding: "10px",
                      borderRadius: "28px",
                      backgroundColor: "#0fbb0f",
                    }}
                  >
                    <MdAddIcCall className="" style={{ fontSize: "20px" }} />
                  </span>
                  {selectedCustomer.mobile}
                </p>
                <p className="mailsection" style={{ marginTop: "15%" }}>
                  <span
                    className="mailicon mr-10 text-white"
                    style={{
                      padding: "10px",
                      borderRadius: "28px",
                      backgroundColor: "#808080bf",
                    }}
                  >
                    <MdOutlineMail className="" style={{ fontSize: "20px" }} />
                  </span>
                  {selectedCustomer.email}
                </p>
              </div>
            </Col>
            <Col lg={9} className="ps-4p">
              <div>
                <>
                  <Row
                    className="w-100"
                    style={{ borderBottom: "1px solid #dbdcdc" }}
                  >
                    <h5 className="mb-6 mt-4 mb-6p text-underline">
                      Official Information
                    </h5>
                    <Col className="">
                      <h6>Customer Code</h6>
                      <p>{selectedCustomer.id}</p>
                    </Col>
                    <Col className="">
                      <h6>Customer Category</h6>
                      <p>{selectedCustomer.customerCategory}</p>
                    </Col>
                    <Col className="">
                      <h6>Address</h6>
                      <p>
                        <span>{selectedCustomer.address}</span>,{" "}
                        <span>{selectedCustomer.city}</span>,{" "}
                        <span>{selectedCustomer.state}</span>,{" "}
                        <span>{selectedCustomer.country}</span>,{" "}
                        <span>{selectedCustomer.zipcode}</span>
                      </p>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row
                    className="w-100"
                    style={{ borderBottom: "1px solid #dbdcdc" }}
                  >
                    <h5 className="mb-6 mt-4 mb-6p text-underline">
                      Additional Information
                    </h5>
                    <Col>
                      <h6>Business Type</h6>
                      <p>{selectedCustomer.businessTypeName}</p>
                    </Col>
                    <Col>
                      <h6>VAT Treatment</h6>
                      <p>
                        {selectedCustomer.registered
                          ? "Registered"
                          : "Not Registered"}
                      </p>
                      <p>TRN Number: {selectedCustomer.trnNo}</p>
                    </Col>
                    <Col>
                      <h6>Phone Number</h6>
                      <p>{selectedCustomer.phone}</p>
                      <h6>Website</h6>
                      <p>{selectedCustomer.website}</p>
                    </Col>
                  </Row>
                  <Row>
                    <h5 className="mb-6 mt-4 mb-6p text-underline">
                      Personal Information
                    </h5>
                    <Col>
                      <h6>Log Notes</h6>
                      <p>{selectedCustomer.logNotes}</p>
                    </Col>
                    <Col>
                      <h6>Title</h6>
                      <p>{selectedCustomer.title}</p>
                    </Col>
                  </Row>
                </>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

const mapsToProps = (state) => {
  return {
    customers: state.customers,
  };
};

export default connect(mapsToProps)(CustomerDetails);
