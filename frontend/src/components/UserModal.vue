<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Nome" v-model="user.name" required></v-text-field>
          <v-text-field label="E-mail" v-model="user.email" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="close">Cancelar</v-btn>
        <v-btn color="blue darken-1" @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import type { User } from '@/repositories/userRepository';

export default defineComponent({
  name: 'UserModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Cadastrar Usuário',
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const user = ref<User>({ uuid: '', name: '', email: '' });

    const close = () => {
      emit('close');
    };

    const save = async () => {
      try {

        await userStore.createUser(user.value);
        emit('save', user.value);
        close();
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    };

    return {
      user,
      close,
      save,
    };
  },
});
</script>
