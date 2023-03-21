const User = require('../db/models/user')
const bcrypt = require("bcryptjs")
const GenerateNewError = require('../error/generateNewError')


class UserActions {
    // register
    async register(req, res, next){
        try {
            const { login, email, password, cPassword } = req.body
            const findUser = await User.findOne({ login: req.body.login })
            if (findUser) {
                throw new GenerateNewError("This user already has an account with this login")
            }
    
            if (password !== cPassword) {
                throw new GenerateNewError("Passwords are not the same")
            }

            const user = new User({ login, email, password })
            await user.save()
            return res.sendStatus(200).json({ validationStatus: true })
        } catch (err) {
            return next(err.message)
        }
    }

    // login
    async login(req, res, next){
        try {
            const user = await User.findOne({login: req.body.login})
        
            if (!user) {
                throw new GenerateNewError("This user doesn't exist")
            }else{
                bcrypt.compare(req.body.password, user.password, function(error, isMatch) {
                    if (error) {
                      throw error
                    } else if (!isMatch) {
                        return res.json({message: 'Wrong password'})
                    } else {
                        return res.json({validationStatus: true, userName: req.body.login})
                    }
                  })
            }
          } catch (err) {
            return next(err.message)
          }
        
    }
    
}


module.exports = new UserActions()