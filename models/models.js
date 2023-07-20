var mongoose = require('mongoose')
var modelsSchema = mongoose.Schema({
    conformal_coated: String,
    description: String,
    farm_out: String,
    modelnumber: String,
    notes: String,
    notes2: String,
    procedure_number: String,
    latest_procedure_revision: String,
    file_name: String,
    link: String,
    ehs_approval_date: String,
    ehs_approver: String,
    ehs_notes: String,
    ehs_review_date: String,
    ehs_reviewer: String,
    ehs_status: String,
    test_fixture_description: String,
    test_fixture_notes: String,
    test_fixture_number: String,
    test_fixture_photo_link: String
})

var models = mongoose.model('models', modelsSchema)
module.exports = models