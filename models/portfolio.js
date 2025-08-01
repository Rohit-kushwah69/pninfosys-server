const mongoose = require('mongoose')

const portfolioSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const portfolioModel = mongoose.model('portfolio', portfolioSchema);
module.exports = portfolioModel