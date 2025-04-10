<template>
  <v-container class="d-flex justify-center pa-2">
    <v-form
      @submit.prevent="handleSubmit"
      style="width: 100%; max-width: 600px"
    >
      <v-text-field
        v-model="dados.searchInput"
        label="Pesquisar"
        variant="outlined"
        append-inner-icon="mdi-magnify"
        @click:append-inner="handleSubmit"
        clearable
      />
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { VContainer, VForm, VTextField } from "vuetify/components";
import { Product } from "../@types/product";
import { search } from "../providers/product";

export default defineComponent({
  name: "SearchInput",
  components: { VContainer, VForm, VTextField },
  props: {
    data: {
      type: Object as () => { searchInput?: string },
      required: true,
    },
    onSearch: {
      type: Function as unknown as () => (list: Product[]) => void,
      required: true,
    },
    setLoading: {
      type: Function as unknown as () => (flag: boolean) => void,
      required: true,
    },
  },
  setup(props) {
    console.log(
      "setLoading é uma função?",
      typeof props.setLoading === "function"
    );
    const dados = ref({
      ...props.data,
      searchInput: props.data.searchInput || "",
    });

    const handleSubmit = async () => {
      const searchParams = dados.value.searchInput;
      const result = await search(1, searchParams);
      if (result?.items) {
        props.onSearch(result.items);
      }
    };

    return { dados, handleSubmit };
  },
});
</script>