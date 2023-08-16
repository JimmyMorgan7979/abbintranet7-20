const express = require('express')
const router = express.Router()

// Load DB Models
const models = require('../models/models')

// Route for home page "MDB home
router.get('/', function(req,res){
    res.render('pages/mdbHome',{banner: "Models Database", message: ""})
    let ip = req.ip
    let date = new Date().toLocaleString();
    console.log(`MDB -> By ${ip} at ${date}`)
})

// Initial Search Results
router.post('/mdbResults', function(req,res) {
    var search = req.body;
    console.log(search.searchword)
    if(!search.searchword){
        res.render('pages/mdbHome',{banner: 'Models Database', message: " ** Please enter a search value ** "});
    }else{
        models.find({modelnumber:{$regex: search.searchword,$options:"i"}},
        function(err,docs){
            //console.log(docs)
            res.render('pages/mdbresults.ejs', {message:"", banner: 'Models Database Results', docs})
}).limit(12)}})

//Selected model from initial search results
router.post('/model', function(req,res){
    var test = req.body;
    models.findOne({_id:test.id},function(err,docs){
        let fixlink = docs.link.slice(0,docs.link.length-4)
        let fixturePhoto = "\\static\\" + docs.test_fixture_photo_link
        res.render('pages/mdbModel.ejs',{docs,fixlink,fixturePhoto, banner: 'Models Database', message:""})
        let servedat = Date();
        console.log(`Served test ${docs.modelnumber} at ${servedat}`)
        let ip = req.ip
        console.log(ip)
    })
});

module.exports = router