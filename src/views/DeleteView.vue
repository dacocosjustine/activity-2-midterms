<template>
    <div>
      <h2>Delete Product</h2>
      <p>Are you sure you want to delete this product?</p>
      <div class="product-details">
        <p><strong>Name:</strong> {{ product.name }}</p>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Price:</strong> {{ product.price }}</p>
      </div>
      <button @click="confirmDelete">Confirm Delete</button>
      <button @click="cancelDelete">Cancel</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['product'],
    methods: {
      confirmDelete() {
        this.$emit('delete-product', this.product.id);
      },
      cancelDelete() {
        this.$emit('cancel-delete');
      }
    }
  }

  // unused di naman connected sa vuex or something array ng list
  </script>