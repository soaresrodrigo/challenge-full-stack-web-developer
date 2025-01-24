<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Usuários</v-card-title>
        <v-card-text>
          Controle de usuários.
        </v-card-text>
        <v-card-title>
        <v-btn color="primary" @click="() => console.log('teste')">Cadastrar</v-btn>
      </v-card-title>
        <UserList />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserList from '@/components/UserList.vue';

export default defineComponent({
  components: {
    UserList,
  },
});
</script>
