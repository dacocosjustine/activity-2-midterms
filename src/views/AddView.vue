<template>
     <h1>Add Product Page</h1>
    <AddProduct></AddProduct>
        <form @submit.prevent="addProduct">
            <div>
                <label for="productName">Product Name:</label>
                <input type="text" id="productName" v-model="newProduct.name" required>
            </div>
            <div>
                <label for="productDescription">Description:</label>
                <textarea id="productDescription" v-model="newProduct.description" required></textarea>
            </div>
            <div>
                <label for="productPrice">Price:</label>
                <input type="number" id="productPrice" v-model.number="newProduct.price" required>
            </div>
            <button type="submit">Add Product</button>
        </form>

        <hr>

        <h2>Product List</h2>
        <ul>
            <li v-for="(product, index) in products" :key="index">
                <strong>{{ product.name }}</strong> - {{ product.description }} - ${{ product.price }}
            </li>
        </ul>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue';

export default {
        data() {
            return {
                newProduct: {
                    name: '',
                    description: '',
                    price: null
                },
                products: []
            }
        },
        methods: {
            //  Add new product
                addProduct() {
                    this.products.push({
                        name: this.newProduct.name,
                        description: this.newProduct.description,
                        price: this.newProduct.price
                    });

                    this.newProduct.name = '';
                    this.newProduct.description = '';
                    this.newProduct.price = null;
                }
        }
    }
</script>