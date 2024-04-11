<template>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="items"
        :items-length="items.length" :loading="loading" :search="search" item-value="name" @update:options="loadItems">
        <template v-slot:top>
            <v-text-field v-model="name" class="ma-2" density="compact" placeholder="Rechercher un produit"
                hide-details />
        </template>
    </v-data-table-server>
</template>

<script setup>
    import { watch, ref } from "vue";

    const itemsPerPage = ref(10);
    const loading = ref(false);
    const search = ref("");
    const name = ref("");


    const headers = [
        {
            title: "Référence",
            align: "start",
            sortable: false,
            key: "ref"
        },
        {
            title: "Produit",
            align: "start",
            sortable: true,
            key: "name"
        },
        {
            title: "Famille",
            align: "start",
            sortable: true,
            key: "family",
        },
        {
            title: "Prix",
            align: "start",
            sortable: true,
            key: "price"
        },
        {
            title: "Quantité",
            align: "start",
            sortable: true,
            key: "quantity"
        }
    ]

    const items = [
        {
            name: "BO abeille en AG",
            family: "Boucle d'oreille",
            ref: "D5421",
            price: 24.90,
            quantity: 10,
        },
        {
            name: "Collier beille en AG",
            family: "Collier",
            ref: "D4488",
            price: 29.90,
            quantity: 10,
        },
        {
            name: "Collier saphir et diamant sur or jaune",
            family: "Colliers",
            ref: "D2157a",
            price: 299.90,
            quantity: 10,
        },
        {
            name: "Collier arbre de vie en or jaune",
            family: "Collier",
            ref: "D2150",
            price: 249.90,
            quantity: 10,
        },
        {
            name: "BO rose en AG",
            family: "Boucle d'oreille",
            ref: "H39288",
            price: 19.90,
            quantity: 10,
        },
        {
            name: "BO porte bonheur fer à cheval en AG",
            family: "Boucle d'oreille",
            ref: "H42913",
            price: 19.90,
            quantity: 10,
        },
        {
            name: "Collier lettre C plaqué or en AG",
            family: "Collier",
            ref: "D5129C",
            price: 89.90,
            quantity: 10,
        },
        {
            name: "Collier chat doré en AG",
            family: "Collier",
            ref: "FF2578",
            price: 7499.90,
            quantity: 10,
        },
        {
            name: "Collier turquoise et Chaine de 51 cm en AG",
            family: "Collier",
            ref: "D2333U",
            price: 39.90,
            quantity: 10,
        },
        {
            name: "Broche hirondelle en AG 925",
            family: "Broche",
            ref: "D345",
            price: 69.90,
            quantity: 10,
        },
    ]


    watch(name, (newName) => {
        console.log(newName);
    })

    function loadItems(event) {
        console.log(event)
    }
</script>