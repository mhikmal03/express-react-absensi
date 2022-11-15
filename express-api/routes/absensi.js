const express = require('express');
const router = express.Router();
const AbsensiModel = require('../models/absensi')


// endpoint GET
router.get("/", async (req, res) => {
    const absensi = await AbsensiModel.findAll();
    res.status(200).json({
        absensi,
        metadata: absensi
    })
})

// endpoint post

router.post('/checkin', async (req, res) => {
    const { nip } = req.body
    const absensi = await AbsensiModel.create({
        users_nip: nip, status: 'in'
    })
    res.status(200).json({
        data: absensi,
        metadata: 'Check-in Successfully'
    })
})

router.post('/checkout', async (req, res) => {
    const { nip } = req.body
    const absensi = await AbsensiModel.create({
        users_nip: nip, status: 'out'
    })
    res.status(200).json({
        data: absensi,
        metadata: 'Checkout Successfully'
    })
})


module.exports = router



module.exports = router