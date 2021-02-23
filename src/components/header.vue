<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <router-link to="/">
    <img src="../assets/rafiki.png" />
    </router-link>
    <button
      class="navbar-toggler navbar-dark"
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
      <div v-if="user.loggedIn" class="mr-auto email">{{ user.data.email }}</div>
      <div v-else class="mr-auto"></div>
      <i
        v-if="!admin"
        @click="cestita()"
        class="fa fa-shopping-cart"
        aria-hidden="true"
        ><span>Carrito</span></i
      >
      <i v-else @click="administrador()" class="fa fa-lock" aria-hidden="true"
        ><span>Administrador</span></i
      >
      <i
        @click="userProfile()"
        v-if="!user.loggedIn"
        class="fa fa-user-circle-o"
        aria-hidden="true"
        ><span>Iniciar sesión</span></i
      >
      <i v-else @click="logout()" class="fa fa-sign-out" aria-hidden="true"
        ><span>Cerrar sesión</span>
      </i>
    </div>
  </nav>
</template>

<script>
import Firebase from "../db";
import firebase from "firebase/app";

export default {
  name: "Header",
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
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$notify({
            title: "Inicio de Sesión",
            type: "error",
            text: "Se ha cerrado sesión. ",
          });
          if(this.$route.name != "home"){
            this.$router.push({name:'home'});
          }
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
        this.admin = false;
        console.log(this.user.loggedIn);
      }
    });
  },
};
</script>

<style scoped lang="scss">
nav {
  color: white;
  .navbar-toggler-icon{
    color: white;
  }
  img {
    width: 64px;
    height: 64px;
    margin-right: 2rem;
  }
  i {
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    margin-left: 1rem;
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }
  span {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
}
</style>