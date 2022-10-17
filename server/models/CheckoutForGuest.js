const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutForGuestSchema = new Schema({
    address : {
        type : String
    },
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    phone : {
        type : String
    },
    email : {
        type : String
    },
    amount : {
        type : Number
    }
});
module.exports = mongoose.model('checkoutforguests', CheckoutForGuestSchema);