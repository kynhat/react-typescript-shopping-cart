const Account = require('../models/Account');
var md5 = require('md5');
const Product = require('../models/Product');
const Checkout = require('../models/Checkout');
const CheckoutForGuest = require('../models/CheckoutForGuest');
const ProductCheckout = require('../models/ProductCheckout');
const ProductCheckoutForGuest = require('../models/ProductCheckoutForGuest');
const mongoDataMethods = {
    getAllProducts: async () => await Product.find(),
    getAllCheckouts: async () => await Checkout.find(),
    getCheckoutById: async (id) => await Checkout.findById(id),
    getCheckoutForGuestById: async (id) => await CheckoutForGuest.findById(id),
    getAllProductCheckouts: async() => await ProductCheckout.find(),
    getAllCheckoutForGuests: async () => await CheckoutForGuest.find(),
    getAllProductCheckoutsForGuests: async() => await ProductCheckoutForGuest.find(),
    getAccountLogin: async (username,password) => {
        // password = md5(password);
        var user = await Account.findOne({
            username,
            password
        })
        // if(!user) return false;
        return true;
    },
    getAccountLoginByMutation: async ({username,password}) => {
        // password = md5(password);
        var user = await Account.findOne({
            username,
            password
        })
        if(!user) return false;
        return true;
    },
    createProduct: async args => {
        const newProduct = new Product(args);
        await newProduct.save();
        return 1;
    },
    createAccount : async args => {
        // args.password = md5(args.password);
        const newAccount = new Account(args);
        await newAccount.save();
        return true;
    },
    createCheckout : async args => {
        var productCheckout = JSON.parse(JSON.stringify(args.product));
        const newOrder = new Checkout(args);
        var checkOut = await newOrder.save();
        for(var i = 0 ; i< productCheckout.length; i++) {
            productCheckout[i].checkoutid = checkOut.id;
            const newProductCheckout = new ProductCheckout(productCheckout[i]);
            await newProductCheckout.save();
        }
        return 1;
    },
    createCheckoutForGuest : async args => {
        var productCheckoutForGuest = JSON.parse(JSON.stringify(args.product));
        const newOrder = new CheckoutForGuest(args);
        var checkOut = await newOrder.save();
        for(var i = 0 ; i< productCheckoutForGuest.length; i++) {
            productCheckoutForGuest[i].checkoutid = checkOut.id;
            const newProductCheckoutForGuest = new ProductCheckoutForGuest(productCheckoutForGuest[i]);
            await newProductCheckoutForGuest.save();
        }
        return 1;
    },
    updateCheckout : async args => {
        await Checkout.findOneAndUpdate(
            {"id": args.id},
            {$set: args},
            { returnOriginal: false }
        )
        return true;
    },
    updateCheckoutForGuest : async args => {
         await CheckoutForGuest.findOneAndUpdate(
            {"id": args.id},
            {$set: args},
            { returnOriginal: false }
        )
        return true;
    }
}
module.exports = mongoDataMethods;