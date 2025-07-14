const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
},{timestamps:true});

const teamModel = mongoose.model('team',teamSchema)
module.exports = teamModel