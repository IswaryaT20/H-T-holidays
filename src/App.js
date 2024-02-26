import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navbar from "./components/Navbar";
import Customer from "./components/customer/Customer";
import './App.css';
import Demo from "./components/Demo";
import Kanban from "./components/customer/Kanban";
import CustomerForm from "./components/customer/CustomerForm";
import Addressform from "./components/customer/Addressform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />        
        <Route path="/Customer" element={<><Navbar /><Customer /></> }/>
        <Route path="/CustomerForm" element={<><Navbar /><CustomerForm /></> }/>
        <Route path="/Addressform" element={<><Navbar /><Addressform /></> }/>
        <Route path="/kanban" element={<Kanban />}/>
        <Route path="/Demo" element={<Demo />} /> {/* Fixed the issue here */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
