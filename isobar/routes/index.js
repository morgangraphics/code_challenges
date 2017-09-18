let hbs = require('hbs');
const http = require('http');
const express = require('express');
const path = require('path');
const hbsutils = require('hbs-utils')(hbs);
const extend = require('handlebars-extend-block');
const router = express.Router();
hbs = extend(hbs);


const getData = async () => {

  data = http.get("http://localhost:3000/data", (res) => {
    //Would do some testing of data integrity
    res.on('data', (data) => {
      JSON.parse(data);
    });
    res.on('error', (e) => {
      console.log("Got error: " + e.message);
    });
    res.on('end', () => {

    });
  });
  data.end();
  return data;
}


/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await getData();
  console.log(data)
  res.render('index', {r: await getData()});
});



module.exports = router;
