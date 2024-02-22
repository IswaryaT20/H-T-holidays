import React, { useEffect, useState } from "react";

function Demo() {
  const [user, setUsers] = useState();

  const apiUsers = () =>
    fetch("https://dummyjson.com/users")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        setUsers(result);
        console.log(result);
      }).catch((error) =>{
        console.log(error) });

  // useEffect for apiUsers
  useEffect(() => {
    apiUsers();
  }, []);

  return (
    <div>
      {user ?.users.map((item) => (
        <div key={item.id}>{item.id}
        <div>{item.firstName}</div>
        </div>
      ))}
    </div>
  );
}

export default Demo;
