import React from 'react'
import { Button } from 'react-bootstrap'


function LogoutButton() {

    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // remove user token from state and local storage
        localStorage.removeItem('token')
        history.push('/')
    }




  return (
    <Button variant="primary" type="submit" onClick={handleSubmit}>
        Logout
    </Button>
  )
}

export default LogoutButton