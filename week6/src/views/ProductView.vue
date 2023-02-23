<script>
import axios from "axios";
import Modal from "../components/ModalComponent.vue";
import Cart from "../views/CartView.vue";

const url = import.meta.env.VITE_API;
const path = import.meta.env.VITE_APIPATH;

export default {
  data() {
    return {
      products: [],
      currentProduct: {},
      loader: "",
    };
  },
  methods: {
    getProductData() {
      this.loader = this.$loading.show();
      axios
        .get(`${url}/api/${path}/products/all`)
        .then(({ data }) => {
          //console.log(prodRes);
          this.products = data.products.filter((x) => x.is_enabled * 1 === 1);
        })
        .catch((err) => {
          //console.dir(err);
          alert("取得產品資訊有誤，請稍後再試。");
        })
        .finally(() => {
          this.loader.hide();
        });
    },
    showDetails(id) {
      this.currentProduct = this.products.find((x) => x.id === id);
      this.$refs.modal.showModal();
      //console.log(this.$refs);
    },
    addToCart(product_id, qty = 1) {
      this.$refs.cart.addToCart(product_id, qty);
      this.$refs.modal.hideModal();
      this.$refs.modal.count = 1;
    },
  },
  mounted() {
    this.getProductData();
  },
  components: {
    Modal,
    Cart,
  },
};
</script>
<template>
  <div class="mt-4">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in products" :key="prod.id">
          <td style="width: 200px">
            <img
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
              :src="prod.imageUrl"
              :alt="prod.title"
            />
          </td>
          <td>
            {{ prod.title }}
          </td>
          <td>
            <div class="h5">{{ prod.price }} 元</div>
            <del class="h6">原價 {{ prod.origin_price }} 元</del>
            <div class="h5">現在只要 {{ prod.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="showDetails(prod.id)"
              >
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(prod.id)"
              >
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <modal
    :temp-prod="currentProduct"
    :add-to-cart="addToCart"
    ref="modal"
  ></modal>
  <div class="d-none">
    <cart ref="cart"></cart>
  </div>
</template>

<style></style>
