import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";

const InvoiceTableBody = (props) => {

    const [invoiceData, setInvoiceData] = useState([])

    useEffect(() => {
      if (invoiceData.length != props.rowCount) {
        setInvoiceData([...invoiceData, {id: 0, product: '', description: '', qty: '', price: '', discount: '', vat: '', amount: ''}])
      }
    }, [props.rowCount])


    const handleItemSelect = (id, index) => {
      setInvoiceData(invoiceData.map((item, itemIndex) => {
        return index === itemIndex ? {qty: item.qty, id: id, price: item. price, description: item.description, discount: item.discount, vat: item.vat} : item
      }));
    }

    const handleQuantityChange = (quantity, index) => {
      const updateQuantity = invoiceData.map((item, itemIndex) => {
        return index === itemIndex ? {qty: quantity, id: item.id, price: item. price, description: item.description, discount: item.discount, vat: item.vat} : item
      })
        setInvoiceData(updateQuantity);
        props.itemChanges(updateQuantity);
    }

    const handleDescription = (description, index) => {
      setInvoiceData(invoiceData.map((item, itemIndex) => {
        return index === itemIndex ? {qty: item.qty, id: item.id, description: description, price: item.price, discount: item.discount, vat: item.vat} : item
      }));

    }

    const handlePriceChange = (price, index) => {
      const updatePriceChange = invoiceData.map((item, itemIndex) => {
        return index === itemIndex ? {qty: item.qty, id: item.id, description: item.description, price: price, discount: item.discount, vat: item.vat} : item
      })
      props.itemChanges(updatePriceChange)
      setInvoiceData(updatePriceChange);
    }

    const handleDiscountChange = (discount, index) => {
      const updateDiscountArray = invoiceData.map((item, itemIndex) => {
        return index === itemIndex ? {qty: item.qty, id: item.id, description: item.description, price: item.price, discount: discount, vat: item.vat} : item
      })
      props.itemChanges(updateDiscountArray)
      setInvoiceData(updateDiscountArray);
    }

    const handleVatChange = (vat, index) => {
      const updateVatArray = invoiceData.map((item, itemIndex) => {
        return index === itemIndex ? {qty: item.qty, id: item.id, description: item.description, price: item.price, discount: item.discount, vat: vat} : item
      })
      props.itemChanges(updateVatArray)
      setInvoiceData(updateVatArray);
    }

    const renderTotalAmount = (item) => {
      // {props.vatChecked ? (
      //   item.totalUnitPrice
      // ) : item.price ? (
      //   <span>{item.amount}</span>
      // ) : (
      //   <span>-</span>
      // )}

      let findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 0)
      let discountedAmount = findTotalAmount - (Math.round((item.discount/100) * findTotalAmount))

      let vatIncludedPrice = discountedAmount + ((Math.round((item.vat/100) * discountedAmount)))
      return <span>{props.vatChecked ? discountedAmount : vatIncludedPrice}</span>
    }

    const handleInputChange = (id, fieldName, value) => {
        const updatedData = props.invoiceData.map((item) => {
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
    
            if (props.unitExcluding) {
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
        // setInvoiceData(updatedData);
      };

    return <tbody> {invoiceData?.map((item, index) => {
      console.log(item);
      return <tr key={item.id}>
        <td className="table-td">
          <Form.Select
            className="inputfocus rounded-0"
            onChange={e => {handleItemSelect(e.target.value, index)}}
            style={{ width: 170, height: 30, fontSize: 14 }}
            defaultChecked={0}
            value={item.id}
          >
            <option>Select Product</option>
            {
              props?.products?.map(product => {
                return <option key={product.id} value={product.id}>{product.productName}</option>
              })
            }
          </Form.Select>
        </td>
        <td className="table-td">
          <Form.Control
            className="inputfocus border-0 rounded-0"
            as="textarea"
            placeholder="Description"
            onChange={(e) => handleDescription(e.target.value, index)}
            rows={1}
            style={{ height: 40 }}
          />
        </td>
        <td className="table-td">
          <Form.Control
            type="number"
            className="inputfocus border-0 rounded-0"
            placeholder="Quantity"
            style={{ width: 170, height: 30, fontSize: 14 }}
            value={isNaN(item.qty) ? "" : item.qty}
            onChange={(e) => handleQuantityChange(e.target.value, index)
              // handleInputChange(item.id, "qty", e.target.value)
            }
          />
        </td>
        <td className="table-td">
          <Form.Control
            type="number"
            className="inputfocus border-0 rounded-0"
            placeholder="Price (AED)"
            style={{ width: 170, height: 30, fontSize: 14 }}
            value={isNaN(item.price) ? "" : item.price}
            onChange={(e) =>
              handlePriceChange(e.target.value, index)
            }
          />
        </td>
        <td className="table-td">
          <Form.Control
            type="number"
            className="inputfocus border-0 rounded-0"
            placeholder="Dicount"
            style={{ width: 170, height: 30, fontSize: 14 }}
            value={isNaN(item.discount) ? "" : item.discount}
            onChange={(e) =>
              handleDiscountChange(e.target.value, index)
            }
          />
        </td>
        <td className="table-td">
          <Form.Control
            type="number"
            className="inputfocus border-0 rounded-0"
            placeholder="VAT"
            style={{ width: 170, height: 30, fontSize: 14 }}
            value={isNaN(item.vat) ? "" : item.vat}
            onChange={(e) =>
              handleVatChange(e.target.value, index)
            }
          />
        </td>
        <td className="table-td">
          {renderTotalAmount(item)}
          
        </td>
        <td className="table-td">
          <FaTrashCan
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => props.handleDeleteRow(item.id)}
          />
        </td>
      </tr>
})}
  </tbody>
}


export default InvoiceTableBody;