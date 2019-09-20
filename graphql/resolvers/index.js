const todoResolver = require('./todo')

const books = [
  {
    id: '1',
    title: 'Harry potter',
    authorId: '1'
  },
  {
    id: '2',
    title: 'Harry potter 2',
    authorId: '2'
  },
]

const authors = [
  {
    id: '1',
    name: 'JK Rolling'
  },
  {
    id: '2',
    name: 'Stone'
  },
]

module.exports = {
  Book: {
    author: (parent) => {
      console.log(parent.authorId)
      return authors.find(a => a.id === parent.authorId)
    }
  },
  Query: {
    ...todoResolver.Query,
    books: (parent, args) => {
      return books
    }
  },
  Mutation: {
    ...todoResolver.Mutation,
  },
  Subscription: {
    ...todoResolver.Subscription,
  }
}
