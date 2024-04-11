<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <component :is="showItemsArray" />
</template>

<script setup>
    import { useUserStore } from "@/stores/user";
    import itemsArrayDefault from "@/components/items/itemsArrayDefault.vue";
    import itemsArraySeller from "@/components/items/itemsArraySeller.vue";

    const user = useUserStore();
    const showItemsArray = user.right == "seller" ? itemsArraySeller : itemsArrayDefault;
</script>