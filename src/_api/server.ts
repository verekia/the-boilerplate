import { ApolloServer, gql, AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'secret abcd hello'

const usersDb = [{ id: '7H5FtwuiIhepa9', name: 'Sven', email: 'sven@example.com' }]

const notesDb = [{ id: '123', title: 'Hello World', description: 'Nice world' }]

interface JwtPayload {
  sub: string
}

const server = new ApolloServer({
  typeDefs: gql`
    type User {
      id: ID!
      name: String!
      email: String!
    }
    type Note {
      id: ID!
      title: String!
      description: String
    }
    type Query {
      login(email: String!): String!
      renewToken: String!
      public: String!
      me: User!
      getNote(id: ID!): Note
    }
  `,
  resolvers: {
    Query: {
      public: () => 'public',
      login: (_, { email }) => {
        const user = usersDb.find(u => u.email === email)
        if (!user) throw new AuthenticationError('Cannot find user')
        return jwt.sign({ sub: user.id }, JWT_SECRET)
      },
      renewToken: (_, __, { user }) => jwt.sign({ sub: user.id }, JWT_SECRET),
      me: (_, __, { user }) => {
        if (!user) throw new AuthenticationError('Not authenticated')
        return user
      },
      getNote: (_, { id }) => notesDb.find(n => n.id === id),
    },
    Note: {},
  },
  context: ({ req }) => {
    if (!req.headers.authorization) return {}
    let jwtPayload: JwtPayload
    try {
      const token = req.headers.authorization.split('Bearer ')[1]
      jwtPayload = jwt.verify(token, JWT_SECRET, { maxAge: '15s' }) as JwtPayload
    } catch (err) {
      throw new AuthenticationError(err)
    }
    const user = usersDb.find(u => u.id === jwtPayload.sub)
    if (!user) throw new AuthenticationError('No user for this token')
    return { user, jwtPayload }
  },
  // Change the origin for staging / production
  cors: { origin: 'http://localhost:3000', credentials: true },
})

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
