import React, { useState } from 'react'
// styles
import ReactTypingEffect from 'react-typing-effect'
import '../components/styles/styles.css'
import { Container, Form, Button } from "react-bootstrap"
// axios
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
    const navigate = useNavigate()

    // nip
    const [NIP, setNIP] = useState('')
    const handleNIP = (inputNIP) => {
        setNIP(inputNIP)
    }
    // nama
    const [nama, setNama] = useState('')
    const handleNama = (inputNama) => {
        setNama(inputNama)
    }
    // password
    const [password, setPassword] = useState('')
    const handlePassword = (inputPassword) => {
        setPassword(inputPassword)
    }

    // handleSubmit + sendData
    const userRegister = () => {
        console.log('user login ready')
        const reqData = {
            nip: NIP,
            nama: nama,
            password: password
        }
        axios({
            method: "POST",
            url: "http://localhost:5050/user",
            data: reqData
        }).then((res) => {
            console.log('test endpoint: ', res.data)
        })
    }
    return (
        <>
            <div>
                <div className='container'>
                    <ReactTypingEffect
                        text={["bismillah", "kocak"]}
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
                            placeholder='Masukkan NIP anda'
                            onChange={(e) => handleNIP(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Masukkan nama anda'
                            onChange={(e) => handleNama(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='*******'
                            onChange={(e) => handlePassword(e.target.value)} />
                    </Form.Group>
                    <Button
                        variant='dark'
                        className="mt-4 w-100"
                        onClick={userRegister}>
                            Register
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Register