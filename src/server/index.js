import express from 'express'
import graphqlHTTP from 'express-graphql'
import fs from 'fs'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
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

// graphql(schema, introspectionQuery).then((data) => {
//   console.log('writing data')
//   fs.writeFile('/home/jsjaspreet/dev/projects/rgr-links/linksSchema.json', JSON.stringify(data, null, 2), err => {
//     if (err) throw err
//     console.log("Wrote json schema")
//   })
// })

// static
const maxAge = nodeEnv === "production" ? 1000 * 60 * 60 * 24 * 30 : 0
app.use("/build", express.static(resolve('./build'), { maxAge }))

app.all('*', (req, res) => {
  res.sendFile(resolve('./build/index.html'))
})

app.listen(4040, console.log("Running app at 4040"))


