import React, { useState } from "react";
import { adminTokenLogin } from "../../axios-services"

const AdminLogin = ({username, password, setUsername, setPassword}) => {

  const handleAdminSubmit = async (event) => {
    event.preventDefault();
    adminTokenLogin(username, password, setToken);
    console.log(results.token);
    setUsername("");
    setPassword("");

    localStorage.removeItem("adminToken");
    localStorage.setItem("adminToken", results.token);
    if (!results.token) {
      alert("You have entered an invalid username or password");
    } else alert("You have successfully Logged in. Welcome!");
  };

  return (
    <Container>
        <Form onSubmit={handleAdminSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <ButtonGroup>
            <LinkContainer to="/register">
                <Button variant="primary">
                    Register
                </Button>
            </LinkContainer>
            <LinkContainer to="/forgot-password">
                <Button variant="primary">
                    Forgot Password
                </Button>
            </LinkContainer>
        </ButtonGroup>
        {error && <p>{error}</p>}
    </Container>
    );
};
export default AdminLogin;