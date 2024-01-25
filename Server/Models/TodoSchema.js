const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
    name:{
        type:String
    },
    desc:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user-collection',
        required:true
    }
})

module.exports = new mongoose.model('Todo-Collection',TodoSchema);