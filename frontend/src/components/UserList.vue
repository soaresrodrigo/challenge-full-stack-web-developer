<template>
  <v-container>
    <v-card class="mt-4">
      <v-card-title>
        <span>Listagem de usuários</span>
      </v-card-title>

      <v-data-table :headers="headers" :items="users" :items-per-page="perPage" dense class="elevation-1" show-select
        :hide-default-footer="true">
        <template #item.name="{ item }">
          <strong>{{ item.name }}</strong>
        </template>

        <template #item.email="{ item }">
          <em>{{ item.email }}</em>
        </template>

        <template #item.uuid="{ item }">
          <span>{{ item.uuid }}</span>
        </template>

        <template #item.actions="{ item }">
          <v-btn small color="primary" class="mr-2" @click="$emit('openEditModal', item)">
            Editar
          </v-btn>
          <v-btn small color="error" @click="$emit('openDeleteModal', item)">
            Excluir
          </v-btn>
        </template>

        <template #no-data>
          <v-alert type="info">Nenhum usuário encontrado.</v-alert>
        </template>
      </v-data-table>

      <v-pagination v-model:page="currentPage" :length="totalPages" class="mt-3 justify-center" color="primary"
        @update:model-value="fetchUsers" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';

export default defineComponent({
  name: 'UserList',
  setup() {
    const userStore = useUserStore();

    const users = computed(() => userStore.users);
    const currentPage = computed({
      get: () => userStore.currentPage,
      set: (value) => {
        userStore.currentPage = value;
        fetchUsers(value);
      },
    });
    const perPage = computed(() => userStore.perPage);
    const totalPages = computed(() => userStore.totalPages);

    const fetchUsers = (page = 1) => {
      userStore.fetchUsers(page);
    };

    onMounted(() => {
      fetchUsers(currentPage.value);
    });

    return {
      users,
      currentPage,
      perPage,
      totalPages,
      fetchUsers,
      headers: [
        { title: 'UUID', key: 'uuid' },
        { title: 'Nome', key: 'name' },
        { title: 'E-mail', key: 'email' },
        { title: 'Ações', key: 'actions' },
      ],
    };
  },
});
</script>
