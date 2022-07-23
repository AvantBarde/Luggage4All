import React, { useState } from "react";
import { useParams, useHistory} from 'react-router'
import { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getUser } from "../../db/models/user";
import { updateUser } from "../../db/models/user";

function UserProfile() {
  const { userId } = useParams();
  const [error, setError] = useState("");
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    try {
      const response = getUser(userId);
      if (response) {
        setUsername(response.username);
        setPassword(response.password);
        setEmail(response.email);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setImageURL(response.imageURL);
      } else {
        setError("Error getting user");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(
        userId,
        username,
        password,
        email,
        firstName,
        lastName,
        imageURL
      );
      if (response) {
        history.push("/userProfile");
      } else {
        setError("Error updating user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>${username}'s Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicImageURL">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {error && <p>{error}</p>}
    </Container>
  );
}

export default UserProfile;
