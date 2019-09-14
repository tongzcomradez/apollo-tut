const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .connect('mongodb://localhost:27017/apollo-session', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`MongoDB Connected and Server running at ${res.url} `)
  })

