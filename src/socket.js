import io from 'socket.io-client'
import bus from './EventBus'

let connStr
if (location.hostname == 'localhost') {
  connStr = 'http://localhost:3200'
}
console.log('Connecting to: ' + connStr)
const socket = io(connStr)

// Send

bus.$on('sendGetTasks', () => { socket.emit('sendGetTasks') })

bus.$on('sendAddTask', (data) => { socket.emit('sendAddTask', data) })

bus.$on('sendUpdateTask', (data) => { socket.emit('sendUpdateTask', data) })

bus.$on('sendDeleteTask', (data) => { socket.emit('sendDeleteTask', data) })

// Receive

socket.on('updateTasks', (data) => { bus.$emit('updateTasks', data) })

export default bus
