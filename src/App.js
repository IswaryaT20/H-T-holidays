import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navbar from "./components/Navbar";
import Customer from "./components/customer/Customer";
import './App.css';
import Demo from "./components/Demo";
<<<<<<< HEAD
=======
import Kanban from "./components/customer/Kanban";


>>>>>>> c72a2113ba73d06592a5bee7a851242ca7bb3e81
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />        
        <Route path="/Customer" element={<><Navbar /><Customer /></> }/>
<<<<<<< HEAD
=======
        <Route path="/kanban" element={<Kanban />}/>

>>>>>>> c72a2113ba73d06592a5bee7a851242ca7bb3e81
        <Route path="/Demo" element ={<Demo />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
