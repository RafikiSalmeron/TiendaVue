<template>
  <div id="home">
    <Header/>
    <div class="jumbotron jumbotron-fluid" style="background-repeat:no-repeat">

        <img src="../assets/rafiki.png" width="250px" height="250px" alt="">
     </div>
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
@import "../scss/abstract/_mixins.scss";
@import "../scss/abstract/_variables.scss";

.jumbotron{
    background-image: linear-gradient(rgba(0, 0, 0, 0.272),rgba(0, 0, 0, 0.518)),url("../assets/fondo.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    height: 93vh;
    margin: 0;
    border-radius: 0;
  }
</style>
