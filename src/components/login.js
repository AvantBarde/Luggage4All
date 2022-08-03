import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Col, ButtonGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from "react-router-dom";
import { tokenLogin } from '../axios-services'

function Login({username, password, setPassword, setUsername}) {

    
    
    const [error, setError] = useState('')
    const history = useHistory()
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
            e.preventDefault()
            tokenLogin(username, password, setToken)
            setPassword("");
            setUsername("");
            history.push("./products");
    }

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
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
                    Login
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
    )
}

export default Login

