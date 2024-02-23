import React, { useState } from "react";

function Demo() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleChanges = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);

    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
    if (e.target.name === 'mobile') {
      setMobile(e.target.value);
    }
  };
  const handleregister = () => {
    const args = {
      name: name,
      password: password,
      mobile: mobile,
      email: email
    };
  
    const urlString = new URLSearchParams(args);
    
    fetch('http://68.178.161.233:8080/handt/v2/account/register?' + urlString , {
      method: 'POST',
     
           
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  };
  


return (
  <div style={{ display: 'flex', flexDirection: 'column', margin: '25px 500px' }}>
    <input style={{ marginTop: '25px' }} placeholder="name" name='name' type="text" id="name" onChange={e => handleChanges(e)}></input>
    <input style={{ marginTop: '25px' }} placeholder="email" name='email' type="text" id="email" onChange={e => handleChanges(e)}></input>
    <input style={{ marginTop: '25px' }} placeholder="password" name='password' type="password" id="password" onChange={e => handleChanges(e)}></input>
    <input style={{ marginTop: '25px' }} placeholder="mobile" name='mobile' type="text" id="mobile" onChange={e => handleChanges(e)}></input>
    <button style={{ margin: "25px 6px" }} type="submit" onClick={handleregister}>register</button>
  </div>
);
}

export default Demo;