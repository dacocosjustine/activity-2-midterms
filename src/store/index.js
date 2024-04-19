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

        deleteProduct(state, id) {
            state.products.splice(id, 1);
        },
        updateProduct(state, product) {
            state.products[product.id] = product;
        }
    },
    actions: {
        addProduct({ commit }, product) {
          commit('addProduct', product);
        }
    }
})