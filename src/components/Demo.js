import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, FormControl, Table, Modal, Form, FloatingLabel } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCloudArrowDown } from "react-icons/fa6";

const Demo = () => {

  //use states
  const [showModal, setShowModal] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [search, setSearch] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //Handlers
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  //Dummy
  const T_head = ["Date", "Product_Id", "Product_type", "Transaction_Type", "Product_Name", "Description"];

  const [demovalue , setdemovalue] = useState([])

const apiurs =() =>{
  fetch('https://api.github.com/users').then((response) =>{
    response.json(console.log(response));
  })
  .then((result) =>{
   console.log(result);
    setdemovalue(result);
  })

}
useEffect (() =>{
  apiurs();
},[])

 


  return (
   
      <div className='d-flex' fluid>
        <Table striped hover>
          <thead>
            <tr>
      <th>hiiiii</th>
            </tr>
          </thead>
          <tbody>
          {demovalue.length > 0 ? (
                  demovalue.map((item) => (
                    <tr key={item.id}>
                      <td> {item.login} </td>
                      <td> {item.type} </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">No data available.</tr>
                )}
          </tbody>
        </Table>
      </div>

  );
}

export default Demo;