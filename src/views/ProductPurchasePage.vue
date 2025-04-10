<!-- src/views/ProductPurchasePage.vue -->
<template>
  <v-container v-if="loading">
    <LoadingApp />
  </v-container>
  <v-container v-else-if="!product">
    <v-row justify="center">
      <v-col cols="auto">
        <h2>Produto não encontrado</h2>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="mt-4">
    <v-card class="pa-4">
      <v-row>
        <!-- Seção de Imagens -->
        <v-col cols="12" md="6">
          <v-row class="image-container">
            <!-- Miniaturas à esquerda -->
            <v-col cols="3" class="thumbnail-column">
              <v-btn
                icon
                class="scroll-btn scroll-btn-up"
                @click="scrollThumbnails('up')"
                :disabled="scrollPosition <= 0"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <div class="thumbnail-list" ref="thumbnailList">
                <v-img
                  v-for="(image, index) in product.imageUrls"
                  :key="index"
                  :src="image"
                  :alt="product.name"
                  width="80"
                  height="80"
                  class="rounded mb-2 thumbnail"
                  :class="{ 'thumbnail-selected': selectedImage === image }"
                  @click="selectedImage = image"
                />
              </div>
              <v-btn
                icon
                class="scroll-btn scroll-btn-down"
                @click="scrollThumbnails('down')"
                :disabled="scrollPosition >= maxScroll"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-col>
            <!-- Imagem principal -->
            <v-col cols="9" class="main-image-container">
              <v-img
                :src="selectedImage || product.imageUrls[0]"
                :alt="product.name"
                max-width="100%"
                height="400"
                class="rounded main-image"
                @click="openImageModal = true"
              />
            </v-col>
          </v-row>
        </v-col>

        <!-- Detalhes do Produto -->
        <v-col cols="12" md="6">
          <h1 class="text-h4 mb-2">{{ product.name }}</h1>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            {{ product.description }}
          </p>
          <h2 class="text-h5 primary--text">R${{ product.price }}</h2>
          <p class="text-subtitle-1 text-grey-darken-1">
            Quantidade disponível: {{ product.quantity }}
          </p>
          <v-row class="mt-2">
            <v-col>
              <v-btn color="primary" @click="handleAddToCart">
                <v-icon class="mr-2" left>mdi-cart</v-icon> Adicionar ao
                carrinho
              </v-btn>
              <v-btn class="ml-2" color="success" @click="handleBuyNow">
                Comprar agora
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Modal de Pagamento -->
      <v-dialog v-model="openModal" max-width="400">
        <v-card class="pa-4">
          <h3 class="text-h6 mb-2">Confirmação de Compra</h3>
          <v-divider class="my-2" />
          <v-text-field
            v-model="customerName"
            label="Nome do Cliente"
            :error-messages="errors.name"
            class="mt-2"
          />
          <v-text-field
            v-model="pickupName"
            label="Nome para Retirada"
            :error-messages="errors.pickup"
            class="mt-2"
          />
          <v-text-field
            v-model.number="quantity"
            label="Quantidade"
            type="number"
            :min="1"
            :max="product.quantity"
            class="mt-2"
            @input="quantity = Math.max(1, quantity)"
          />
          <p class="text-body-2 mt-2">Subtotal: R${{ subtotal.toFixed(2) }}</p>
          <p class="text-body-2">Total: R${{ total.toFixed(2) }}</p>

          <v-radio-group v-model="paymentMethod" row class="mt-3">
            <template #label>
              <span class="text-subtitle-1">Método de Pagamento</span>
            </template>
            <v-radio label="À vista" value="in_sight" />
            <v-radio
              label="Parcelado em até 3x sem juros"
              value="in_installments"
            />
          </v-radio-group>

          <v-row v-if="paymentMethod === 'in_installments'" class="mt-2">
            <v-col>
              <v-select
                v-model="installments"
                :items="[1, 2, 3]"
                label="Número de parcelas"
                :item-title="
                  (num) => `${num}x de R$${(total / num).toFixed(2)}`
                "
                @update:modelValue="updateInstallmentValue"
                :item-value="(num) => num"
              />
              <p class="text-body-2 mt-2">
                Valor da Parcela: R${{ installmentValue }}
              </p>
            </v-col>
          </v-row>

          <v-row class="mt-3">
            <v-col>
              <v-btn color="primary" @click="handleConfirmPurchase"
                >Confirmar e Pagar</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <!-- Modal de Imagem em Tela Cheia -->
      <v-dialog
        v-model="openImageModal"
        max-width="100%"
        height="auto"
        @keydown="handleKeyPress"
      >
        <v-card class="pa-4 d-flex flex-column align-center justify-center">
          <v-btn icon class="absolute-top-right" @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn icon class="absolute-middle-right" @click="handleForward">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn icon class="absolute-middle-left" @click="handleBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-img
            :src="selectedImage || product.imageUrls[0]"
            :alt="product.name"
            max-width="30%"
            height="auto"
            width="30%"
            class="rounded"
          />
          <v-row
            class="mt-2 d-flex flex-nowrap"
            style="gap: 16px; overflow-x: auto"
          >
            <v-col
              v-for="(image, index) in product.imageUrls"
              :key="index"
              cols="auto"
            >
              <v-img
                :src="image"
                :alt="product.name"
                width="60"
                height="60"
                class="rounded"
                :class="{ 'border-selected': selectedImage === image }"
                @click="selectedImage = image"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  VContainer,
  VCard,
  VRow,
  VCol,
  VImg,
  VBtn,
  VIcon,
  VDialog,
  VTextField,
  VRadioGroup,
  VRadio,
  VSelect,
  VDivider,
} from "vuetify/components";
import { useCartStore } from "../stores/cart";
import { Product } from "../@types/product";
import { api } from "../providers/api";
import LoadingApp from "../components/Loading.vue";

