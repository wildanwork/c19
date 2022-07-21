const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('bread.db', sqlite3.OPEN_READWRITE, err => {
  if (err) {
    console.log('gagal koneksi dengan database', err)
  }
})
const moment = require('moment')
const { Console } = require('console')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
  const page = req.query.page || 1
  const LIMIT = 3;
  const OFFSET = (page - 1) * LIMIT
  db.all('Select count (*) as total from bread', (err, data) => {
    const pages = Math.ceil(data[0].total /LIMIT)
    db.all('SELECT * FROM bread LIMIT ? OFFSET ?', [LIMIT, OFFSET], (err, data) => {

      if (err) {
        console.log('gabisa ambil data euy', err)
      }
      res.render('list', { rows: data, moment,pages,page })
    })

  })


})
app.get('/add', (req, res) => {
  res.render('add')
})
app.post('/add', (req, res) => {
  const { string, integer, float, date, boolean } = req.body
  db.run('insert into bread (_string,_integer,_float,_date,_boolean) values (?, ?, ?, ?, ?)', [string, (integer), (float), date, boolean], (err) => {
    if (err)
      console.log('gabisa ambil data', err)
    res.redirect('/')
  })

})

app.get('/delete/:id', (req, res) => {
  const index = req.params.id
  db.run('delete from bread where _id = ?', [index], (err) => {
    if (err)
      console.log('gabisa ambil data', err)
    res.redirect('/')
  })

})
app.get('/edit/:id', (req, res) => {
  db.all('select * from bread where _id = ?', [req.params.id], (err, data) => {
    if (err)
      console.log('gabisa ambil data', err)
    res.render('edit', { item: data[0] })
  })

})
app.post('/edit/:id', (req, res) => {
  data[req.params.id] = ({ string, integer, float, date, boolean } = req.body)
  db.all('SELECT * FROM bread', (err, data) => {
    if (err) {
      console.log('gabisa ambil data euy', err)
    }
    res.render('list', { rows: data, moment })
  });
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})