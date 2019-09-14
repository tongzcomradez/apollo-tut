const { model, Schema } = require('mongoose')

const todoSchema = new Schema({
  title: String,
  content: String,
  status: String,
  username: String,
  createdAt: String,
})

module.exports = model('Todo', todoSchema)
