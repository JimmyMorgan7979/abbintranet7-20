const { response } = require('express')
const express = require('express')
const router = express.Router()

// Load DB Models
const OBook = require('../models/orangeBook')

// Orange Book Home
router.get('/', function(req,res){
    res.render('pages/orangeBookHome', {banner: 'Orange Book Revision Lookup', message:''})
})

// Orange book search result
router.post('/orangeBookSearchResult', function(req,res){
    var search = req.body
    OBook.find({BoardName: {$regex: search.searchWord, $options: 'i'}},
        function(err,docs){
            //console.log(docs)
            if (docs.length > 0){
                console.log("Orange book Board Name")
                res.render('pages/orangeBookSearchResult', {banner: 'Search Results', search,docs, message:''})
            }
            else {
                OBook.find({CombinedModel: {$regex: search.searchWord, $options: 'i'}},
                    function(err,docs){
                        res.render('pages/orangeBookSearchResult', {banner: 'Search Results', search,docs, message:''})
                        console.log("Orange book Combined Model")
                    })
                }}).limit(20)           
})
module.exports = router