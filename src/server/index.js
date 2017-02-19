import express from 'express'
import graphqlHTTP from 'express-graphql'
import pgPool from './pgPool'
import schema from '../../schema'
import { resolve } from 'path'

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

// static
const maxAge = nodeEnv === "production" ? 1000 * 60 * 60 * 24 * 30 : 0
app.use("/build", express.static(resolve('./build'), { maxAge }))

app.all('*', (req, res) => {
  res.sendFile(resolve('./build/index.html'))
})

app.listen(4040, console.log("Running app at 4040"))


