<template>
    <v-card elevation="4">
        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="itemsFiltered"
            :items-length="items.length" :loading="loading" @update:options="loadItems">
            <template v-slot:top>
                <v-row class="ma-0">
                    <v-text-field label="Rechercher un produit" v-model="search" class="ma-2" density="comfortable"
                        placeholder="Rechercher un produit" hide-details clearable variant="outlined" />
                </v-row>
            </template>
            <template v-slot:item.edit="{ item, value }">
                <v-btn icon="mdi-pen" density="comfortable" variant="plain"
                    @click="showModal = true; productToEdit.value = item;"></v-btn>
            </template>
        </v-data-table-server>
    </v-card>
    <v-dialog v-model="showModal" width="auto">
        <v-card max-width="600" width="600" prepend-icon="mdi-pen" title="Modifier le produit" class="px-2">
            <v-form class="mt-4">
                <v-text-field variant="outlined" label="Référence produit" v-model="productToEdit.value.ref"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="Famille de produit"
                    v-model="productToEdit.value.family"></v-text-field>
                <v-text-field variant="outlined" label="Désignation" v-model="productToEdit.value.name"></v-text-field>
                <v-text-field variant="outlined" label="Référence fournisseur"
                    v-model="productToEdit.value.refSeller"></v-text-field>
                <v-text-field variant="outlined" label="Nom du fournisseur" v-model="productToEdit.value.sellerName"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="Code douanier"
                    v-model="productToEdit.value.customsId"></v-text-field>
                <v-text-field variant="outlined" label="Pays d'origine"
                    v-model="productToEdit.value.originCountry"></v-text-field>
                <v-text-field variant="outlined" label="Poids net unitaire"
                    v-model="productToEdit.value.weight"></v-text-field>
                <v-text-field variant="outlined" label="Prix net unitaire"
                    v-model="productToEdit.value.price"></v-text-field>
                <v-text-field variant="outlined" label="Flux d'approvisionnement"
                    v-model="productToEdit.value.supplyFlow" disabled></v-text-field>
                <v-text-field variant="outlined" label="Flux de transfert" v-model="productToEdit.value.transferFlow"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="Type de plateau" v-model="productToEdit.value.trayType"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="Contenant" v-model="productToEdit.value.container"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="Contenu (quantité)" v-model="productToEdit.value.quantity"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="Type d'ensachage" v-model="productToEdit.value.baggingType"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="Type d'écrin" v-model="productToEdit.value.boxType"
                    disabled></v-text-field>
                <v-text-field variant="outlined" label="SF Convoyeur" v-model="productToEdit.value.conveyorReception"
                    disabled></v-text-field>
            </v-form>
            <template v-slot:actions>
                <v-btn text="Annuler" class="ms-auto" @click="showModal = false"></v-btn>
                <v-btn color="primary" text="Enregistrer" variant="elevated"
                    @click="showModal = false; saveProduct()"></v-btn>
            </template>
        </v-card>
    </v-dialog>

</template>

<script setup>
    import { watch, ref, reactive } from "vue";
    import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";

    const itemsPerPage = ref(10);
    const loading = ref(false);
    const search = ref("");
    const showModal = ref(false);
    const productToEdit = ref({});

    const headers = [
        {
            title: "Référence",
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
            title: "",
            align: "start",
            sortable: false,
            key: "edit"
        }
    ]

    const items = [
        {
            name: "BO abeille en AG",
            family: "Boucle d'oreille",
            refSeller: "D5421",
            ref: "$MBJM094936",
            price: 24.90,
            quantity: 10,
            seller: "Aden",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 1.48,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "Collier beille en AG",
            family: "Collier",
            refSeller: "D4488",
            ref: "$MBJM095592",
            price: 29.90,
            quantity: 10,
            seller: "2Colors",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 1.15,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "Collier saphir et diamant sur or jaune",
            family: "Colliers",
            refSeller: "D2157a",
            ref: "$MBJM094624",
            price: 299.90,
            quantity: 10,
            seller: "Mon Bijoux",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "HK",
            weight: 1.29,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "Collier arbre de vie en or jaune",
            family: "Collier",
            refSeller: "D2150",
            ref: "$MBJM110217",
            price: 249.90,
            quantity: 10,
            seller: "Aden",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TR",
            weight: 1.19,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "BO rose en AG",
            family: "Boucle d'oreille",
            refSeller: "H39288",
            ref: "$MBJM096556",
            price: 19.90,
            quantity: 10,
            seller: "2Colors",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 0.8,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "BO porte bonheur fer à cheval en AG",
            family: "Boucle d'oreille",
            refSeller: "H42913",
            ref: "$MBJM094385",
            price: 19.90,
            quantity: 10,
            seller: "Mon Bijoux",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 0.4,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "Collier lettre C plaqué or en AG",
            family: "Collier",
            refSeller: "D5129C",
            ref: "$MBJM096872",
            price: 89.90,
            quantity: 10,
            seller: "Aden",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 0.8,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "Collier chat doré en AG",
            family: "Collier",
            refSeller: "FF2578",
            ref: "$MBJM096936",
            price: 7499.90,
            quantity: 10,
            seller: "2Colors",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 0.8,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "Collier turquoise et Chaine de 51 cm en AG",
            family: "Collier",
            refSeller: "D2333U",
            ref: "$MBJM095136",
            price: 39.90,
            quantity: 10,
            seller: "Mon Bijoux",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 1.2,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        },
        {
            name: "Broche hirondelle en AG 925",
            family: "Broche",
            refSeller: "D345",
            ref: "$MBJM187011",
            price: 69.90,
            quantity: 10,
            seller: "Aden",
            sellerName: "MBJ",
            customsId: "SH71159000",
            originCountry: "TH",
            weight: 0.33,
            supplyFlow: "A1",
            transferFlow: "T2",
            trayType: "PA050",
            container: "EMPL_D",
            quantity: "",
            baggingType: "",
            boxType: "0030074",
            conveyorReception: "oui"
        }
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

    function editProduct(item) {
        productToEdit.value = item;
        console.log(productToEdit)
    }

    function saveProduct() {
        items[items.findIndex(el => el.ref == productToEdit.ref)] = productToEdit;
    }
</script>