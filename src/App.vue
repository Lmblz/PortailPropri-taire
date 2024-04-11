<template>
  <v-app class="app">
    <header class="header">
      <v-card class="header__content ma-3 mb-6" title="Portail Propriétaire" elevation="4" color="primary" to="/">
        <template v-slot:prepend>
          <v-img src='/logo_poincon.png' :width="40" contain></v-img>
        </template>
      </v-card>
    </header>
    <v-main class="mx-3">
      <v-row>
        <v-col cols="1" class="d-flex justify-center align-center flex-column" style="height: fit-content;">
          <v-row class="ma-0">
            <v-card rounded="pill" elevation="2">
              <v-avatar color="surface" size="large" v-if="user.isAuth && user.name !== ''">
                {{ user.name.split(' ')[0][0] + user.name.split('')[1][0] }}
              </v-avatar>
            </v-card>
          </v-row>
          <v-row class="ma-0 mt-5" v-if="hasMenu">
            <v-card class="mx-auto" rounded="pill" elevation="2">
              <v-list density="compact" class="menu">
                <v-list-item v-for="(item, i) in menu" :key="i" :value="item" color="primary" :to="item.path"
                  class="menu__item py-4 px-1 text-center">
                  <v-icon :icon="'mdi-' + item.icon"></v-icon>
                  <p class="text-xs">{{ item.name }}</p>
                </v-list-item>
              </v-list>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="11">
          <router-view />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref, watch } from "vue";
  import { useUserStore } from "./stores/user";
  import { useRouter } from "vue-router";

  const user = useUserStore();
  const hasMenu = ref(false);
  const menu = ref([]);
  const router = useRouter();
  const routeMeta = ref(router.currentRoute);

  watch(routeMeta, (value) => {
    hasMenu.value = value.meta.hasMenu;
    if (value.meta.menuChildren && value.meta.menuChildren.length > 0) {
      value.meta.menuChildren.forEach((item) => {
        if (menu.value.findIndex(el => el.name == item.name) == -1) menu.value.push(item);
      })
    }
  })

</script>

<style lang="scss">
  .menu {
    &__item {
      .v-list-item__overlay {
        background: none !important;
      }

      .v-list-item__content {
        color: #000000de !important;
      }

      .text-xs {
        font-size: .625rem;
      }
    }
  }
</style>