const todoResolver = require('./todo')

module.exports = {
  Query: {
    ...todoResolver.Query,
  },
  Mutation: {
    ...todoResolver.Mutation,
  },
}
