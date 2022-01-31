const express = require('express')

const app = express()

const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

app.use(cors())

const server = http.createServer(app)
const hostDefault = 'http://localhost:3000'
const io = new Server(server, {
	cors: {
		origin: hostDefault,
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('User connected:' + socket.id)

	socket.on('join_room', () => {
		socket.join(data)
		console.log('User ID: ' + socket.id + 'join Room:'+ data)

	})
})

server.listen(PORT, () => {
	console.log('SERVER IS RUN localhost:'+PORT);
})