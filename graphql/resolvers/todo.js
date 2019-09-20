const Todo = require('../../models/Todo')
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

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
      pubsub.publish('createTodo', { createTodo: todo });

      return todo
    },
    updateTodo: async (_, args) => {
      const todo = await Todo.findByIdAndUpdate(args.id, { status: 'complete' }, { new: true })
      console.log(todo)
      return todo
    },
    deleteTodo: async (_, args) => {
      console.log(args.id)
      const todo = await Todo.findById(args.id)
      todo.delete()
      return args.id.toString()
    },
  },
  Subscription: {
    createTodo: {
      subscribe: () => pubsub.asyncIterator(['createTodo']),
    }
  }
}
