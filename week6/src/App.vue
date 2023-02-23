<script>
export default {
  methods: {
    logout() {
      document.cookie = `jillsCookie=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      alert("已清除token");
    },
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg bg-light fixed-top"
    v-if="!$route.meta.isBackStage"
  >
    <div class="container">
      <a class="navbar-brand" href="#">這是前臺</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/" class="nav-link text-dark">首頁</router-link>
          <router-link to="/products" class="nav-link text-dark"
            >前台產品列表</router-link
          >
          <router-link to="/cart" class="nav-link text-dark"
            >前台購物車列表</router-link
          >
          <router-link to="/admin" class="nav-link">後臺產品列表</router-link>
        </div>
      </div>
    </div>
  </nav>
  <nav
    class="navbar navbar-expand-lg bg-light fixed-top"
    v-if="$route.meta.isBackStage"
  >
    <div class="container">
      <a class="navbar-brand" href="#/admin/products">這是後臺</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link text-dark"
            >後臺產品列表</router-link
          >
          <router-link to="/admin/orders" class="nav-link text-dark"
            >後臺訂單列表</router-link
          >
          <router-link to="/" class="nav-link">回到前臺</router-link>
          <router-link to="/login" class="nav-link" @click="logout"
            >登出</router-link
          >
        </div>
      </div>
    </div>
  </nav>
  <div class="container" style="padding-top: 80px">
    <router-view></router-view>
  </div>
</template>
<style></style>
