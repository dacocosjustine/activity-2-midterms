<template>
  <div class="container">
    <h2>Listahan ng Produkto</h2>
    <table class="product-table">
      <thead>
        <tr>
          <th style="width: 20%;">Product Name</th>
          <th style="width: 20%;">Product Description</th>
          <th style="width: 20%;">Product Price</th>
          <th style="width: 30%;">Action</th>
        </tr>
      </thead>
        <transition-group tag="tbody">
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
            <div>₱{{ product.price }}</div>
            <Transition name="bounce">
              <div v-if="product.editMode"><input type="number" v-model="productPrice" placeholder="Edit Price" class="edit-input" style="text-align: center;" min="0" required></div>
            </Transition>
          </td>
          <td>
            <button v-if="!product.editMode" @click="toggleEdit(product)">Edit</button>
            <template v-else>
              <button @click="saveEdit(product)">Save</button>
              <button @click="cancelEdit(product)">Cancel</button>
            </template>
            <button @click="deleteProduct(product)">Delete</button>
          </td>
        </tr>
      </transition-group>
      <transition>
        <tr v-if="products.length === 0">
          <td colspan="4">No Products Added</td>
        </tr>
      </transition>
    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

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

      if (!this.productName && !this.productDescription && !this.productPrice) {
        alert('Edit Fields Cannot be Empty');
        return
      } else {
          if (!this.productName) {
          alert('Name Cannot be Empty');
          return
        } else if (!this.productDescription) {
          alert('Description Cannot be Empty')
          return
        } else {
          if (!this.productPrice) {
            alert('Price Cannot be Empty')
            return
          } else {
            if (this.productPrice < 0) {
              alert('Price Cannot be negative values')
            } else {
              this.$store.dispatch('editProduct', {
                id: this.id,
                name: this.productName, 
                description: this.productDescription,
                price: this.productPrice 
              });
            }
          }

          this.productName = '';
          this.productDescription = '';
          this.productPrice = '';
        }
      }
    

      //console.log(this.$store.getters.productsList)
      product.editMode = false;
    },

    cancelEdit(product) {
      this.productName = '';
      this.productDescription = '';
      this.productPrice = '';
      product.editMode = false;
    },

    deleteProduct(product) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#adb5bd",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteConfirmed(product);
        }
      });
    },

    deleteConfirmed(product) {
      this.$store.dispatch('deleteProduct', product.id)
        .then(() => {
          Swal.fire({
            icon: "warning",
            title: "Product Deleted!",
            showConfirmButton: false,
            timer: 1000
          });
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the product.",
            icon: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
}

h2 {
  font-weight: bold;
  margin-bottom: 30px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.product-table th {
  background-color: #ededfa;
}

.edit-input {
  width: 100%;
  padding-block: 5px;
  margin-inline: 100px, 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:nth-child(1) {
  background-color: #007bff;
}

button:nth-child(2) {
  background-color: red;
}

button:nth-child(1):hover {
  background-color: #0056b3;
}

button:nth-child(2):hover {
  background-color: #820300;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
