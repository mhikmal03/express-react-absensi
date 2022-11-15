import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'



const Edit = () => {

    const [nama, setNama] = useState('')
    const [passwordBaru, setPasswordBaru] = useState('')
    const [password, setPassword] = useState('')

    const handleUpdate = () => {
        const reqData = {
            nip: localStorage.getItem("nip"),
            passwordBaru: passwordBaru,
            password: password,
            nama: nama
        }
        axios({
            method: "PUT",
            url: "http://localhost:5050/user",
            data: reqData
        }).then((res) => {
            alert("anda berhasil update")
        })
    }



    return (
        <>
            <Container fluid>
                <Form>
                    <Form.Group>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                            onChange={(e) => setNama(e.target.value)}
                            placeholder='Masukkan nama'
                            defaultValue={localStorage.getItem("nama")}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password Baru</Form.Label>
                        <Form.Control
                            onChange={(e) => setPasswordBaru(e.target.value)}
                            type='password' placeholder='password baru' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password Lama</Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            type='password' placeholder='Password lama' />
                    </Form.Group>
                    <Button
                        onClick={handleUpdate}
                        className='mt-3'>Update Profile</Button>
                </Form>
            </Container>
        </>
    )
}
export default Edit