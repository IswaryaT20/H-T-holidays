import React, { useState, useEffect } from "react";
import { GoChevronLeft } from "react-icons/go";
// import "./Report.css";
import { Form, Row, Table } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Typeahead } from 'react-bootstrap-typeahead'; 
import axios from 'axios'; // Import Axios
import moment from 'moment'; // Import moment for date manipulation

function Report() {
    const [selectedReportPeriod, setSelectedReportPeriod] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [selectedReportPeriod]);

    const fetchTableData = () => {
        axios.post('http://68.178.161.233:8080/handt/v2/customer/getAllCustomers')
            .then(response => {
                console.log(response);
                setFilteredData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchData = () => {
        fetchTableData();
    };

    const handleRunReport = () => {
        console.log("Selected Report Period:", selectedReportPeriod);
        console.log("Report Data:", filteredData); 
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const originalData = [...filteredData]; // Make a copy of the original data
    
        const filtered = originalData.filter(entry => {
            return Object.values(entry).some(value =>
                (value && value.toString().toLowerCase().includes(searchTerm))
            );
        });
    
        setFilteredData(filtered);
    };

    const handleDateRangeChange = (picker) => {
        setSelectedReportPeriod({
            startDate: picker.startDate.format('dd/MM/yyyy'),
            endDate: picker.endDate.format('dd/MM/yyyy')
        });
    };

    return (
        <div>
            <div className="d-flex ms-5">
                <a href="Report" className="mt-1"> <GoChevronLeft style={{ fontSize: '25px' }} /></a>
                <p style={{ fontSize: '14px', fontWeight: 'bold' }} className="mt-2" >Statement of Accounts - Vendor</p>
            </div>
            <div className="ms-5  me-5 mb-2 " style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                <Row>
                    <Form.Group className="mb-3 d-flex mt-3 ms-5">
                        <Form.Label className="mt-1">Date Range</Form.Label>
                        <DateRangePicker onApply={(event, picker) => handleDateRangeChange(picker)}  dateFormat={"dd/MM/yyyy"}>
                            <Form.Control type="text" placeholder="Select Date Range" className="form-control datepicker ms-2 inputfocus" style={{ width: '16%' }} dateFormat={"dd/MM/yyyy"} />
                        </DateRangePicker>
                        <Form.Label className="d-flex ms-4 me-2 mt-1">Contact</Form.Label>
                            <Form.Control type="text" placeholder="Search" className="form-control ms-2" style={{ width: '25%' }}  onChange={handleSearch} />
                    </Form.Group>
                </Row>
            </div>
            <div className="ms-5 mt-4 me-5" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
               <Table striped bordered hover>
                    <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
                        <tr>
                            <th>Date</th>
                            <th>Voucher Number</th>
                            <th>Category</th>
                            <th>Particulars</th>
                            <th>Description</th>
                            <th>Mode Of Payment</th>
                            <th>Taxable Amount</th>
                            <th>VAT %</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData && filteredData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.invoiceDate}</td>
                                <td>{entry.purchaseOrderId}</td>
                                <td>{entry.supplier}</td>
                                <td>{entry.dueDate}</td>
                                <td>{entry.net}</td>
                                <td>{entry.memo}</td>
                                <td>{entry.referenceNumber}</td>
                                <td>{entry.vat}</td>
                                <td>{entry.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Report;
