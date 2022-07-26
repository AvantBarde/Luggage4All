import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Col, ButtonGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
import { tokenAuth } from '../axios-services'

=======
// import { getUser } from '../../db/models'
import { getUser } from "../axios-services/" 
>>>>>>> 7ead7a8d258419caf079f1ac28c7ead997182c50

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await tokenAuth ({username, password})
            if (response) {
                localStorage.setItem('user', JSON.stringify(response))
                history.push('/')
            } else {
                setError('Invalid username or password')
            }
        }
        catch (error) {
            console.error(error)
        }
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
    )
}

export default Login

