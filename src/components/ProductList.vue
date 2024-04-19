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
              <div v-if="product.editMode"><input type="text" v-model="productName" placeholder="Edit Name" class="edit-input" style="text-align: center;" required></div>
            </Transition>
          </td>
          <td>
            <div>{{ product.description }}</div>
            <Transition name="bounce">
              <div v-if="product.editMode"><input type="text" v-model="productDescription" placeholder="Edit Description" class="edit-input" style="text-align: center;" required></div>
            </Transition>
          </td>
          <td>
            <div>${{ product.price }}</div>
            <Transition name="bounce">
              <div v-if="product.editMode"><input type="number" v-model="productPrice" placeholder="Edit Price" class="edit-input" style="text-align: center;" required></div>
            </Transition>
          </td>
          <td>
            <button v-if="!product.editMode" @click="toggleEdit(product)">Edit</button>
            <template v-else>
              <button @click="saveEdit(product)">Save</button>
              <button @click="cancelEdit(product)">Cancel</button>
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

    saveEdit(product) {

      if (!this.productName && !this.productPrice) {
        alert('Edit Cannot be Empty');
        return
      } else {
          if (!this.productName) {
          alert('Name Cannot be Empty');
          return
        } else if (!this.productPrice) {
          alert('Price Cannot be Empty')
          return
        } else {
          this.$store.dispatch('editBook', {
            id: this.id,
            name: this.productName, 
            description: this.productDescription,
            price: this.productPrice 
          });

          this.productName = '';
          this.productDescription
          this.productPrice = '';
        }
      }
    

      console.log(this.$store.getters.products)
      product.editMode = false;
    },

    cancelEdit(product) {
      this.productName = '';
      this.productDescription = '';
      this.productName = '';
      product.editMode = false;
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
