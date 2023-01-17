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

app.get('/', async (req,res) => {
    const groceryItems = await db.collection('Grocery-Items').find().toArray()
    res.render('index', { items: groceryItems })
})

app.post('/addItem', (req,res) => {
    db.collection('Grocery-Items').insertOne({item: req.body.groceryItem, obtained: false})
        .then(result => {
            console.log('item added')
            res.redirect('/')
        })
})

app.put('/markObtained', (req,res) => {
    db.collection('Grocery-Items').updateOne({ item: req.body.itemFromJs }, {
        $set: {
            obtained: true
        }
    }, {
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('complete')
        res.json('complete')
    })
})

app.listen(PORT)