const express = require('express');
const router = express.Router();
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')


// endpoint GET
router.get("/", async (req, res) => {
    const users = await UsersModel.findAll();
    res.status(200).json({
        data: 'kocak banget',
        hasil: users
    })
})

// endpoint POST
router.post("/", async (req, res) => {
    const { nip, nama, password } = req.body
    // eknripsi password
    const encryptedPassword = await bcrypt.hash(password, 10)

    const users = await UsersModel.create({
        nip, nama, password: encryptedPassword
    });
    res.status(200).json({
        data: "buat data"
    })
    console.log(users)
})

// endpoint UPDATE /
router.put("/", async (req, res) => {
    const { nip, nama, password, passwordBaru } = req.body
    const userData = await UsersModel.findOne({
        where: {
            nip: nip
        }
    })

    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)

    const compare = await bcrypt.compare(password, userData.password)
    res.json({ compare })
    // password db === req.password
    if (compare === true) {
        const users = await UsersModel.update({
            nama, password: encryptedPassword
        }, { where: { password: userData.password } })
        res.status(200).json({
            users,
            data: 'hikmal'
        })
    } else {
        res.status(400).json({
            error: "data invalid"
        })
    }
})

router.post('/login', async (req, res) => {
    const { nip, password } = req.body
    const check = await passwordCheck(nip, password)
    try {
        if (check.compare === true) {
            res.status(200).json({
                users: check.userData,
                metadata: "login successs"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "data invalid",
            err: console.log(err)
        })
    }
})


module.exports = router