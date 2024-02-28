import React, { useState } from "react";

function Demo() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleChanges = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "mobile") {
      setMobile(e.target.value);
    }
  };

  const handleregister = () => {
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(mobile);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", margin: "25px 500px" }}
    >
      <input
        style={{ marginTop: "25px" }}
        placeholder="name"
        name="name"
        type="text"
        id="name"
        value={name}
        onChange={handleChanges}
      ></input>
      <input
        style={{ marginTop: "25px" }}
        placeholder="email"
        name="email"
        type="text"
        id="email"
        value={email}
        onChange={handleChanges}
      ></input>
      <input
        style={{ marginTop: "25px" }}
        placeholder="password"
        name="password"
        type="password"
        id="password"
        value={password}
        onChange={handleChanges}
      ></input>
      <input
        style={{ marginTop: "25px" }}
        placeholder="mobile"
        name="mobile"
        type="text"
        id="mobile"
        value={mobile}
        onChange={handleChanges}
      ></input>
      <button
        style={{ margin: "25px 6px" }}
        type="submit"
        onClick={handleregister}
      >
        register
      </button>
    </div>
  );
}

export default Demo;
