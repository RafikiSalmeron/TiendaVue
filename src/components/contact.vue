<template>
  <div id="contact">
    <Header/>
    <h2> CONTACTO </h2>
    <Footer/>
  </div>
</template>

<script>


import Header from './header.vue';
import Footer from './footer.vue';
import Firebase from "../db";

import {db} from '../db';



export default {
  name: 'Contact',

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
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
        console.log(this.user.loggedIn);
        //console.log(Firebase.auth.currentUser);
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
        console.log(this.user.loggedIn);
      }
    });
  },

  firestore: {
    productos : db.collection("Productos"),
  }
}
</script>

<style scoped lang="scss">
</style>
