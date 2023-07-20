const mongoose = require('mongoose')

var orangeBookSchema = mongoose.Schema({
    CombinedModel: String,
    BoardName: String,
    MajorRev: String,
    MinorRev: String,
    PLESA: String,
    RPO: String,
    STOCK: String,
    ASM: String,
    ASSMTEST: String,
    ASSMUNTST: String,
    FABUNASM: String,
    FLD: String,
    RR: String
})

var OBook = mongoose.model("orangeBook", orangeBookSchema)
module.exports = OBook