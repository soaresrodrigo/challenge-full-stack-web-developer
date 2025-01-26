<template>
  <v-dialog v-model="isOpen" @update:model-value="onClose" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEditMode ? 'Editar Usuário' : 'Cadastrar Usuário' }}</span>
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
import { defineComponent, ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import type { User, CreateUserDTO } from '@/repositories/userRepository';

export default defineComponent({
  name: 'UserModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    userData: {
      type: Object as () => User | null,
      default: null,
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const user = ref<User | CreateUserDTO>({ name: '', email: '' });

    watch(
      () => props.userData,
      (newUserData) => {
        if (props.isEditMode && newUserData) {
          user.value = { ...(newUserData || { name: '', email: '' }) };
        } else {
          user.value = { name: '', email: '' };
        }
      },
      { immediate: true }
    );

    const close = () => {
      emit('close');
      clearFields();
    };

    const save = async () => {
      try {
        if (props.isEditMode) {
          await userStore.updateUser(user.value as User);
        } else {
          await userStore.createUser(user.value as CreateUserDTO);
        }
        emit('save', user.value);
        close();
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    };

    const clearFields = () => {
      user.value = { name: '', email: '' };
    };

    const onClose = () => {
      clearFields();
      emit('close');
    };

    return {
      user,
      close,
      save,
      clearFields,
      onClose,
    };
  },
});
</script>
