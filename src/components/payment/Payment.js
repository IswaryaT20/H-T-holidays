import React, { useEffect, useState } from "react";
import { Container, FormSelect, Pagination, Table } from "react-bootstrap";
import axios from "axios";

function Receipt() {
  const [getcustomer, setgetcustomer] = useState([]);
  const [entitiesPerPage, setEntitiesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .post("http://68.178.161.233:8080/handt/v2/customer/getAllCustomers")
      .then((response) => {
        console.log(response.data.data);
        setgetcustomer(response.data.data);
        const totalItems = response.data.data.length;
        const calculatedTotalPages = Math.ceil(totalItems / entitiesPerPage);
        setTotalPages(calculatedTotalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [entitiesPerPage]);

  const handlePageChange = (page, sizePerPageOption) => {
    setCurrentPage(page);
    setEntitiesPerPage(sizePerPageOption);
  };

  const pagOptions = {
    custom: true,
    totalSize: getcustomer.length,
    sizePerPage: entitiesPerPage,
    paginationSize: 'Next',
    pageStartIndex: 'Prev',
    paginationTotalRenderer: (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span>
    ),
  };

  const startIdx = (currentPage - 1) * entitiesPerPage;
  const endIdx = currentPage * entitiesPerPage;

  const entitiesToDisplay = getcustomer.slice(startIdx, endIdx);

  const paginationItems = [];

  if (totalPages <= 5) {
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number, entitiesPerPage)}
        >
          {number}
        </Pagination.Item>
      );
    }
  } else {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    paginationItems.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1, entitiesPerPage)}
        disabled={currentPage === 1}
      />
    );

    for (let number = startPage; number <= endPage; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number, entitiesPerPage)}
        >
          {number}
        </Pagination.Item>
      );
    }

    paginationItems.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1, entitiesPerPage)}
        disabled={currentPage === totalPages}
      />
    );
  }

  return (
    <div>
      <Container fluid>
        <div className="text-end mt-2 d-flex">
          Show entities
          <FormSelect
            className="form-select ms-2 w-10 mb-3"
            onChange={(e) => setEntitiesPerPage(Number(e.target.value))}
            value={entitiesPerPage}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </FormSelect>
        </div>
        <div
          className="border border-3"
          style={{
            height: 350,
            width: "100%",
            overflowY: "scroll",
          }}
        >
          <Table className="table" variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>They Owe You</th>
                <th>You Owe Them</th>
              </tr>
            </thead>
            <tbody>
              {entitiesToDisplay.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.name}</td>
                  <td>{item.theyOweYou}</td>
                  <td>{item.youOweThem}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center ms-auto text-center mt-3 ">
          <Pagination size="md">{paginationItems}</Pagination>
        </div>
      </Container>
    </div>
  );
}

export default Receipt;
