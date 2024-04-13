import { createStore } from 'vuex'

export default createStore({
    state: {
        products: [

            {id: 1, name: 'Smartphone', desc: 'High-end smartphone with advanced features.', price: 12399},
            {id: 2, name: 'Laptop', desc: 'Powerful laptop for work and gaming.', price: 39999},
            {id: 3, name: 'Wireless Headphones', desc: 'Premium wireless headphones with noise-cancellation.', price: 990},
            {id: 4, name: 'Smartwatch', desc: 'Feature-packed smartwatch with fitness tracking.', price: 7099},
            {id: 5, name: 'Smart TV', desc: 'High-definition smart TV with built-in streaming apps.', price: 54990},
        ]
    },
    getters: {
        productsList: state => state.products
    },
    mutations: {
        addProduct(state, product) {
            state.products.push(product)
        },
        deleteProduct(state, id) {
            state.products.splice(id, 1);
        },
        updateProduct(state, product) {
            state.products[product.id] = product;
        }
    }
})