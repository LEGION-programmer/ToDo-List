const cors = require('cors')
const routs = require('./routes/routs')
const port = process.env.PORT || 3000
const app = require('./app/app')
// add db to main file
require('./db/mongoose')


app.use(cors());



// api
app.use('/', routs)

// server
app.listen(port, ()=>{
    console.log(`Server working on: localhost:${port}`)
})
