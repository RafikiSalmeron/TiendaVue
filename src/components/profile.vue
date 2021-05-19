<template>
  <div id="profile">
    <Header/>
    <h2> PERFIL </h2>
    <Footer/>
  </div>
</template>

<script>


import Header from './header.vue';
import Footer from './footer.vue';
import Firebase from "../db";

import {db} from '../db';



export default {
  name: 'Profile',

  components: {
      Header,
      Footer
  },
  data(){
    return {
      productos : [],
      user: {
        loggedIn: false,
        data: {},
      },
    }
  },
  computed: {
    authenticated() {
      return this.user.loggedIn;
    }
  },
  mounted: function () {
    if (Firebase.auth.currentUser) {
      this.user.loggedIn = true;
      this.user.data = Firebase.auth.currentUser;
    } else {
      this.user.loggedIn = false;
      this.$notify({
        title: "Inicio de Sesión",
        type: "error",
        text: "Tienes que iniciar sesión para acceder a tu perfil.",
      });
      this.$router.push({ name: "home" });
    }
  },

  firestore: {
    productos : db.collection("Productos"),
  }
}
</script>

<style scoped lang="scss">
</style>
