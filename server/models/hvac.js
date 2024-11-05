const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hvacSchema = new Schema({
    hvacIndex: Number,
    isHealthy: Boolean,
    humidity: Number,
    airTemp: Number,
    cellTemp: Number,
    arrays: [Number],
    type: String,
    heatTo: Number,
    respondingTo: String,
    hvacStage: String,
    signals: String,
    firmware: String,
})

module.exports = mongoose.model('Hvac', hvacSchema)
