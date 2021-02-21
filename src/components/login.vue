<template>
  <div id="login">
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Firebase from "../db";
import firebase from 'firebase/app'

export default {
  name: "Login",
  props: {},
  data() {
    return {
      user: {
        loggedIn: false,
        data: {},
      },
    };
  },
  computed: {
    authenticated() {
      return this.user.loggedIn;
    },
  },
  methods: {
    login() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(() =>{
        this.$notify({title: 'Inicio de Sesión',type: 'success', text: 'Se ha iniciado sesión con google. '})
        this.$router.push({name:'home'})
      })
      .catch(function(error){
        console.log(error)
        })
    },
    logout() {
      firebase.auth().signOut()
      .then(() =>{
        this.$notify({title: 'Inicio de Sesión', type: 'warn', text: 'Se ha iniciado sesión con google. '})
      })
      .catch(function(error) {
        console.log(error)});
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