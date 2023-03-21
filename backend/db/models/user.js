const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')

// definie user schema
const userSchema = new mongoose.Schema({
    login:{
        type: String,
        required: [true, 'Login is required!'],
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 80
    },
    password:{
        type: String,
        required: [true, 'Password is required!'],
        minlength: 5,
        maxlength: 16
    }
})

userSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

const User = mongoose.model('User', userSchema)

module.exports = User