export default defineComponent({
  name: "ProductPurchasePage",
  components: {
    VContainer,
    VCard,
    VRow,
    VCol,
    VImg,
    VBtn,
    VIcon,
    VDialog,
    VTextField,
    VRadioGroup,
    VRadio,
    VSelect,
    VDivider,
    LoadingApp,
  },
  setup() {
    const route = useRoute();
    const cartStore = useCartStore();
    const id = route.params.id as string;

    const product = ref<Product | null>(null);
    const openModal = ref(false);
    const openImageModal = ref(false);
    const selectedImage = ref<string | undefined>(undefined);
    const paymentMethod = ref<"in_sight" | "in_installments">("in_sight");
    const loading = ref(true);
    const quantity = ref(1);
    const installments = ref(1);
    const customerName = ref("");
    const pickupName = ref("");
    const errors = ref({ name: "", pickup: "" });
    const thumbnailList = ref<HTMLElement | null>(null);
    const scrollPosition = ref(0);
    const maxScroll = ref(0);

    const subtotal = computed(() =>
      product.value ? product.value.price * quantity.value : 0
    );
    const total = computed(() =>
      paymentMethod.value === "in_installments"
        ? subtotal.value
        : subtotal.value
    );
    const installmentValue = computed(() =>
      paymentMethod.value === "in_installments"
        ? (total.value / installments.value).toFixed(2) || 0
        : total.value
    );

    const toSafePayment = (payment: "in_sight" | "in_installments") =>
      ({
        in_sight: "à vista",
        in_installments: "parcelado",
      }[payment]);

    function updateInstallmentValue() {
      this.installmentValue = (this.total / this.installments).toFixed(2);
    }

    onMounted(async () => {
      try {
        const response = await api.get(`products/${id}`);
        product.value = response.data;
        loading.value = false;
        // Calcula o scroll máximo após o carregamento das imagens
        setTimeout(() => {
          if (thumbnailList.value) {
            maxScroll.value =
              thumbnailList.value.scrollHeight -
              thumbnailList.value.clientHeight;
          }
        }, 100);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        loading.value = false;
      }
    });

    const scrollThumbnails = (direction: "up" | "down") => {
      if (!thumbnailList.value) return;

      const scrollAmount = 88; // Altura da miniatura (80) + margem (8)
      const currentScroll = thumbnailList.value.scrollTop;

      if (direction === "up") {
        scrollPosition.value = Math.max(0, currentScroll - scrollAmount);
      } else {
        scrollPosition.value = Math.min(
          maxScroll.value,
          currentScroll + scrollAmount
        );
      }

      thumbnailList.value.scrollTo({
        top: scrollPosition.value,
        behavior: "smooth",
      });
    };

    const handleAddToCart = () => {
      if (product.value) {
        const stock = product.value.quantity - quantity.value;
        if (stock >= 0) {
          cartStore.addItemToCart({
            id: product.value._id,
            name: product.value.name,
            price: product.value.price,
            imageUrl: product.value.imageUrls[0],
            quantity: quantity.value,
            stock,
          });
          return;
        }
      }
      alert("Produto fora do estoque!");
    };

    const handleBack = () => {
      if (!product.value?.imageUrls.length) return;
      const ind =
        product.value.imageUrls.findIndex((f) => f === selectedImage.value) ??
        0;
      if (ind - 1 >= 0) {
        selectedImage.value = product.value.imageUrls[ind - 1];
      } else {
        selectedImage.value =
          product.value.imageUrls[product.value.imageUrls.length - 1];
      }
    };

    const handleForward = () => {
      if (!product.value?.imageUrls.length) return;
      const ind =
        product.value.imageUrls.findIndex((f) => f === selectedImage.value) ??
        0;
      if (ind < product.value.imageUrls.length - 1) {
        selectedImage.value = product.value.imageUrls[ind + 1];
      } else {
        selectedImage.value = product.value.imageUrls[0];
      }
    };

    const handleClose = () => {
      openImageModal.value = false;
      selectedImage.value = undefined;
    };

    const handleBuyNow = () => {
      openModal.value = true;
    };

    const validateFields = () => {
      const newErrors = { name: "", pickup: "" };
      if (!customerName.value) newErrors.name = "O nome é obrigatório.";
      if (!pickupName.value)
        newErrors.pickup = "O nome de quem vai retirar é obrigatório.";
      errors.value = newErrors;
      return !newErrors.name && !newErrors.pickup;
    };

    const handleConfirmPurchase = async () => {
      if (!validateFields()) return;

      const whatsappNumber = "5511932337896";
      const message = `Olá, quero comprar o produto: ${product.value?.name}%0A
      Quantidade: ${quantity.value}%0A
      Preço unitário: R$${product.value?.price}%0A
      Subtotal: R$${subtotal.value.toFixed(2)}%0A
      Total: R$${total.value.toFixed(2)}%0A
      Parcelado em: ${installments.value}x de R$${installmentValue.value}%0A
      Pagamento: ${toSafePayment(paymentMethod.value)}%0A
      Nome do cliente: ${customerName.value}%0A
      Nome para retirada: ${pickupName.value}`;

      try {
        const res = await api.post(`sales?timestamp=${new Date().getTime()}`, {
          products: [
            {
              productId: product.value?._id,
              productName: product.value?.name,
              price: product.value?.price,
              quantity: quantity.value,
            },
          ],
          subtotal: subtotal.value,
          total: total.value,
          paymentMethod: paymentMethod.value,
          installments: installments.value,
          customerName: customerName.value,
          pickupName: pickupName.value,
        });
        if (res.data.status === 201) {
          window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        }
      } catch (error) {
        console.error("Erro ao registrar a venda:", error);
        alert("Erro ao registrar a venda, tente novamente mais tarde :/");
      }
      openModal.value = false;
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleForward();
      } else if (event.key === "ArrowLeft") {
        handleBack();
      }
    };

    return {
      product,
      openModal,
      openImageModal,
      selectedImage,
      paymentMethod,
      loading,
      quantity,
      installments,
      customerName,
      pickupName,
      errors,
      subtotal,
      total,
      installmentValue,
      thumbnailList,
      scrollPosition,
      maxScroll,
      scrollThumbnails,
      handleAddToCart,
      handleBack,
      handleForward,
      handleClose,
      handleBuyNow,
      handleConfirmPurchase,
      handleKeyPress,
      updateInstallmentValue,
    };
  },
});
</script>

<style scoped>
.image-container {
  height: 450px;
}

.thumbnail-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  position: relative;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto; /* Restaurado para permitir scroll natural também */
  max-height: 360px; /* Ajustado para caber entre as setas */
  width: 100%;
  padding: 8px 0;
  scrollbar-width: none; /* Remove a barra de scroll padrão no Firefox */
}

.thumbnail-list::-webkit-scrollbar {
  display: none; /* Remove a barra de scroll padrão no Chrome/Safari */
}

.thumbnail {
  cursor: pointer;
  transition: transform 0.2s;
}

.thumbnail:hover {
  transform: scale(1.03);
}

.thumbnail-selected {
  border: 2px solid #5b1b64;
}

.main-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.main-image:hover {
  transform: scale(1.1);
}

.scroll-btn {
  position: sticky;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  margin: 4px auto;
}

.scroll-btn-up {
  top: 0;
}

.scroll-btn-down {
  bottom: 0;
}

.scroll-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.absolute-top-right {
  position: absolute;
  top: 8px;
  right: 8px;
}

.absolute-middle-right {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
}

.absolute-middle-left {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
}

.border-selected {
  border: 2px solid #5b1b64;
}
</style>