import React, { useEffect, useState } from "react";

const Demo = () => {
  const [users, setusers] = useState();

  const apiusers = () =>
    fetch("https://api.github.com/users")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        setusers(result);
        console.log(result);
      });

  // use effect for apiusers
  useEffect(() => {
    apiusers();
  }, []);
  return (
    <div>
      {users.map((item) => (
        <div>
          {item.id} {item.login}
        </div>
      ))}
    </div>
  );
};

export default Demo;
