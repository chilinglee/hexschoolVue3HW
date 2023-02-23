const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'jillian-chilinglee';
export default {
  props: ['loadings'],
  data() {
    return {
      cartDetails: {},
      loader: '',
    };
  },
  template: `
    <div v-if="cartDetails?.carts?.length">
    <div class="text-end">
                    <button class="btn btn-outline-danger" type="button" @click="removeCart('all')">清空購物車</button>
                </div>
                <table class="table align-middle">
                    <thead>
                        <tr>
                            <th></th>
                            <th>品名</th>
                            <th style="width: 150px">數量/單位</th>
                            <th class="text-end">單價</th>
                            <th class="text-end">小計</th>
                        </tr>
                    </thead>
                    <tbody><tr v-for="item in cartDetails.carts">
    <td>
        <button type="button" class="btn btn-outline-danger btn-sm" :disabled="loadings.removeCart" @click="removeCart(item.id)">
            <i class="fas fa-spinner fa-pulse" v-show="loadings.removeCart"></i>
            x
        </button>
    </td>
    <td>
        {{ item.product.title }}
        <div class="text-success">
            已套用優惠券
        </div>
    </td>
    <td>
        <div class="input-group input-group-sm">
            <div class="input-group mb-3">
                <input min="1" type="number" class="form-control" :value="item.qty" @change.lazy="(event) => changeQty(item.id, item.product.id,event)">
                <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
            </div>
        </div>
    </td>
    <td class="text-end">
        <small class="text-success">折扣價：</small>
        {{ item.product.price }}
    </td>
    <td class="text-end">
        {{ item.total }}
    </td>
</tr></tbody>
<tfoot>
    <tr>
        <td colspan="4" class="text-end">總計</td>
        <td class="text-end">{{ cartDetails.total}}</td>
    </tr>
    <tr>
        <td colspan="4" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cartDetails.final_total }}</td>
    </tr>
</tfoot>
</table>
</div>
<div v-else>購物車無商品</div>
<div class="my-5 row justify-content-center">
          <v-form
            ref="form"
            class="col-md-6"
            v-slot="{ errors }"
            @submit="onSubmit"
          >
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
              >
              </v-field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field
                id="name"
                name="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['name'] }"
                placeholder="請輸入姓名"
                rules="required"
              ></v-field>
              <error-message
                name="name"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人手機</label>
              <v-field
                id="tel"
                name="phone"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['phone'] }"
                placeholder="請輸入手機號碼: 09xxxxxxxx"
                :rules="isPhone"
              ></v-field>
              <error-message
                name="phone"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field
                id="address"
                name="address"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['address'] }"
                placeholder="請輸入地址"
                rules="required"
              ></v-field>
              <error-message
                name="address"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <v-field v-slot="{ field }" name="message">
    <textarea v-bind="field" name="message" id="message" class="form-control" cols="30" rows="10"/>
  </v-field>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger">送出訂單</button>
            </div>
          </v-form>
        </div>`,
  methods: {
    getCartData() {
      axios
        .get(`${url}/api/${path}/cart`)
        .then((cartRes) => {
          //console.log(prodRes);
          this.cartDetails = cartRes.data.data;
        })
        .catch((err) => {
          //console.dir(err);
          alert('取得購物車資訊有誤，請稍後再試。');
        });
    },
    addToCart(product_id, qty = 1) {
      this.loadings.addToCart = true;
      const currentCart = this.cartDetails.carts.find(
        (x) => x.product.id === product_id
      );

      if (currentCart) {
        const tempCart = {
          product_id,
          qty: currentCart.qty + qty,
        };
        axios
          .put(
            `${url}/api/${path}/cart/${currentCart.id}`,
            JSON.stringify({ data: tempCart }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            return axios.get(`${url}/api/${path}/cart`);
          })
          .then(({ data }) => {
            this.cartDetails = data.data;
            alert('新增購物車成功');
          })
          .catch((err) => {
            //console.dir(err);
            alert('新增購物車失敗，請稍後再試。');
          })
          .finally(() => {
            this.loadings.addToCart = false;
          });
      } else {
        const newCart = {
          product_id,
          qty,
        };
        axios
          .post(`${url}/api/${path}/cart`, JSON.stringify({ data: newCart }), {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            return axios.get(`${url}/api/${path}/cart`);
          })
          .then(({ data }) => {
            this.cartDetails = data.data;
            alert('新增購物車成功');
          })
          .catch((err) => {
            //console.dir(err);
            alert('新增購物車失敗，請稍後再試。');
          })
          .finally(() => {
            this.loadings.addToCart = false;
            //this.$refs.modal.hideModal();
          });
      }
    },
    removeCart(cartId) {
      this.loadings.removeCart = true;
      if (cartId === 'all') {
        axios
          .delete(`${url}/api/${path}/carts`)
          .then((res) => {
            alert('刪除所有購物車成功');
            this.cartDetails.carts = [];
          })
          .catch((err) => {
            //console.dir(err);
            alert('刪除所有購物車失敗，請稍後再試。');
          })
          .finally(() => {
            this.loadings.removeCart = false;
          });
      } else {
        axios
          .delete(`${url}/api/${path}/cart/${cartId}`)
          .then((res) => {
            return axios.get(`${url}/api/${path}/cart`);
          })
          .then(({ data }) => {
            this.cartDetails = data.data;
            alert('刪除購物車成功');
          })
          .catch((err) => {
            //console.dir(err);
            alert('刪除購物車失敗，請稍後再試。');
          })
          .finally(() => {
            this.loadings.removeCart = false;
          });
      }
    },
    changeQty(cartId, product_id, evt) {
      this.loader = this.$loading.show();
      const tempCart = {
        product_id,
        qty: evt.target.value * 1,
      };
      axios
        .put(
          `${url}/api/${path}/cart/${cartId}`,
          JSON.stringify({ data: tempCart }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          return axios.get(`${url}/api/${path}/cart`);
        })
        .then(({ data }) => {
          this.cartDetails = data.data;
          alert('修改購物車成功');
        })
        .catch((err) => {
          //console.dir(err);
          alert('修改購物車失敗，請稍後再試。');
        })
        .finally(() => {
          this.loader.hide();
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    onSubmit(values, { resetForm }) {
      if (this.cartDetails?.carts?.length) {
        this.loader = this.$loading.show();
        axios
          .delete(`${url}/api/${path}/carts`)
          .then((res) => {
            alert('送出表單成功');
          })
          .catch((err) => {
            //console.log(err);
          })
          .finally(() => {
            this.loader.hide();
            resetForm();
            this.getCartData();
          });
      } else {
        alert('請先加入購物車。');
      }
    },
  },
  mounted() {
    this.getCartData();
  },
};
