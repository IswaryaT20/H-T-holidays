import React, { useState } from "react";

function Demo() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setmessage] = useState('');

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
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(response => {

      if (response !== null && response.status === 'Failed' ) {
        setmessage('Response from the server: ' + response.errorMessage);

        setTimeout(() => {
          
        }, timeout);
      }  else {
        setmessage('Unknown error occurred');
      }
      console.log(response);
    })
    .catch(error => {
      setmessage('Error registering user: ' + error.message);
    });
  };
  
  return (
    <>
      <div id="message" style={{ border: "2px solid red", height: "52px", width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>{message}</div>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '25px 500px' }}>
        <input style={{ marginTop: '25px' }} placeholder="name" name='name' type="text" id="name" value={name} onChange={handleChanges}></input>
        <input style={{ marginTop: '25px' }} placeholder="email" name='email' type="text" id="email" value={email} onChange={handleChanges}></input>
        <input style={{ marginTop: '25px' }} placeholder="password" name='password' type="password" id="password" value={password} onChange={handleChanges}></input>
        <input style={{ marginTop: '25px' }} placeholder="mobile" name='mobile' type="text" id="mobile" value={mobile} onChange={handleChanges}></input>
        <button style={{ margin: "25px 6px" }} type="submit" onClick={handleregister}>register</button>
      </div>
    </>
  );
}

export default Demo;
