import io from 'socket.io-client'
import bus from './EventBus'

const prod = location.hostname != 'localhost'

let connStr
if (location.hostname == 'localhost') {
  connStr = 'http://localhost:3098'
} else {
  connStr = 'https://agilesimulations.co.uk:' + process.env.VUE_APP_PORT
}
console.log('Connecting to: ' + connStr)
const socket = io(connStr)


// Send

bus.$on('sendGetTasks', () => { socket.emit('sendGetTasks') })

bus.$on('sendAddTask', (data) => { socket.emit('sendAddTask', data) })

bus.$on('sendUpdateTask', (data) => { socket.emit('sendUpdateTask', data) })

bus.$on('sendCloneTask', (data) => { socket.emit('sendCloneTask', data) })

bus.$on('sendDeleteTask', (data) => { socket.emit('sendDeleteTask', data) })

// Receive

socket.on('updateTasks', (data) => { bus.$emit('updateTasks', data) })

export default bus
