import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap'


function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await createUser ({username, password})
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

export default Register