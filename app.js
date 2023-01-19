const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2023;

let db,
  dbConnectionStr = 'mongodb+srv://Hdavis73:Heather1@grocery-items.6kfjxjj.mongodb.net/?retryWrites=true&w=majority',
  dbName = 'Grocery-Items';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then((client) => {
  console.log(`connected to ${dbName}`);
  db = client.db(dbName);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const groceryItems = await db.collection('Grocery-Items').find().toArray();
  res.render('index', { items: groceryItems });
});

app.post('/addItem', (req, res) => {
  db.collection('Grocery-Items')
    .insertOne({ item: req.body.groceryItem.toLowerCase(), obtained: false })
    .then((result) => {
      console.log('item added');
      res.redirect('/');
    });
});

app.put('/markObtained', (req, res) => {
  db.collection('Grocery-Items')
    .updateOne(
      { item: req.body.itemFromJs.toLowerCase() },
      {
        $set: {
          obtained: true,
        },
      },
      {
        sort: { _id: -1 },
        upsert: false,
      }
    )
    .then((result) => {
      console.log('complete');
      res.json('complete');
    });
});

app.put('/markUnobtained', (req, res) => {
    db.collection('Grocery-Items')
    .updateOne(
      { item: req.body.itemFromJs.toLowerCase() },
      {
        $set: {
          obtained: false,
        },
      },
      {
        sort: { _id: -1 },
        upsert: false,
      }
    )
    .then((result) => {
      console.log('uncomplete');
      res.json('complete');
    });
});

app.delete('/deleteItem', (req, res) => {
  db.collection('Grocery-Items')
    .deleteOne({ item: req.body.itemFromJs.toLowerCase() })
    .then((result) => {
      console.log(req.body.itemFromJs);
      console.log('item deleted');
      res.json('item deleted');
    })
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
