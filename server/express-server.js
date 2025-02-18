const express = require("express")
const graphqlHTTP = require("express-graphql")
const mongoose = require("mongoose")
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()
// allow cross-origin requests
app.use(cors())

// enter your mongodb atlas credentials here
const usrPw = process.env.usrPw // set user and password in .env file
const cluster = 'Cluster0'
const dbName = 'DataApiPrototype'

const uri = `mongodb+srv://${usrPw}@${cluster}.kaxm2.mongodb.net/?retryWrites=true&w=majority`
// Replace the connection string with your MongoDB Atlas details
// https://www.mongodb.com/docs/drivers/node/current/quick-start/create-a-connection-string/

mongoose.connect(
    uri,
    {
        dbName: dbName
    }
)

mongoose.connection.once('open', () => {
    console.log('connected to database')
})


// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Server is running...")
})
