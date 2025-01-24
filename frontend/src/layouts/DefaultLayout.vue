<template>
  <v-app>
    <v-app-bar app color="grey-darken-4" dark>
      <v-app-bar-title class="font-weight-bold">Obi.Tec</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn v-for="menu in menus" :key="menu.name" :to="menu.path" class="text-white">
        {{ menu.name }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMenuStore } from '@/stores/menuStore';

export default defineComponent({
  setup() {
    const menuStore = useMenuStore();
    return {
      menus: menuStore.menus,
    };
  },
});
</script>
