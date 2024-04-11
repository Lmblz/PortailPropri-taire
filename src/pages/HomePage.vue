<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row>
    <v-col cols="4" v-for="(entry, index) in entriesFiltered" :key="index">
      <v-card elevation="3" :title="entry.label" :subtitle="entry.description" :to="entry.path">
        <v-card-item>
          <!-- Find illustrations here : https://undraw.co/illustrations -->
          <v-img class="mx-auto mb-2" :src="'/logo-pages/' + entry.picture" :height="100" centered />
          <p>coucou</p>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import { useUserStore } from '../stores/user';
  import { ref } from 'vue';

  const user = useUserStore();
  const userRight = user.right;
  const entriesFiltered = ref([]);

  const entries = [
    {
      label: "Stocks",
      description: "Consultation des stocks des produits",
      picture: "stocks.svg",
      path: "/stocks",
      rights: [
        "admin", "seller", "logistic"
      ]
    },
    {
      label: "Commandes",
      description: "État et historique des commandes",
      picture: "commandes.svg",
      path: "/commands",
      rights: [
        "admin", "seller", "logistic"
      ]
    },
    {
      label: "Articles",
      description: "Ajout et expédition des produits",
      picture: "articles.svg",
      path: "/items",
      rights: [
        "admin", "seller", "logistic"
      ]
    }
  ]

  entries.forEach((entry) => {
    if (entry.rights.includes(userRight)) entriesFiltered.value.push(entry);
  })
</script>
