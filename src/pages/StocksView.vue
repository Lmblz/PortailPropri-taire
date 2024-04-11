<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <h1 class="mb-2">Consultation des stocks</h1>
    <component :is="showStocksArray" />
</template>

<script setup>
    import { useUserStore } from "../stores/user";
    import stocksArrayDefault from "@/components/stocks/stocksArrayDefault.vue";
    import stocksArraySeller from "@/components/stocks/stocksArraySeller.vue";

    const user = useUserStore();
    const showStocksArray = user.right == "seller" ? stocksArraySeller : stocksArrayDefault;
</script>