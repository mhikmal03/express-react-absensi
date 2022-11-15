const bcrypt = require('bcrypt')
const UserModel = require('../models/users')

const passwordCheck = async (nip, password) => {
    const userData = await UserModel.findOne({
        where: { nip: nip }
    })
    const compare = await bcrypt.compare(password, userData.password)
    return { compare, userData }
}

module.exports = passwordCheck