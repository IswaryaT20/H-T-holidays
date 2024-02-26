import React, { useEffect, useState } from "react";
import { Card, Stack,Row,Col } from "react-bootstrap";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiKanbanBold } from "react-icons/pi";
import { IoMenu, IoClose } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import profile from "../../Assets/images/profile.jpg";

function Kanban() {
  const [users, setUsers] = useState([]);
  const [kanbanView, setKanbanView] = useState(true); // Track Kanban view state
  const [listView, setListView] = useState(false); // Track List view state

  const apiUsers = () => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
      });
  };

  useEffect(() => {
    apiUsers();
  }, []);

  const handleKanban = () => {
    setKanbanView(true);
    setListView(false);
  };

  const handleTable = () => {
    setListView(true);
    setKanbanView(false);
  };

  return (
    <>
      {/* <h1>Kanban Board</h1> */}
      <Stack direction="horizontal" className="mb-3">
        {/* Other icons... */}
        <span
          className="bg-gray txt-blue f-20 p-1 rounded m-1"
          onClick={handleKanban}
          style={{ cursor: "pointer" }}
        >
          <PiKanbanBold />
        </span>
        <span
          className="bg-gray txt-blue f-20 p-1 rounded m-1"
          onClick={handleTable}
          style={{ cursor: "pointer" }}
        >
          <IoMenu />
        </span>
      </Stack>
      <Stack direction="horizontal" className="flex-1 flex-wrap" id="kanbanview">
       
         <Row>
        
         <Stack direction="vertical" className="flex-1 flex-wrap ">
         {kanbanView && users.length > 0 ? (
           
             users.map((item) => (
            
               <div key={item.id} className="card-box m-3 shadow">
                 
                 <Card
                   style={{ width: "25rem" }}
                   className="p-2 d-flex flex-row"
                 >
                   <Card.Img
                     variant="left"
                     src={item.avatar_url ? item.avatar_url : profile}
                     className="w-30 rounded-circle mt-2 "
                   />

                   <Card.Body>
                     <Card.Title variant="right" className="mt-2">
                       {item.login}
                     </Card.Title>
                     <Card.Title variant="right" className="mt-2">
                       {item.id}
                     </Card.Title>

                     <div
                       variant="top"
                       className="text-end possition-absolute bg-none"
                     >
                       {" "}
                       <IoMdTime />{" "}
                     </div>
                   </Card.Body>

                   <div className="d-flex flex-column">
                     <div variant="bottom" className="text-end ">
                       {" "}
                       <IoClose />{" "}
                     </div>
                   </div>
                 </Card>
               </div>
           
      
          ))
        ) : null}
   </Stack>
       </Row>
        {listView ? (
          <div>
            <h1>List view</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.login}</td>
                    {/* Add more table cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </Stack>
    </>
  );
}

export default Kanban;
