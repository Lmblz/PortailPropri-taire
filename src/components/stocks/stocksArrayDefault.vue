<template>
    <v-card elevation="4">
        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="itemsFiltered"
            :items-length="items.length" :loading="loading" @update:options="loadItems">
            <template v-slot:top>
                <v-row class="ma-0">
                    <v-text-field label="Rechercher un produit" v-model="search" class="ma-2" density="comfortable"
                        placeholder="Rechercher un produit" hide-details clearable variant="outlined" />
                    <v-autocomplete class="ma-2" clearable label="Rechercher un vendeur" density="comfortable"
                        variant="outlined" hide-details @update:modelValue="searchSellers" :items="sellers" />
                </v-row>
            </template>
        </v-data-table-server>
    </v-card>

</template>

<script setup>
    import { watch, ref } from "vue";

    const itemsPerPage = ref(10);
    const loading = ref(false);
    const search = ref("");


    const headers = [
        {
            title: "Réf.",
            align: "start",
            sortable: false,
            key: "ref"
        },
        {
            title: "Réf. vendeur",
            align: "start",
            sortable: false,
            key: "refSeller"
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
        },
        {
            title: "Vendeur",
            align: "start",
            sortable: true,
            key: "seller"
        }
    ]

    const items = [
        {
            name: "BO abeille en AG",
            family: "Boucle d'oreille",
            refSeller: "D5421",
            ref: "ref",
            price: 24.90,
            quantity: 10,
            seller: "Aden"
        },
        {
            name: "Collier beille en AG",
            family: "Collier",
            refSeller: "D4488",
            ref: "ref",
            price: 29.90,
            quantity: 10,
            seller: "2Colors"
        },
        {
            name: "Collier saphir et diamant sur or jaune",
            family: "Colliers",
            refSeller: "D2157a",
            ref: "ref",
            price: 299.90,
            quantity: 10,
            seller: "Mon Bijoux"
        },
        {
            name: "Collier arbre de vie en or jaune",
            family: "Collier",
            refSeller: "D2150",
            ref: "ref",
            price: 249.90,
            quantity: 10,
            seller: "Aden"
        },
        {
            name: "BO rose en AG",
            family: "Boucle d'oreille",
            refSeller: "H39288",
            ref: "ref",
            price: 19.90,
            quantity: 10,
            seller: "2Colors"
        },
        {
            name: "BO porte bonheur fer à cheval en AG",
            family: "Boucle d'oreille",
            refSeller: "H42913",
            ref: "ref",
            price: 19.90,
            quantity: 10,
            seller: "Mon Bijoux"
        },
        {
            name: "Collier lettre C plaqué or en AG",
            family: "Collier",
            refSeller: "D5129C",
            ref: "ref",
            price: 89.90,
            quantity: 10,
            seller: "Aden"
        },
        {
            name: "Collier chat doré en AG",
            family: "Collier",
            refSeller: "FF2578",
            ref: "ref",
            price: 7499.90,
            quantity: 10,
            seller: "2Colors"
        },
        {
            name: "Collier turquoise et Chaine de 51 cm en AG",
            family: "Collier",
            refSeller: "D2333U",
            ref: "ref",
            price: 39.90,
            quantity: 10,
            seller: "Mon Bijoux"
        },
        {
            name: "Broche hirondelle en AG 925",
            family: "Broche",
            refSeller: "D345",
            ref: "ref",
            price: 69.90,
            quantity: 10,
            seller: "Aden"
        },
    ]

    const sellers = [
        "Mon Bijoux",
        "2Colors",
        "Aden"
    ]

    const itemsFiltered = ref([])

    items.forEach((item) => {
        itemsFiltered.value.push(item);
    })

    watch(search, (newSearch) => {
        newSearch = newSearch.toLowerCase()
        let match = items.filter(el =>
            el.name.toLowerCase().includes(newSearch) ||
            el.ref.toLowerCase().includes(newSearch) ||
            el.refSeller.toLowerCase().includes(newSearch)
        );
        itemsFiltered.value = match;

    })

    function loadItems(event) {
        console.log(event)
    }

    function searchSellers(event) {
        console.log(event);
        // event.forEach((seller) => {

        // })
        let match = itemsFiltered.value.filter(el => el.seller == event);
        itemsFiltered.value = match;
    }
</script>