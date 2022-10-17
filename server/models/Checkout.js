const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
    address : {
        type : String
    },
    amount : {
        type : Number
    }
});
module.exports = mongoose.model('checkouts', CheckoutSchema);