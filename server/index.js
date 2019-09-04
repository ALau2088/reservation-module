const express = require ('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser');
const db = require('../database/index.js');

//setting up server and parse data
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//get listing data according to the ID
app.get('/api/listingData/:id', (req, res) => {
  let id = req.params.id
  db.getListing(id, (result)=> {
    console.log(`sent back listing ${id} information!`)
    res.send(result[0])
  })
})

//get reservations data according to listing ID
app.get('/api/reservations/:listingid', (req, res) => {
  let listingid = req.params.listingid
  db.getReservations(listingid, (result) => {
    console.log( `sent back all reservations for ${listingid}`)
    res.send(result)
  })
})

//start up the listening on the port
app.listen(port, ()=> console.log(`Reservations module listening on port ${port}`))