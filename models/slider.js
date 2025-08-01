const mongoose = require('mongoose')

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtittle: {
        type: String,
        required: true
    },
    image: {
        pubic_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });
const sliderModel = mongoose.model('slider', sliderSchema);
module.exports = sliderModel