<script>
import axios from "axios";
import * as bootstrap from "bootstrap";

const url = import.meta.env.VITE_API;
const path = import.meta.env.VITE_APIPATH;

export default {
  data() {
    return {
      products: [],
      tempProd: "",
      editModal: "",
      emptyProd: {
        category: "",
        content: "",
        description: "",
        id: "",
        is_enabled: "",
        origin_price: "",
        price: "",
        title: "",
        unit: "",
        num: "",
        imageUrl: "",
        imagesUrl: [],
      },
      newImageUrl: "",
    };
  },
  methods: {
    setCookie() {
      const myCookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)jillsCookie\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common["Authorization"] = myCookie;
    },
    checkLogin() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          alert("登入狀態OK");
          this.getProducts();
        })
        .catch((err) => {
          alert("身份驗證發生問題，請再登入一次。");
          this.$router.push("/login");
        });
    },
    getProducts() {
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then((res) => {
          //console.log(res);
          this.products = Object.values(res.data.products);
        })
        .catch((err) => {
          //console.dir(err);
          alert("取得產品發生錯誤，請稍後再試。");
        });
    },
    showEditModal(id) {
      if (id !== "") {
        //編輯舊產品
        this.tempProd = this.products.filter((x) => x.id === id)[0];
      } else {
        //新增產品
        this.tempProd = JSON.parse(JSON.stringify(this.emptyProd));
      }
      this.editModal.show();
    },
    addImageUrl() {
      this.tempProd.imagesUrl.push(this.newImageUrl);
      this.newImageUrl = "";
    },
    saveData() {
      let prod = {
        data: this.tempProd,
      };
      if (this.tempProd.id) {
        //更新產品
        axios
          .put(`${url}/api/${path}/admin/product/${this.tempProd.id}`, prod)
          .then((res) => {
            //console.dir(res);
            this.getProducts();
            alert("更新成功");
            this.editModal.hide();
          })
          .catch((err) => {
            //console.dir(err);
            alert(err.message);
          });
      } else {
        //新增產品
        axios
          .post(`${url}/api/${path}/admin/product`, prod)
          .then((res) => {
            this.getProducts();
            alert("新增成功");
            this.editModal.hide();
          })
          .catch((err) => {
            //console.dir(err);
            alert(err.data.message);
          });
      }
    },
    delProd(id) {
      if (id) {
        axios
          .delete(`${url}/api/${path}/admin/product/${id}`)
          .then((res) => {
            this.getProducts();
            alert("刪除成功");
          })
          .catch((err) => {
            //console.dir(err);
            alert(err.data.message);
          });
      }
    },
  },
  mounted() {
    this.setCookie();
    this.checkLogin();

    //Modal 實體化
    //待頁面完成渲染之後，才做實體化
    this.editModal = new bootstrap.Modal(this.$refs.modal);
  },
};
</script>
<template>
  <div class="row py-3">
    <div class="col-md-12">
      <div class="row">
        <h2 class="w-50">產品列表</h2>
        <button
          class="btn btn-primary w-25 ms-auto me-0"
          type="button"
          @click="showEditModal('')"
        >
          新增產品
        </button>
      </div>
      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="150">分類</th>
            <th width="150">產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="150">是否啟用</th>
            <th width="120">編輯刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" v-bind:key="product.id">
            <td width="150">{{ product.category }}</td>
            <td width="150">{{ product.title }}</td>
            <td width="120">
              {{ product.origin_price }}
            </td>
            <td width="120">
              {{ product.price }}
            </td>
            <td width="150">
              {{ product.is_enabled == 1 ? "啓用" : "未啓用" }}
            </td>
            <td width="120">
              <div
                class="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  data-bs-target="#editModal"
                  @click="showEditModal(product.id)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="delProd(product.id)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        目前有 <span>{{ products.length }}</span> 項產品
      </p>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="container">
              <div class="row">
                <div class="col-5">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input
                    type="text"
                    class="form-control mb-2"
                    id="imageUrl"
                    v-model.lazy="tempProd.imageUrl"
                  />
                  <img
                    v-if="tempProd.imageUrl"
                    :src="tempProd.imageUrl"
                    alt="tempProd.title"
                  />
                  <label for="imagesUrl" class="form-label">其他圖片</label>
                  <input
                    type="text"
                    class="form-control"
                    id="imagesUrl"
                    v-model.lazy="newImageUrl"
                  />
                  <button
                    class="btn btn-primary my-2"
                    type="button"
                    @click="addImageUrl"
                  >
                    新增圖片
                  </button>
                  <img
                    class="my-2"
                    v-for="url in tempProd.imagesUrl"
                    :src="url"
                    alt="tempProd.title"
                    :key="url"
                  />
                </div>
                <div class="col-7">
                  <div class="row mb-3">
                    <label for="title" class="col-sm-2 col-form-label"
                      >品名</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        v-model="tempProd.title"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="category" class="col-sm-2 col-form-label"
                      >類別</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="category"
                        name="category"
                        v-model.trim="tempProd.category"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="origin_price" class="col-sm-2 col-form-label"
                      >原價</label
                    >
                    <div class="col-sm-10">
                      <input
                        class="form-control"
                        id="origin_price"
                        name="origin_price"
                        type="number"
                        v-model.number="tempProd.origin_price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="price" class="col-sm-2 col-form-label"
                      >價格</label
                    >
                    <div class="col-sm-10">
                      <input
                        class="form-control"
                        id="price"
                        name="price"
                        type="number"
                        v-model.number="tempProd.price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="unit" class="col-sm-2 col-form-label"
                      >單位</label
                    >
                    <div class="col-sm-10">
                      <input
                        class="form-control"
                        id="unit"
                        name="unit"
                        type="text"
                        v-model.trim="tempProd.unit"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="content" class="col-sm-2 col-form-label"
                      >内容</label
                    >
                    <div class="col-sm-10">
                      <textarea
                        class="form-control"
                        id="content"
                        name="content"
                        v-model="tempProd.content"
                      ></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="description" class="col-sm-2 col-form-label"
                      >説明</label
                    >
                    <div class="col-sm-10">
                      <textarea
                        class="form-control"
                        id="description"
                        name="description"
                        v-model="tempProd.description"
                      ></textarea>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="is_enabled" class="col-sm-2 col-form-label"
                      >狀態</label
                    >
                    <div class="col-sm-10">
                      <div
                        class="form-check form-check-inline"
                        style="
                          padding-top: calc(0.375rem + 1px);
                          padding-bottom: calc(0.375rem + 1px);
                        "
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          name="is_enabled"
                          id="is_enabled1"
                          value="1"
                          v-model.number="tempProd.is_enabled"
                        />
                        <label class="form-check-label" for="is_enabled1"
                          >啓用</label
                        >
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="is_enabled"
                          id="is_enabled0"
                          value="0"
                          v-model.number="tempProd.is_enabled"
                        />
                        <label class="form-check-label" for="is_enabled0"
                          >未啓用</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveData">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
