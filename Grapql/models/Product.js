const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name : {
        type : String
    },
    image : {
        type : String
    },
    price : {
        type : Number
    }
});
module.exports = mongoose.model('products', ProductSchema);