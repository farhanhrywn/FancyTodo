const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt.js')
const { getToken } = require('../helper/jwt.js')

class Controller {
    static async saveNewUser(req, res, next) {
        try {
            const payload = { email: req.body.email, password: req.body.password }
            const data = await User.create(payload)
            res.status(201).json({ id: data.id, email: data.email })
        } catch (err) {
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                let hashPassword = user.password
                let result = comparePassword(password, hashPassword)
                if(!result) {
                    throw { name: "Wrong Data" }
                } else {
                    const payload = { id: user.id, email: user.email }
                    const token = getToken(payload)
                    const httpCode = 200
                    res.status(httpCode).json({ acess_token: token})
                }
            } else {
                throw { name: "Wrong Data" }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller