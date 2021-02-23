<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="email"
          placeholder="Email aqui.."
          v-model="email"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Contraseña</label>
      <div class="control">
        <input
          class="input"
          type="password"
          placeholder="Contraseña aqui.."
          v-model="password"
        />
      </div>
    </div>
    <div id="login">
      <button @click="loginEmail">LoginEmail</button>
      <button @click="login('Facebook')">LoginFacebook</button>
      <button @click="login('Google')">LoginGoogle</button>
      <button @click="login('Github')">LoginGithub</button>
      <button @click="registrar">Register</button>
    </div>
  </div>
</template>

<script>
import Firebase from "../db";
import firebase from "firebase/app";

export default {
  name: "Login",
  props: {},
  data() {
    return {
      user: {
        loggedIn: false,
        data: {},
      },
      email: "",
      password: "",
    };
  },
  computed: {
    authenticated() {
      return this.user.loggedIn;
    },
  },
  methods: {
    registrar(){
      this.$router.push({ name: "register" });
    },
    login(prov) {
      var provider;
      if (prov == "Facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
      }
      if (prov == "Google") {
        provider = new firebase.auth.GoogleAuthProvider();
      }
      if (prov == "Github") {
        provider = new firebase.auth.GithubAuthProvider();
      }
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$notify({
            title: "Inicio de Sesión",
            type: "success",
            text: "Se ha iniciado sesión. ",
          });
          this.$router.push({ name: "home" });
          console.log(Firebase.auth.currentUser.email);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loginEmail: function () {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            console.log(user.user.email);
            console.log(Firebase.auth.currentUser.email);
            this.$notify({
              title: "Inicio de Sesión",
              type: "success",
              text: "Se ha iniciado sesión. ",
            });
            this.$router.push({ name: "home" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Todos los campos son requeridos");
      }
    },
  },
  mounted: function () {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
    });
  },
};
</script>

<style>
</style>