<template>
  <div>
    <h2>Product List</h2>
    <table class="product-table">
      <thead>
        <tr>
          <th style="width: 20%;">Product Name</th>
          <th style="width: 20%;">Product Description</th>
          <th style="width: 20%;">Product Price</th>
          <th style="width: 30%;">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <div>{{ product.name }}</div>
            <Transition name="bounce">
              <div v-if="product.editMode"><input type="text" v-model="productName" placeholder="edit name" class="edit-input" style="text-align: center;" required></div>
            </Transition>
          </td>
          <td>
            <div>{{ product.description }}</div>
            <Transition name="bounce">
              <div v-if="product.editMode"><input type="number" v-model="productDescription" placeholder="edit price" class="edit-input" style="text-align: center;" required></div>
            </Transition>
          </td>
          <td>
            <div>${{ product.price }}</div>
            <Transition name="bounce">
              <div v-if="product.editMode"><input type="number" v-model="productPrice" placeholder="edit price" class="edit-input" style="text-align: center;" required></div>
            </Transition>
          </td>
          <td>
            <button v-if="!product.editMode" @click="toggleEdit(book)">Edit</button>
            <template v-else>
              <button @click="saveEdit(book)">Save</button>
              <button @click="cancelEdit(book)">Cancel</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'productList',
  data() {
    return {
      id: '',
      productName: '',
      productDescription: '',
      productPrice: '',
      show: false
    };
  },

  computed: {
    products() {
      return this.$store.getters.productsList;
    }
  },

  methods: {
    toggleEdit(product) {
      this.products.forEach(i => {
        if (i.id !== product.id) {
          i.editMode = false;
        }
      });

      this.id = product.id;
      product.editMode = true;
    },

    saveEdit(book) {

      if (!this.bookName && !this.bookPrice) {
        alert('Edit Cannot be Empty');
        return
      } else {
          if (!this.bookName) {
          alert('Name Cannot be Empty');
          return
        } else if (!this.bookPrice) {
          alert('Price Cannot be Empty')
          return
        } else {
          this.$store.dispatch('editBook', {
            id: this.id,
            name: this.bookName, 
            price: this.bookPrice 
          });

          this.bookName = '';
          this.bookPrice = '';
        }
      }
    

      console.log(this.$store.getters.bookList)
      book.editMode = false;
    },

    cancelEdit(book) {
      this.bookName = '';
      this.bookPrice = '';
      book.editMode = false;
    }
  }
};
</script>

<style scoped>
.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f2f2f2;
}
</style>
