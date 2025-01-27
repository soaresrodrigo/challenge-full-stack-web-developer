<template>
  <v-dialog data-cy="user-modal" v-model="isOpen" @update:model-value="onClose" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEditMode ? 'Editar Usuário' : 'Cadastrar Usuário' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="userForm" v-model="valid">
          <v-text-field label="Nome" v-model="user.name" :rules="[rules.required]" required
            data-cy="user-input-name"></v-text-field>
          <v-text-field label="E-mail" v-model="user.email" :rules="[rules.required, rules.email]" required
            data-cy="user-input-email"></v-text-field>
          <v-text-field label="UUID" v-model="user.uuid" :readonly="isEditMode" required append-outer-icon="mdi-refresh"
            @click:append-outer="generateUuid" data-cy="user-input-uuid"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn data-cy="user-modal-btn-cancel" color="blue darken-1" @click="close">Cancelar</v-btn>
        <v-btn data-cy="user-modal-btn-salvar" color="blue darken-1" :disabled="!valid" @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.message }}
      <v-btn color="white" @click="snackbar.show = false">Fechar</v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { v4 as uuidv4 } from 'uuid';
import type { User } from '@/repositories/userRepository';

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
    const emptyUser = { uuid: uuidv4(), name: '', email: '' };
    const userStore = useUserStore();
    const user = ref<User>(emptyUser);
    const valid = ref(false);
    const snackbar = ref({
      show: false,
      message: '',
      color: '',
      timeout: 3000,
    });

    const rules = {
      required: (value: string) => !!value || 'Campo obrigatório',
      email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail deve ser válido',
    };

    watch(
      () => props.userData,
      (newUserData) => {
        user.value = props.isEditMode && newUserData ? { ...newUserData } : { ...emptyUser, uuid: uuidv4() };
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
          await userStore.updateUser(user.value.uuid, user.value as User);
          showSnackbar('Usuário atualizado com sucesso!', 'success');
        } else {
          await userStore.createUser(user.value as User);
          showSnackbar('Usuário criado com sucesso!', 'success');
        }
        emit('save', user.value);
        close();
      } catch (error: any) {
        console.error('Erro ao salvar usuário:', error);
        showSnackbar(error.response?.data?.message || 'Erro ao salvar usuário.', 'error');
      }
    };

    const clearFields = () => {
      user.value = { ...emptyUser, uuid: uuidv4() };
    };

    const onClose = () => {
      clearFields();
      emit('close');
    };

    const showSnackbar = (message: string, color: string) => {
      snackbar.value.message = message;
      snackbar.value.color = color;
      snackbar.value.show = true;
    };

    const generateUuid = () => {
      if (!props.isEditMode) user.value.uuid = uuidv4();
    };

    return {
      user,
      valid,
      close,
      save,
      clearFields,
      onClose,
      snackbar,
      showSnackbar,
      generateUuid,
      rules,
    };
  },
});
</script>
