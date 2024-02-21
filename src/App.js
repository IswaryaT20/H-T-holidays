import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navbar from "./components/Navbar";
import Customer from "./components/customer/Customer";
import './App.css';
import Demo from "./components/Demo";
import Kanban from "./components/customer/Kanban";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />        
        <Route path="/Customer" element={<><Navbar /><Customer /></> }/>
        <Route path="/kanban" element={<Kanban />}/>

        <Route path="/Demo" element ={<Demo />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
