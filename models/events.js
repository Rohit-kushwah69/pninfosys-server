const mongoose = require("mongoose")

const eventsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });

const eventsModel = mongoose.model('events', eventsSchema)
module.exports = eventsModel