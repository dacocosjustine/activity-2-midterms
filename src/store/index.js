import { createStore } from 'vuex'

export default createStore({
    state: {
        products: [],
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