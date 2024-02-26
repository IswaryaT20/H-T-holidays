import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

const PurchaseForm = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [beforeVAT, setBeforeVAT] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showGlobalDiscount, setShowGlobalDiscount] = useState(false);
  const [globalDiscountValue, setGlobalDiscountValue] = useState(0);

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

  const [puchaseData, setpuchaseData] = useState([
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

  //Handlers
  const handleAddRow = () => {
    setpuchaseData([
      ...puchaseData,
      {
        id: puchaseData.length + 1,
        product: "",
        description: "",
        qty: "",
        price: "",
        discount: "",
        vat: "",
        amount: "",
      },
    ]);
  };
  const handleDeleteRow = (id) => {
    setpuchaseData(puchaseData.filter((item) => item.id !== id));
  };

  const handleInputChange = (id, fieldName, value) => {
    const updatedData = puchaseData.map((item) => {
      if (item.id === id) {
        let amount = 0;
        let totalAmount = 0;

        // Convert value(string) to number
        const numericValue = parseFloat(value);

        // Update the field value
        const updatedItem = { ...item, [fieldName]: numericValue };

        // Calculate amount
        const qty = updatedItem.qty || 1;
        const price = updatedItem.price || 0;
        const discount = updatedItem.discount || 0;
        const vat = updatedItem.vat || 0;

        amount = qty * price; // Calculate amount without discount and VAT

        // Apply discount
        amount -= (amount * discount) / 100;

        // Apply VAT
        amount += (amount * vat) / 100;

        totalAmount = amount.toFixed(2); // Round to 2 decimal places

        return { ...updatedItem, amount: totalAmount };
      }
      return item;
    });
    setpuchaseData(updatedData);
  };

  // Bottom Table Calculation:
  useEffect(() => {
    let newSubTotal = 0;
    let newTotalDiscount = 0;
    let newTotalVAT = 0;

    puchaseData.forEach((item) => {
      const qty = parseFloat(item.qty || 1);
      const amount = parseFloat(item.price || 0);
      const discount = parseFloat(item.discount || 0);
      const vat = parseFloat(item.vat || 0);

      //Stores the value seperatly for getting the values on point!
      const itemTotal = qty * amount;
      const itemDiscount = (itemTotal * discount) / 100;
      const itemVAT = ((itemTotal - itemDiscount) * vat) / 100;

      newSubTotal += itemTotal;
      newTotalDiscount += itemDiscount;
      newTotalVAT += itemVAT;
    });

    const newBeforeVAT = newSubTotal - newTotalDiscount;
    const newTotalAmount = newBeforeVAT + newTotalVAT;

    setSubTotal(newSubTotal.toFixed(2));
    setTotalDiscount(newTotalDiscount.toFixed(2));
    setTotalVAT(newTotalVAT.toFixed(2));
    setBeforeVAT(newBeforeVAT.toFixed(2));
    setTotalAmount(newTotalAmount.toFixed(2));
  }, [puchaseData]);

  const handleGlobalDiscountClick = () => {
    setShowGlobalDiscount(true);
  };

  const handleGlobalDiscountClose = () => {
    setShowGlobalDiscount(false);
  };

  const handleGlobalDiscountChange = (e) => {
    const discount = e.target.value.trim(); // Remove NaN if the input is 0
    setGlobalDiscountValue(discount);
  };

  const totalAmountWithGlobalDiscount = (
    parseFloat(totalAmount) - globalDiscountValue
  ).toFixed(2);

  return (
    <>
      <Container fluid className="mt-1">
        <div className="m-4">
          <Table hover>
            <thead style={{ padding: "0.75rem" }}>
              <tr>
                {tableHeader.map((header, index) => (
                  <th
                    className="f-14"
                    key={index}
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      backgroundColor: "#25316f",
                      color: "white",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {puchaseData.map((item) => (
                <tr key={item.id} className="w-100 h-30">
                  <td className="table-td f-14">
                    <Form.Select
                      className="rounded inputfocus"
                      style={{ width: 175 }}
                    >
                      <option></option>
                    </Form.Select>
                  </td>
                  <td className="table-td">
                    <Form.Control
                      className="border-0 rounded-0 f-14 inputfocus"
                      as="textarea"
                      rows={1}
                      style={{ height: 50 }}
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="rounded-0 f-14 inputfocus"
                      placeholder="Quantity"
                      value={item.qty}
                      onChange={(e) =>
                        handleInputChange(item.id, "qty", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="rounded-0 f-14 inputfocus"
                      placeholder="Price (AED)"
                      value={item.price}
                      onChange={(e) =>
                        handleInputChange(item.id, "price", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="rounded-0 f-14 inputfocus"
                      placeholder="Dicount"
                      value={item.discount}
                      onChange={(e) =>
                        handleInputChange(item.id, "discount", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="rounded-0 f-14 inputfocus"
                      placeholder="VAT"
                      value={item.vat}
                      onChange={(e) =>
                        handleInputChange(item.id, "vat", e.target.value)
                      }
                    />
                  </td>
                  <td className="table-td">
                    {item.price ? <span>{item.amount}</span> : <span>-</span>}
                  </td>
                  <td className="table-td f-14">
                    <FaTrashCan
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteRow(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="ms-3">
          <Button
            onClick={handleAddRow}
            className="f-14"
            style={{
              backgroundColor: "#25316f",
              margin: 10,
              borderWidth: 0,
              height: "h-max",
              width: "w-max",
              fontWeight: "bolder",
            }}
          >
            + Add Items
          </Button>
        </div>

        <Row className="p-2 ms-1 me-1 w-100 ">
          <Col xs={8} md={8} lg={8} xxl={8} className="">
            <Form>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  row={4}
                  placeholder="Momo optional"
                  className="w-60 inputfocus"
                  style={{ height: "170px" }}
                />
              </Form.Group>
            </Form>
          </Col>

          <Col
            xs={4}
            md={4}
            lg={4}
            xxl={4}
            className="text-end d-flex justify-content-end "
          >
            <div className="w-70 me-2">
              <Table hover bordered className="text-end me-5 border border-3">
                <tbody>
                  <tr className="w-max">
                    <td
                      className="fw-bolder f-14 text-start w-max"
                      style={{ color: "#25316f" }}
                    >
                      Sub-Total
                    </td>
                    <td className="text-end w-30 f-14">{subTotal}</td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder f-14 text-start"
                      style={{ color: "#25316f" }}
                    >
                      Total Discount
                    </td>
                    <td className="text-end f-14">{totalDiscount}</td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder f-14 text-start"
                      style={{ color: "#25316f" }}
                    >
                      Before VAT
                    </td>
                    <td className="text-end f-14 ">{beforeVAT}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {!showGlobalDiscount ? (
                        <Button
                          className="btn-globalDiscount rounded-1 f-14"
                          onClick={handleGlobalDiscountClick}
                        >
                          Global Discount
                        </Button>
                      ) : (
                        <div className="d-flex justify-content-between inputfocus">
                          <Form.Control
                            type="number"
                            style={{ width: 175 }}
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
                      className="fw-bolder f-14 text-start"
                      style={{ color: "#25316f" }}
                    >
                      VAT (AED)
                    </td>
                    <td className="text-end f-14">{totalVAT}</td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder f-16 text-start"
                      style={{ color: "#25316f" }}
                    >
                      Total Amount (AED)
                    </td>
                    <td className="text-end f-16">
                      {totalAmountWithGlobalDiscount}
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

export default PurchaseForm;
