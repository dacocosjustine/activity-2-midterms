<template>
    <div>
        <product-list></product-list>
    </div>
</template>

<script>

import ProductList from '@/components/ProductList.vue';
export default {
    name: 'productView',
    components: {
        ProductList
    }
}
</script>