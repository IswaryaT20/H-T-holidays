import React, { useEffect, useState } from "react";
import { Card, Stack } from 'react-bootstrap';

function Kanban() {
    const [users, setUsers] = useState([]);

    const apiusers = () => {
        fetch('https://api.github.com/users')
            .then(response => response.json())
            .then((result) => {
                setUsers(result);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    useEffect(() => {
        apiusers();
    }, []);

    return (
        <>
            <h1>Kanban Board</h1>
            <Stack direction="horizontal">
                {users.length > 0 ? (
                    users.map((item) => (
                        <div key={item.id} className="card-box m-3">
                            <Card style={{ width: '20rem' }} className="p-2">
                                <Card.Img variant="left" src={item.avatar_url} className="rounded-circle" fluid />
                                <Card.Body>
                                    <Card.Title>{item.login}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div>No users to display</div>
                )}
            </Stack>
        </>
    )
}
// item.avatar_url
export default Kanban;
