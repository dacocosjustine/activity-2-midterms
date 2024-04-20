<template>
    <h2>Add Product</h2>
    <div class="add-product-container">
      <form @submit.prevent="addProduct" class="add-product-form">
        <div class="form-group">
          <label for="name">Product Name</label>
          <input type="text" id="name" v-model="name" class="form-control" placeholder="Enter Product Name" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="description" class="form-control" placeholder="Enter Product Description" required>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" v-model.number="price" class="form-control" placeholder="Enter Product Price" min="0" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn-submit">Add Product</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';

  export default {
    name: 'addProduct',
    data() {
      return {
        name: '',
        description: '',
        price: ''
      };
    },
    methods: {
      addProduct() {
        if (!this.name || !this.description || !this.price) {
          return;
        }

        const product = {
          name: this.name,
          description: this.description,
          price: this.price
        };

        this.$store.dispatch('addProduct', product);
        this.name = '';
        this.description = '';
        this.price = '';

        console.log(this.$store.state.products)
        console.log(this.$store.state.productId)
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          showConfirmButton: false,
          timer: 1000
        });
      }
    }
  };
  </script>
  
  <style scoped>
  h2 {
    font-weight: bold;
    margin-bottom: 30px;
  }

  .add-product-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    background-color: #f9f9f9;
  }
  
  .add-product-container h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333; 
  }
  
  .add-product-form .form-group {
    margin-bottom: 20px;
  }
  
  .add-product-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  .add-product-form .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  .add-product-form .form-control:focus {
    border-color: #4caf50; 
  }
  
  .add-product-form .btn-submit {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: #fff; 
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease-in-out;
  }
  
  .add-product-form .btn-submit:hover {
    background-color: #45a049;
  }
  </style>
  