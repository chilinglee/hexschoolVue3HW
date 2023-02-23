<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      //console.log(this.user);
      axios
        .post("https://vue3-course-api.hexschool.io/v2/admin/signin", this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `jillsCookie=${token}; expires=${expired};`;
          this.$router.push("/admin");
        })
        .catch((err) => {
          alert(err.data?.error?.message ?? "登入發生錯誤");
        });
    },
  },
};
</script>
<template>
  <div class="row justify-content-center my-5">
    <div class="col-sm-4">
      <div class="card p-4">
        <div class="card-body">
          <h4 class="card-title text-center">請先登入</h4>
          <form id="form" class="form-signin my-3">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
                v-model="user.username"
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                v-model="user.password"
              />
              <label for="password">Password</label>
            </div>
            <button
              class="btn btn-lg btn-primary w-100 mt-3"
              @click="login"
              type="button"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
