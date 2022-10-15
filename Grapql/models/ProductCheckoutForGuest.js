const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCheckoutForGuestSchema = new Schema({
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
    checkoutforguestid : {
        type : String
    },
});
module.exports = mongoose.model('productcheckoutforguests', ProductCheckoutForGuestSchema);