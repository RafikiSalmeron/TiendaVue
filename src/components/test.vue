<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      <i v-if="!admin" @click="cestita()" class="fa fa-shopping-cart" aria-hidden="true"></i>
      <i v-else @click="administrador()" class="fa fa-lock" aria-hidden="true"></i>
      <i @click="userProfile()" v-if="user.loggedIn"  class="fa fa-user-circle-o" aria-hidden="true"></i>
      <i v-else @click="cerrarSesion()" class="fa fa-sign-out" aria-hidden="true"></i>
    </div>
  </nav>
</template>

<script>
import Firebase from "../db";

export default {
  name: "Test",
  props: {},
  data() {
    return {
      user: {
        loggedIn: false,
        data: {},
      },
      admin: false,
    };
  },
  methods: {
      
    administrador() {
      this.$router.push({ name: "admin" });
    },
    userProfile() {
      this.$router.push({ name: "login" });
    },
    cestita() {
      if (this.user.loggedIn == false) {
        this.$notify({
          title: "Inicio de Sesión",
          type: "error",
          text: "Tienes que iniciar sesión para acceder al carrito.",
        });
      } else {
        this.$router.push({ name: "chart" });
      }
    },
  },
  created: function () {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
        console.log(this.user.loggedIn);
        if (this.user.data.email == "admin@admin.com") {
          this.admin = true;
        }
        //console.log(Firebase.auth.currentUser);
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
        console.log(this.user.loggedIn);
      }
    });
  },
};
</script>

<style scoped>

</style>