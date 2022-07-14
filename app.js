const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const { json } = require('body-parser')
const read = fs.readFileSync('siswa.json','utf-8')
const data = JSON.parse(read)
const moment = require('moment')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
  const read = fs.readFileSync('siswa.json','utf-8')
const data = JSON.parse(read)
  res.render('list', { rows: data,moment })
})
app.get('/add', (req, res) => {
  res.render('add')
})
app.post('/add', (req, res) => {
  const {string,integer,float,date,boolean} = req.body
  data.push({string, integer: parseInt(integer), float: parseFloat(float), date, boolean: JSON.parse(boolean)})
  fs.writeFileSync('siswa.json',JSON.stringify(data,null,3),'utf-8')
  res.redirect('/')
})

app.get('/delete/:id',(req,res)=>{
const index = req.params.id   
data.splice(index,1)
fs.writeFileSync('siswa.json',JSON.stringify(data,null,3),'utf-8')
res.redirect('/')
})
app.get('/edit/:id',(req,res)=> {
res.render('edit',{item: data[req.params.id]})
})
app.post('/edit/:id',(req,res)=>{
  data[req.params.id]  = ({string,integer,float,date,boolean}= req.body)
  fs.writeFileSync('siswa.json',JSON.stringify(data,null,3),'utf-8')
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})