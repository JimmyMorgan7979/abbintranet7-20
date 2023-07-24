const express = require('express')
const router = express.Router()

// Load DB Models
const Part = require('../models/Part')
const RemovedPart = require('../models/RemovedPart')
const User = require('../models/User')

//Route for parts search home page 
router.get('/', async function(req,res){
    try {
    let userip = req.ip
    let date = new Date().toLocaleString();
    let token = await User.exists({ip:userip})

    if (token == true){
        console.log(`Part Admin Access by ${userip}`)
        res.render('pages/partHomeWithAdmin',{banner:'Part Search With Admin', message:''})
    }else {
        console.log(`Parts -> By ${userip} at ${date}`)
        res.render('pages/partHome', {banner: 'Part Search', message:''})
    }
    } catch (error){console.log(error)}
})

//Route for search by Part Number and search by LV number results to be displayed

router.post('/partSearchResult', async function(req,res){
    try{
        var search = req.body
        let userip = req.ip
        let date = new Date().toLocaleString();
        let token = await User.exists({ip:userip})
        if (token = true){
            Part.find({stockedAS: {$regex: search.searchWord, $options: 'i'}},
                function(err,docs){
                if (docs.length > 0){
                    console.log("admin stocked as")
                    res.render('pages/partAdminSearchResult', {banner: 'Search Results', search,docs, message:''})
                }
                else {
                    Part.find({sapNumber: {$regex: search.searchWord, $options: 'i'}},
                        function(err,docs){
                            res.render('pages/partAdminSearchResult', {banner: 'Search Results', search,docs, message:''})
                            console.log("admin sap number")
                        })
                    }}).limit(20) 
        } else{
            Part.find({stockedAS: {$regex: search.searchWord, $options: 'i'}},
                function(err,docs){
                console.log(docs)
                if (docs.length > 0){
                    console.log("stocked as")
                    res.render('pages/partSearchResult', {banner: 'Search Results', search,docs, message:''})
                }
                else {
                    Part.find({sapNumber: {$regex: search.searchWord, $options: 'i'}},
                        function(err,docs){
                            res.render('pages/partSearchResult', {banner: 'Search Results', search,docs, message:''})
                            console.log("sap number")
                        })
                    }}).limit(20) 
        }  
    } catch (error){console.log(error)}     
})

//Route to add parts
router.get ('/partAdd', function(req,res){
    res.render('pages/partAdd', {banner: 'Add Part to DB', message: ''})
})

router.post('/partAdd', function(req,res){
    var partInfo = req.body
    let ip = req.ip
    var newPart = new Part({
        stockedAS: partInfo.stockedAS,
        description1: partInfo.description1,
        sapNumber: partInfo.sapNumber,
        manufacturer: partInfo.manufacturer,
        description2: partInfo.description2,
        location1: partInfo.location1,
        location2: partInfo.location2,
        location3: partInfo.location3,
        drawer: partInfo.drawer,
        cross1: partInfo.cross1,
        cross2: partInfo.cross2,
        cross3: partInfo.cross3,
        price: partInfo.price,
        notes: partInfo.notes,
        priceUpdated: partInfo.priceUpdated
    });
    newPart.save(function(err,Part){
        if(err){
            res.send("error")
        } else {
            res.redirect('/partHome')
        }
    })
})

// Routes to edit parts
router.post('/partUpdate', function(req,res){
    var search = req.body
        Part.find({stockedAS: search.searchWord},
        function(err,response){
            res.render('pages/partEdit', {banner: 'Search Results to Update Parts Record', search,response, message:''})
        }).limit(1)
 })
// 
 router.post('/partUpdateLV', function(req,res){
    var search = req.body
        Part.find({sapNumber: search.searchWord},
        function(err,response){
            res.render('pages/partEdit', {banner: 'Search Results to Update Parts Record', search,response, message:''})
        }).limit(1)
 })


// Edit function for parts database
router.post('/partEdit/:id', function(req,res){
    var updatepart = {_id: req.params.id}
    var addedit = req.body
    let ip = req.ip
    Part.findOneAndUpdate(updatepart, addedit,
        function (err, docs) { 
            if (docs == null){ 
                res.render('pages/partEdit', {banner: 'Search Results to Update Parts Record', addedit, message:'Did not update record'}) 
            } else {
                res.redirect('/partHome')
            } 
    })
})

//Route for parts to be deleted and inserted into the parts delete table
router.get('/delpart/:id/delete',function(req,res){
    test = Part.find({_id: req.params.id},
        function(err,response){
            var today = new Date()
            var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear()
            var adddeleted = response[0];
            var removedpart = new RemovedPart({
                stockedAS: adddeleted.stockedAS,
                description1: adddeleted.description1,
                sapNumber: adddeleted.sapNumber,
                manufacturer: adddeleted.manufacturer,
                description2: adddeleted.description2,
                location1: adddeleted.location1,
                location2: adddeleted.location2,
                location3: adddeleted.location3,
                drawer: adddeleted.drawer,
                cross1: adddeleted.cross1,
                cross2: adddeleted.cross2,
                cross3: adddeleted.cross3,
                price: adddeleted.price,
                dateRemoved: date
            });
            removedpart.save(function(err,RemovedPart){
                if(err)
                    res.send("error")
            })
        })
        let ip = req.ip
    Part.deleteOne({_id: req.params.id},
        function(err){
            if(err){ 
                res.json(err)
        } else {
            res.redirect('/partHome')
        } 
    })
})

module.exports = router