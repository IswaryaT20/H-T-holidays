import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navbar from "./components/Navbar";
import Customer from "./components/customer/Customer";
import "./App.css";
import CustomerForm from "./components/customer/CustomerForm";
import Vendor from "./components/vendors/Vendors";
import Expense from "./components/expense/Expense";
import NewExpense from "./components/expense/NewExpense";
import Product from "./components/product/Product";
import Purchase from "./components/purchase/Index";
import { UseSelector, useSelector } from "react-redux";

function App() {

  const state = useSelector(state => state)

  console.log(state)

  return (
    <BrowserRouter>

    {
      state.users.isLoggedIn ?  <Routes>
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
        path="/Index"
        element={
          <>
            <Navbar />
            <Purchase />
          </>
        }
      />
    </Routes> : <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    }
     
    </BrowserRouter>
  );
}

export default App;
