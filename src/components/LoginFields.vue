<template>
  <div>
    <v-text-field
      v-model="form.email"
      label="E-mail"
      variant="outlined"
      :error-messages="touched.email && errors.email ? errors.email : ''"
      class="mt-2"
      autofocus
      @blur="touched.email = true"
    />
    <v-text-field
      v-model="form.password"
      label="Senha"
      type="password"
      variant="outlined"
      :error-messages="
        touched.password && errors.password ? errors.password : ''
      "
      class="mt-2"
      @blur="touched.password = true"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { VTextField } from "vuetify/components";
import { LoginValues } from "../@types/login";

export default defineComponent({
  name: "LoginFields",
  components: { VTextField },
  props: {
    modelValue: {
      type: Object as PropType<LoginValues>,
      required: true,
    },
    errors: {
      type: Object as PropType<{ email: string; password: string }>,
      default: () => ({ email: "", password: "" }),
    },
    touched: {
      type: Object as PropType<{ email: boolean; password: boolean }>,
      default: () => ({ email: false, password: false }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const form = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return { form, touched: props.touched, errors: props.errors };
  },
});
</script>