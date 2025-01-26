<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Usuários</v-card-title>
        <v-card-text>Controle de usuários.</v-card-text>
        <v-card-title>
          <v-btn color="primary" @click="openModal">Cadastrar</v-btn>
        </v-card-title>
        <UserList />
      </v-card>
    </v-col>
    <UserModal :isOpen="isModalOpen" @close="closeModal" @save="fetchUsers" />
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserList from '@/components/UserList.vue';
import UserModal from '@/components/UserModal.vue';
import { useUserStore } from '@/stores/userStore';

export default defineComponent({
  components: {
    UserList,
    UserModal,
  },
  setup() {
    const userStore = useUserStore();
    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const fetchUsers = () => {
      userStore.fetchUsers();
    };

    return {
      isModalOpen,
      openModal,
      closeModal,
      fetchUsers,
    };
  },
});
</script>
