<template>
  <div id="home">
    <Header/>
    <Novedades :novedades = "novedad"/>
    <Productos :productos = "productos"/> 
    <Footer/>
  </div>
</template>

<script>

import Productos from './productos.vue';
import Novedades from './novedades.vue';
import Header from './header.vue';
import Footer from './footer.vue';
import Firebase from "../db";

import {db} from '../db';



export default {
  name: 'Home',

  components: {
      Header,
      Novedades,
      Productos,
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
    novedad : function () {
      var novArray = [];
        for (var prod of this.productos){
          if(prod.novedad){
            novArray.push(prod);
          }
        }
      return novArray;
    },
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
        console.log(this.user.data.displayName);
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
