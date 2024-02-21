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
                {users.map((item) => (
                    <div key={item.id} className="card-box">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.avatar_url} />
                            <Card.Body>
                                <Card.Title>{item.login}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Stack>
        </>
    )
}

export default Kanban;
