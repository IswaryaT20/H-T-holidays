import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navbar from "./components/Navbar";
import Customer from "./components/customer/Customer";
import CustomerForm from "./components/customer/CustomerForm";
import Vendor from "./components/vendors/Vendors";
import Product from "./components/product/Product";
import Invoice from "./components/invoice/Invoice";
import Purchase from "./components/purchase/Purchase";
import NewPurchase from "./components/purchase/Index";
import NewInvoice from "./components/invoice/NewInvoice";
import Expense from "./components/expense/Expense";
import NewExpense from "./components/expense/NewExpense";
import { useSelector } from "react-redux";
import VendorForm from "./components/vendors/Vendorform";
import Receipt from "./components/payment/SupplierPay"

import "./App.css";
import Customerpay from "./components/payment/Customerpay";

function App() {
  const state = useSelector((state) => state);
  console.log(state);

  return (
    <BrowserRouter>
      {state.users.isLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Customer />
              </>
            }
          />
          <Route
            path="/CustomerForm"
            element={
              <>
                <Navbar />
                <CustomerForm type={1} />
              </>
            }
          />
          <Route
            path="/Vendor"
            element={
              <>
                <Navbar />
                <Vendor />
              </>
            }
          />
          <Route
            path="/Expense"
            element={
              <>
                <Navbar />
                <Expense />
              </>
            }
          />
          <Route
            path="/NewExpense"
            element={
              <>
                <Navbar />
                <NewExpense />
              </>
            }
          />
          <Route
            path="/Vendor"
            element={
              <>
                <Navbar />
                <Vendor />
              </>
            }
          />
          <Route
            path="/Product"
            element={
              <>
                <Navbar />
                <Product />
              </>
            }
          />
          <Route
            path="/Purchase"
            element={
              <>
                <Navbar />
                <Purchase />
              </>
            }
          />

          <Route
            path="/Purchaseorder"
            element={
              <>
                <Navbar />
                <NewPurchase />
              </>
            }
          />

          <Route
            path="/Invoice"
            element={
              <>
                <Navbar /> <Invoice />
              </>
            }
          />

          <Route
            path="/NewInvoice"
            element={
              <>
                <Navbar /> <NewInvoice />{" "}
              </>
            }
          />
          <Route
            path="/VendorForm"
            element={
              <>
                <Navbar /> <VendorForm />
              </>
            }
          />        
          <Route
            path="/Customerpay"
            element={
              <>
                <Navbar />
                <Customerpay />
              </>
            }
          />
          <Route
            path="/Receipt"
            element={
              <>
                <Navbar />
                <Receipt />
              </>
            }
          />
        </Routes>
     
      
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
