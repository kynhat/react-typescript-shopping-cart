const {gql} = require('apollo-server-express');
const typeDefs = gql`
    input ProductInput {
        name: String
        price: Int
        quantity: Int
        totalprice: Int
        checkoutid: ID
    }
    type Account {
        id: ID
        username: String
        password: String
    }
    type Product {
        id: ID
        name: String
        price: Int
        image: String
    }

    type ProductCheckout {
        id: ID
        name: String
        price: Int
        quantity: Int
        totalprice: Int
        checkout: Checkout
    }
    type Checkout {
        id: ID
        address: String
        amount: Int
        productcheckouts: [ProductCheckout]
    }

    type ProductCheckoutForGuest {
        id: ID
        name: String
        price: Int
        quantity: Int
        totalprice: Int
        checkout: CheckoutForGuest
    }
    type CheckoutForGuest {
        id: ID
        address: String
        firstname: String
        lastname: String
        phone: String
        email: String
        amount: Int
        productcheckoutforguests: [ProductCheckoutForGuest]
    }
    # Query
    type Query {
        products: [Product]
        product(id: ID!): Product

        productcheckouts: [ProductCheckout]
        productcheckout(id: ID!): ProductCheckout

        productcheckoutforguests: [ProductCheckoutForGuest]
        productcheckoutforguest(id: ID!): ProductCheckoutForGuest

        checkouts: [Checkout]
        checkout(id: ID!): Checkout

        checkoutforguests: [CheckoutForGuest]
        checkoutforguest(id: ID!): CheckoutForGuest

        account(username: String, password: String) : Boolean
    }
    # Mutation
    type Mutation {
        createUser(username: String, password: String) : Boolean
        loginUser(username: String, password: String) : Boolean
        createProduct(name: String, price: Int, image: String) : Int
        createCheckout(address: String, amount: Int, product: [ProductInput]) : Int
        createCheckoutForGuest(firstname: String, lastname: String, phone: String, email: String, address: String, amount: Int, product: [ProductInput]) : Int
        updateCheckout(id: ID!, address: String) : Boolean
        updateCheckoutForGuest(id: ID!, address: String, firstname: String, lastname: String, phone: String, email: String) : Boolean
    }
`;
module.exports = typeDefs;