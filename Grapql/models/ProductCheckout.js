const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCheckoutSchema = new Schema({
    name : {
        type : String
    },
    quantity : {
        type : Number
    },
    totalprice : {
        type : Number
    },
    price : {
        type : Number
    },
    checkoutid : {
        type : String
    },
});
module.exports = mongoose.model('productcheckouts', ProductCheckoutSchema);