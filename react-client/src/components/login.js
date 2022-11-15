import React, { useState } from 'react'
// style
import ReactTypingEffect from 'react-typing-effect'
import '../components/styles/styles.css'
import { Container, Form, Button } from "react-bootstrap"

// axios
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate()

    // nip
    const [NIP, setNIP] = useState('')
    const handleNIP = (inputNIP) => {
        setNIP(inputNIP)
    }
    // password
    const [password, setPassword] = useState('')
    const handlePassword = (inputPassword) => {
        setPassword(inputPassword)
    }

    // handleSubmit + sendData
    const userLogin = () => {
        console.log('user login ready')
        const reqData = {
            nip: NIP,
            password: password
        }
        axios({
            method: "POST",
            url: "http://localhost:5050/user/login",
            data: reqData
        }).then((res) => {
            localStorage.setItem("nip", res.data.users.nip)
            localStorage.setItem("nama", res.data.users.nama)
            navigate('/dashboard')
            console.log('test endpoint: ', res.data)
        })
    }
    return (
        <>
            <div>
                <div className='container'>
                    <ReactTypingEffect
                        text={[props.title, "kocak"]}
                        speed={100}
                        eraseDelay={500}
                        eraseSpeed={50}
                        typingDelay={50}
                    />
                </div>
                <Form className="w-50 mx-auto">
                    <Form.Group>
                        <Form.Label>NIP</Form.Label>
                        <Form.Control
                            type='number'
                            onChange={(e) => handleNIP(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='*******'
                            onChange={(e) => handlePassword(e.target.value)} />
                    </Form.Group>
                    <Button
                        className="mt-4 w-100"
                        onClick={userLogin}>
                        Login
                    </Button>
                    <Button
                        variant='dark'
                        className="mt-2 w-100"
                        onClick={() => navigate('/register')}>
                        Register
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Login