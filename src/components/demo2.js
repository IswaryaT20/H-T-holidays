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
<Row className='mt-2 d-flex justify-content-evenly w-100'>
        <Col lg={6} xxl={6} className='col-5 p-1'  >
          <div className='p-2 shadow border-0 rounded-3' style={{ background: '#87ceeb2e', height: 180 }}>
            <h6 className='pt-3 f-20' style={{ marginLeft: '20px', marginBottom: '20px' }}>Invoice Summary</h6>
            <div style={{ display: 'flex' }} >
              <p style={{ marginBottom: '10 px', marginLeft: '3%', color: 'grey', fontSize: '14px', fontWeight: '500' }}>Total Amount<br /><span style={{ color: 'black' }}>AED 0.00</span></p>
              <p style={{ marginBottom: '10px', marginLeft: '19%', color: 'red', fontSize: '14px', fontWeight: '500' }}>Unpaid<br /><span style={{ color: 'black' }}>AED 0.00</span></p>
              <p style={{ marginBottom: '10px', marginLeft: '26%', color: 'blue', fontSize: '14px', fontWeight: '500' }}>Paid<br /><span style={{ color: 'black' }}>AED 0.00</span></p>
            </div>
          </div>
        </Col>

        <Col lg={6} xxl={6} className='col-5 p-1'  >
          <div className='p-2 shadow  border-0 rounded-3' style={{ background: '#87ceeb2e', height: 180 }}>
            <h6 className='pt-3 f-20 ' style={{ marginLeft: '20px', marginBottom: '20px' }}>Invoice Summary</h6>
            <div style={{ display: 'flex' }} >
              <p style={{ marginBottom: '10px', marginLeft: '3%', color: 'grey', fontSize: '14px', fontWeight: '500' }}>Total Amount : <span style={{ color: 'black' }}>AED 0.00</span></p>
              <p style={{ marginLeft: '51%', color: 'red', fontSize: '14px', fontWeight: '500' }}>Unpaid : <span style={{ color: 'black' }}>AED 0.00</span></p>
            </div>
            <ProgressBar className='progress' now={60} style={{ width: '93%', marginLeft: '21px' }} />
            <div className='d-flex'>
              <div class="square"></div>
              <p style={{ marginLeft: '-7%', fontSize: '14px', marginTop: '2px', fontWeight: '500' }}>Paid<br />0.00</p>
              <div class="square" style={{ marginLeft: '15%', background: '#d2d4d7' }}></div>
              <p style={{ marginLeft: '-6%', fontSize: '14px', fontWeight: '500' }}>Unpaid<br />0.00</p>
            </div>

          </div>
        </Col>
      <