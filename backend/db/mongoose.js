const mongoose = require('mongoose')

// get connection with db
const url = 'mongodb://127.0.0.1:27017/todoList'

// db configuration
mongoose.set('strictQuery', false)


try{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Connected whith db'))
    
}catch(error){
    console.log(error)
}

