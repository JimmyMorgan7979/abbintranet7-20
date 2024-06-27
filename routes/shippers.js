const express = require('express')
const router = express.Router()

// Load DB Models
//const models = require('../models/models')

// Route for home page "MDB home
router.get('/', function(req,res){
    res.render('pages/shipperForm',{banner: "Misc Shipper", message: ""})
    
})


module.exports = router