
const { v4: uuidv4 } = require('uuid')

function _updateTasks(db, io) {
  db.gameCollection.find().toArray(function(err, res) {
    if (err) throw err
    io.emit('updateTasks', res)
  })
}

module.exports = {

  getTasks: function(db, io, debugOn) {

    if (debugOn) { console.log('getTasks') }

    _updateTasks(db, io)
  },

  addTask: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addTask', data) }

    data.id = uuidv4()
    db.gameCollection.insertOne(data, (err) => {
      if (err) throw err
      _updateTasks(db, io)
    })
  },

  updateTask: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateTask', data) }

    db.gameCollection.findOne({id: data.id}, function(err, res) {
      if (err) throw err
       res[data.field] = data.value
       delete res._id
       db.gameCollection.updateOne({id: data.id}, {$set: res}, function(err, res) {
         if (err) throw err
         _updateTasks(db, io)
       })
    })
  },

  deleteTask: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteTask', data) }

    db.gameCollection.deleteOne({id: data.id}, function(err, res) {
       if (err) throw err

      _udateTasks(db, io)
    })
  }

}
