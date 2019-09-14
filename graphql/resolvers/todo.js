const Todo = require('../../models/Todo')

module.exports = {
  Query: {
    todos: async () => {
      const todos = await Todo.find().sort({ createdAt: -1 })
      return todos
    },
    todo: async (_, args) => {
      const todo = await Todo.findById(args.id)
      return todo
    },
  },
  Mutation: {
    createTodo: async (_, args) => {
      const todo = await new Todo({
        ...args.input,
        status: 'incomplete',
        createdAt: new Date(),
      }).save()
      // todo pubsub
      return todo
    },
    updateTodo: async (_, args) => {
      const todo = await Todo.findByIdAndUpdate(args.id, { status: 'complete' })
      console.log(todo)
      return todo
    },
  },
}
