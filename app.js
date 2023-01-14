const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2023

let db,
    dbConnectionStr = 'mongodb+srv://Hdavis73:Heather1@grocery-items.6kfjxjj.mongodb.net/?retryWrites=true&w=majority',
    dbName = 'Grocery-Items'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`connected to ${dbName}`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/addItem', (req,res) => {

})

app.listen(PORT)