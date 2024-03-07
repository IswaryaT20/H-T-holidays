import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import VendorForm from "./components/vendors/Vendorform";
import SupplierPay from "./components/payment/SupplierPay";
import Customerpay from "./components/payment/Customerpay";
import Payment from "./components/payment/Payment";
import Receipt from "./components/payment/Receipt";
import VendorDetails from "./components/vendors/VendorDetails";

import {
  KEY_IS_LOGGED_IN,
  KEY_USER_ID,
  storeToLocalStorage,
  getFromLocalStorage,
  UPDATE_USER_ID_LOCALLY,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
  GET_LOGGED_USER_DETAILS_API_CALL,
} from "./utils/Constant";

import "./App.css";
import Employee from "./components/employee/Employee";
import CustomerDetails from "./components/customer/CustomerDetails";

function App() {
  const state = useSelector((state) => state);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const isLogged = getFromLocalStorage(KEY_IS_LOGGED_IN);
    if (isLoggedIn === "true" || isLogged) {
      dispatch({
        type: UPDATE_USER_ID_LOCALLY,
        payload: parseInt(getFromLocalStorage(KEY_USER_ID)),
      });
      dispatch({
        type: GET_LOGGED_USER_DETAILS_API_CALL,
        data: { id: getFromLocalStorage(KEY_USER_ID) },
      });
      // dispatch({type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL, data: {id: getFromLocalStorage(KEY_USER_ID)}})
    }
    setIsLoggedIn(getFromLocalStorage(KEY_IS_LOGGED_IN));
  }, []);

  useState(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      // dispatch({ type: GET_LOGGED_USER_DETAILS_API_CALL, data: { id: getFromLocalStorage(KEY_USER_ID) } })
      // dispatch({
      //   type: UPDATE_USER_ID_LOCALLY,
      //   payload: parseInt(getFromLocalStorage(KEY_USER_ID)),
      // });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (state.users.isLoggedIn) {
      storeToLocalStorage(KEY_IS_LOGGED_IN, true);
      storeToLocalStorage(KEY_USER_ID, state.users.loginId);
    }
  }, [state.users.isLoggedIn]);

  return (
    <BrowserRouter>
      {state.users.isLoggedIn || isLoggedIn ? (
        <Routes>
           <Route path="*" element={<Navigate to="/" replace />} />
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
                <CustomerForm />
              </>
            }
          />
          <Route
            path="/customer-details"
            element={
              <>
                <Navbar />
                <CustomerDetails />
              </>
            }
          />

          <Route
            path="/vendor-details"
            element={
              <>
                <Navbar />
                <VendorDetails />
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
            path="/CustomerForm"
            element={
              <>
                <Navbar />
                <CustomerForm />
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
            path="/SupplierPay"
            element={
              <>
                <Navbar />
                <SupplierPay />
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
          <Route
            path="/Payment"
            element={
              <>
                <Navbar />
                <Payment />
              </>
            }
          />

          <Route
            path="/Employee"
            element={
              <>
                <Navbar /> <Employee />
              </>
            }
          />
          {/* <Route
            path="/*"
            element={
              <>
                <Navbar /> <Customer />
              </>
            }
          /> */}
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
