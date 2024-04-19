import { createStore } from 'vuex'

export default createStore({
    state: {
        products: 
        [
            {id: 1, name: 'Smartphone', description: 'High-end smartphone with advanced features.', price: 12399},
            {id: 2, name: 'Laptop', description: 'Powerful laptop for work and gaming.', price: 39999},
            {id: 3, name: 'Wireless Headphones', description: 'Premium wireless headphones with noise-cancellation.', price: 990},
            {id: 4, name: 'Smartwatch', description: 'Feature-packed smartwatch with fitness tracking.', price: 7099},
            {id: 5, name: 'Smart TV', description: 'High-definition smart TV with built-in streaming apps.', price: 54990},
        ],
        productId: 0
    },

    getters: {
        productsList: state => state.products
    },

    mutations: {
        addProduct(state, product) {
            state.products.push({
              id: state.productId,
              ...product
            });
            state.productId++;
        },

        edit_data(state, {id, name, description, price}) {
            const product = state.products.find(product => product.id === id);
            if (product) {
            product.name = name;
            product.description = description;
            product.price = price;
            }
        },

        deleteProduct(state, id) {
            const index = state.products.findIndex(product => product.id === id);
            if (index !== -1) {
                state.products.splice(index, 1);
            }
        },
        updateProduct(state, product) {
            state.products[product.id] = product;
        }
    },
    actions: {
        addProduct({ commit }, product) {
          commit('addProduct', product);
        },

        editProduct({commit}, {id, name, description, price}) {
            commit('edit_data', {id, name, description, price});
        },

        deleteProduct({commit}, id) {
            commit('deleteProduct', id);
        }
        
    }
})