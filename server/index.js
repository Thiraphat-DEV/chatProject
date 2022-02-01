const express = require('express')

const app = express()
const PORT =6665
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
//kittiphat
io.on('connection', (socket) => {
	console.log('User connected:' + socket.id)
	//เข้าาร่วมห้อง
	socket.on('join_room', (data) => {
		socket.join(data)
		console.log('User ID: ' + socket.id + 'join Room:'+ data)

	}) 
	
	//ส่งข้อมูล
	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data)
	})

	//ยกเลิกการเชื่อมต่อ
	socket.on('disconnect', () =>{
		console.log('User Disconnected', socket.id)
	})
})
//เชื่อมต่อ PORT แล้วเปิด Browser 
server.listen(PORT, () => {
	console.log('SERVER IS RUN localhost:'+PORT);
})
