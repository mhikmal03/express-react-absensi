import React, { useEffect, useState } from 'react'
import { Badge, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import edit from './edit'

const Dashboard = () => {
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState([])
    const [absenNofif, setAbsenNotif] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('nama') && !localStorage.getItem('nip')) {
            console.log('user blm login')
            navigate("/login")
        }
        axios.get('http://localhost:5050/absensi')
            .then((res) => {
                console.log('berhasil')
                setDataUser(res.data.absensi)
            })
    }, [absenNofif])

    const handleLogout = () => {
        console.log('berhasil log out')
        localStorage.clear()
        window.location.reload()
    }

    const kehadiran = (params) => {
        // params = in & out
        const reqData = {
            nip: localStorage.getItem("nip")
        }
        // axios.postDataAbsensi
        axios({
            method: "POST",
            url: `http://localhost:5050/absensi/${params}`,
            data: reqData
        }).then((res) => {
            setAbsenNotif(!absenNofif)
            console.log(dataUser)

        })
    }


    return (
        <Container fluid>
            <main className="col-md-9 col-lg-12 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                            <span data-feather="calendar" className="align-text-bottom"></span>
                            This week
                        </button>
                    </div>
                </div>

                <h2>Halo User</h2>
                <div>
                    <p>Hello {localStorage.getItem("nama")}!</p>
                    <p>nip {localStorage.getItem("nip")} </p>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <Button
                        onClick={handleLogout}
                        variant='danger'>
                        Logout
                    </Button>
                    <Button onClick={() => navigate('/edit')}>
                        Edit
                    </Button>
                </div>

                {/* tabel */}
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">NIP</th>
                                <th scope="col">STATUS</th>
                                <th scope="col">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataUser.map((item, index) => {
                                const { users_nip, status, createdAt } = item
                                return (
                                    <>
                                        <tr key={index.id}>
                                            <td>{users_nip}</td>
                                            <td>{status}</td>
                                            <td>{createdAt}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='d-flex gap-3 mt-2 justify-content-center'>
                    <Badge onClick={() => kehadiran("checkin")} pill bg="primary" style={{ cursor: "pointer", padding: '15px' }}>
                        Check-in
                    </Badge>
                    <Badge onClick={() => kehadiran("checkout")} pill bg="danger" style={{ cursor: "pointer", padding: '15px' }}>
                        Check-out
                    </Badge>


                </div>
            </main>
        </Container>
    )
}

export default Dashboard