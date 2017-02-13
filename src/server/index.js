import express from 'express'
import graphqlHTTP from 'express-graphql'
import pgPool from './pgPool'
import schema from '../../schema'

const nodeEnv = process.env.NODE_ENV || "development"
console.log(`Running in ${nodeEnv}`)

const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      pgPool
    }
  })
)

app.listen(4040, console.log("Running graphql at 4040"))


