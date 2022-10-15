//checkoutforguests
const resolvers = {
    Query: {
        products: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllProducts(),
        checkouts: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllCheckouts(),
        checkout: async(parent, {id}, { mongoDataMethods }) => await mongoDataMethods.getCheckoutById(id),
        checkoutforguest: async(parent, {id}, { mongoDataMethods }) => await mongoDataMethods.getCheckoutForGuestById(id),
        checkoutforguests: async(parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllCheckoutForGuests(),
        account: async(parent, {username, password}, { mongoDataMethods }) => await mongoDataMethods.getAccountLogin(username,password),
    },
    Checkout: {
        productcheckouts: async ({ id }, args, { mongoDataMethods }) =>
        await mongoDataMethods.getAllProductCheckouts({ checkoutid: id })
    },
    CheckoutForGuest: {
        productcheckoutforguests: async ({ id }, args, { mongoDataMethods }) =>
        await mongoDataMethods.getAllProductCheckoutsForGuests({ checkoutid: id })
    },
    Mutation: {
        createProduct: async(parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.createProduct(args);
        },
        loginUser: async(parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.getAccountLoginByMutation(args);
        },
        createCheckout: async(parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.createCheckout(args);
        },
        createCheckoutForGuest: async(parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.createCheckoutForGuest(args);
        },
        createUser: async(parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.createAccount(args);
        },
        updateCheckout: async(parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.updateCheckout(args);
        },
        updateCheckoutForGuest: async(parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.updateCheckoutForGuest(args);
        }
        //updateCheckoutForGuest
    }
}
module.exports = resolvers