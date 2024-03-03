import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { GET_ALL_PRODUCTS_API_CALL, GET_ALL_PRODUCTS_RESPONSE, GET_ALL_CUSTOMERS_API_CALL } from "../../utils/Constant";
import "./Invoice.css";
import { useDispatch, useSelector, connect } from "react-redux";
import InvoiceTableBody from "./InvoiceTableBody";


const InvoiceForm = (props) => {

  const dispatch = useDispatch()
  const tableHeader = [
    "Product",
    "Description",
    "Qty",
    "Price",
    "Discount %",
    "VAT %",
    "Amount",
    "Action",
  ];

  const [invoiceData, setInvoiceData] = useState([
    {
      id: 1,
      product: "",
      description: "",
      qty: "",
      price: "",
      discount: "",
      vat: "",
      amount: "",
    },
  ]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [beforeVAT, setBeforeVAT] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showGlobalDiscount, setShowGlobalDiscount] = useState(false);
  const [globalDiscountValue, setGlobalDiscountValue] = useState(0);

  // Use State for Unit Price Excluding
  const [unitExcluding, setUnitExcluding] = useState(false);
  const [excludingSubTotal, setExcludingSubTotal] = useState(0);
  const [excludingTotalVAT, setExcludingTotalVAT] = useState(0);
  const [excludingBeforeVAT, setExcludingBeforeVAT] = useState(0);
  const [excludingTotalAmount, setExcludingTotalAmount] = useState(0);
  const [excludingTotalDiscount, setExcludingTotalDiscount] = useState(0);
  const [rowCount, setRowCount] = useState(1)
  const [vatChecked, setVatChecked] = useState(true)

  //Handlers
  const handleAddRow = () => {
    setRowCount(rowCount + 1)
  }

  const handleDeleteRow = (id) => {
    setInvoiceData(invoiceData.filter((item) => item.id !== id));
  };

  //unit price handlers:
  const handleUnitExcluding = (e) => {
    // setUnitExcluding(!unitExcluding);
    console.log(e.target.checked)
    setVatChecked(e.target.checked)
  };

  const handleInputChange = (id, fieldName, value) => {
    const updatedData = invoiceData.map((item) => {
      if (item.id === id) {
        // Update the field value
        const updatedItem = { ...item, [fieldName]: parseFloat(value) };

        // Calculate amount
        const qty = updatedItem.qty || 1;
        const price = updatedItem.price || 0;
        const discount = updatedItem.discount || 0;
        const vat = updatedItem.vat || 0;

        let amount = qty * price;
        let totalAmount = 0;

        // unit price
        let vatExcludingAmount = 0; // unit VAT
        let totalExcludingAmount = 0; // unit subTotal
        let totalExcludingDiscount = 0; // unit discount
        let totalUnitPrice = 0; //  unit Total

        if (unitExcluding) {
          // Unit Excluding Calculation
          totalExcludingDiscount = amount - (amount * discount) / 100;
          vatExcludingAmount =
            totalExcludingDiscount - totalExcludingDiscount / (1 + vat / 100);
          totalExcludingAmount = totalExcludingDiscount - vatExcludingAmount;
          totalUnitPrice = totalExcludingAmount + vatExcludingAmount;
        }

        // Apply discount
        amount -= (amount * discount) / 100;

        // Apply VAT
        amount += (amount * vat) / 100;

        totalAmount = amount.toFixed(2);

        return {
          ...updatedItem,
          amount: totalAmount,
          totalExcludingDiscount: totalExcludingDiscount.toFixed(2),
          vatExcludingAmount: vatExcludingAmount.toFixed(2),
          totalExcludingAmount: totalExcludingAmount.toFixed(2),
          totalUnitPrice: totalUnitPrice.toFixed(2),
        };
      }
      return item;
    });
    setInvoiceData(updatedData);
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCTS_API_CALL })
    dispatch({ type: GET_ALL_CUSTOMERS_API_CALL })
  }, [])

  console.log(props)
  // Bottom Table Calculation:
  useEffect(() => {
    let newSubTotal = 0;
    let newTotalDiscount = 0;
    let newTotalVAT = 0;

    let newExcludingDiscount = 0;
    let newExcluingSubTotal = 0;
    let newExcludingTotalVAT = 0;

    invoiceData.forEach((item) => {
      const qty = parseFloat(item.qty || 1);
      const amount = parseFloat(item.price || 0);
      const discount = parseFloat(item.discount || 0);
      const vat = parseFloat(item.vat || 0);

      //Stores the value seperatly for getting the values on point!
      const itemTotal = qty * amount;
      const itemDiscount = (itemTotal * discount) / 100;
      const itemVAT = ((itemTotal - itemDiscount) * vat) / 100;

      //Stores Unit Excluding Values:
      const itemExcludingDiscount = (itemTotal * discount) / 100;
      const itemExcludingTotal = itemTotal - itemExcludingDiscount;
      const itemExcludingVAT =
        itemExcludingTotal - itemExcludingTotal / (1 + vat / 100);
      const itemExcludingSubTotal = itemExcludingTotal - itemExcludingVAT;

      newSubTotal += itemTotal;
      newTotalDiscount += itemDiscount;
      newTotalVAT += itemVAT;

      newExcludingDiscount += itemExcludingDiscount;
      newExcluingSubTotal += itemExcludingSubTotal;
      newExcludingTotalVAT += itemExcludingVAT;
    });

    const newBeforeVAT = newSubTotal - newTotalDiscount;
    const newTotalAmount = newBeforeVAT + newTotalVAT;

    const newExcludingBeforeVAT = newExcluingSubTotal;
    const newExcludingTotalAmount =
      newExcludingBeforeVAT + newExcludingTotalVAT;

    setSubTotal(newSubTotal.toFixed(2));
    setTotalDiscount(newTotalDiscount.toFixed(2));
    setTotalVAT(newTotalVAT.toFixed(2));
    setBeforeVAT(newBeforeVAT.toFixed(2));
    setTotalAmount(newTotalAmount.toFixed(2));

    setExcludingTotalDiscount(newExcludingDiscount.toFixed(2));
    setExcludingSubTotal(newExcluingSubTotal.toFixed(2));
    setExcludingBeforeVAT(newExcludingBeforeVAT.toFixed(2));
    setExcludingTotalVAT(newExcludingTotalVAT.toFixed(2));
    setExcludingTotalAmount(newExcludingTotalAmount.toFixed(2));
  }, [invoiceData, unitExcluding]);

  const handleGlobalDiscountClick = () => {
    setShowGlobalDiscount(true);
  };

  const handleGlobalDiscountClose = () => {
    setShowGlobalDiscount(false);
    setGlobalDiscountValue(0);
  };

  const handleGlobalDiscountChange = (e) => {
    const discount = e.target.value.trim(); // Remove NaN if the input is 0
    setGlobalDiscountValue(discount);
  };

  const itemChanges = (allItems) => {

    const findDiscount = allItems.reduce(function (total, item) {
      let findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 0)
      return total + Math.round((item.discount / 100) * findTotalAmount)
    }, 0)

    setTotalDiscount(findDiscount);

    if (vatChecked) {
      const finalAmount = allItems.reduce(function (total, item) {
        let findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 0)
        // let discountedAmount = findTotalAmount - (Math.round((item.discount / 100) * findTotalAmount))

        return total + findTotalAmount;
      }, 0)

      setSubTotal(finalAmount);

    }
    else {

      const finalAmount = allItems.reduce(function (total, item) {
        let findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 0)
        let discountedAmount = findTotalAmount - (Math.round((item.discount / 100) * findTotalAmount))

        return total + findTotalAmount;
      }, 0)

      setSubTotal(finalAmount);
    }

  }

  return (
    <>
      <Container fluid className="mt-1">
        {/* Main Table */}
        <div style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Table hover size="sm" responsive>
            <thead style={{ padding: "0.75rem" }}>
              <tr>
                {tableHeader.map((header, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      backgroundColor: "#1d1d5e",
                      color: "white",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <InvoiceTableBody 
              products={props.productsData.products} 
              invoiceData={props.invoiceData} 
              handleDeleteRow={handleDeleteRow} 
              unitExcluding={unitExcluding} 
              rowCount={rowCount} 
              vatChecked={vatChecked} 
              itemChanges={itemChanges} />
          </Table>
        </div>

        <div className="w-100 d-flex justify-content-end align-items-center" style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Form.Group className="d-flex">
            <Form.Check
              type="checkbox"
              id="custom-checkbox"
              checked={vatChecked}
              onChange={handleUnitExcluding}
            />
            <Form.Label
              className="ms-1"
              style={{ fontSize: 14, fontWeight: "500", color: "#1d1d5e" }}
            >
              Unit price is VAT inclusive
            </Form.Label>
          </Form.Group>
        </div>

        <div className="w-100" style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Button
            onClick={handleAddRow}
            style={{
              backgroundColor: "#1d1d5e",
              borderWidth: 0,
              width: 110,
              fontWeight: "bolder",
            }}
          >
            Add Items
          </Button>
        </div>

        <Row className="mt-3" style={{paddingLeft: 50}}>
          <Col className="col-8">
            <Form.Control
              as="textarea"
              row={4}
              placeholder="Description"
              style={{ width: "400px", height: "100px" }}
            />
          </Col>
          <Col>
            <div className="table-container">
              <Table
                className="w-75"
                style={{ marginLeft: "20%" }}
                hover
                bordered
                responsive
                size="sm"
              >
                <tbody>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Sub-Total
                    </td>
                    <td className="text-end">
                      {!unitExcluding ? subTotal : excludingSubTotal}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Total Discount
                    </td>
                    <td className="text-end">
                      {!unitExcluding ? totalDiscount : excludingTotalDiscount}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Before VAT
                    </td>
                    <td className="text-end">
                      {!unitExcluding ? beforeVAT : excludingBeforeVAT}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start fw-bolder">
                      {!showGlobalDiscount ? (
                        <p
                          className="text-decoration-underline"
                          style={{
                            marginBottom: "2px",
                            color: "#1d1d5e",
                            cursor: "pointer",
                          }}
                          onClick={handleGlobalDiscountClick}
                        >
                          Global Discount
                        </p>
                      ) : (
                        <div className="d-flex justify-content-between">
                          <Form.Control
                            type="number"
                            style={{ width: 170, height: "30px" }}
                            placeholder="Enter Discount"
                            value={globalDiscountValue}
                            onChange={handleGlobalDiscountChange}
                          />
                          <MdOutlineClose
                            onClick={handleGlobalDiscountClose}
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      VAT (AED)
                    </td>
                    <td className="text-end">
                      {!unitExcluding ? totalVAT : excludingTotalVAT}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Total Amount (AED)
                    </td>
                    <td className="text-end">
                      {!unitExcluding
                        ? (
                          parseFloat(totalAmount) - globalDiscountValue
                        ).toFixed(2)
                        : (
                          parseFloat(excludingTotalAmount) -
                          globalDiscountValue
                        ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};


const mapsToProps = (state) => {
  return {
    productsData: state.productsData,
    customers: state.customers
  }
}

export default connect(mapsToProps)(InvoiceForm);
