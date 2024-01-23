const express = require('express')
const { Server } = require("socket.io");
const { createServer } = require('node:http');

const config = require('config')
const cors = require('cors');
const md5 = require('md5')

const app = express()
const server = createServer(app);
const io = new Server(server);

const PORT = config.get('serverPort')

app.use(cors());

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// app.use('/api/auth',require('./routes/auth.routes'))
// app.use('/api/',require('./routes/messages.routes'))

const start = async () => {
    try{
        //const hashPassword = md5('никитин'+'dfgjldfjdfgljdlf55');
        //console.log(hashPassword)

        app.listen(PORT,() => {
            console.log('Server started on port : ', PORT)
        })
        io.on('connection', (socket) => {
            console.log('a user '+ socket + ' connected');
        });



    }catch (e){

    }
}

start()