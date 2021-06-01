<template>
  <div id="home">
    <Header />
    <div class="jumbotron jumbotron-fluid" style="background-repeat: no-repeat">
      <img src="../assets/rafiki.png" width="250px" height="250px" alt="" />
    </div>
    <Novedades :novedades="novedad" />
    <Productos :productos="productos" />
    <Footer />
  </div>
</template>

<script>
import Productos from "./productos.vue";
import Novedades from "./novedades.vue";
import Header from "./header.vue";
import Footer from "./footer.vue";

import { db } from "../db";

export default {
  name: "Home",

  components: {
    Header,
    Novedades,
    Productos,
    Footer,
  },
  data() {
    return {
      productos: [],
      user: {
        loggedIn: false,
        data: {},
      },
      email: "",
    };
  },
  computed: {
    novedad: function () {
      var novArray = [];
      for (var prod of this.productos) {
        if (prod.novedad) {
          novArray.push(prod);
        }
      }
      return novArray;
    },
    authenticated() {
      return this.user.loggedIn;
    },
  },
  mounted: function () {
    this.email = localStorage.getItem("userEmail");
    if (this.email) {
      this.user.loggedIn = true;
      console.log(this.user.loggedIn);
    } else {
      this.user.loggedIn = false;
      this.user.data = {};
      console.log(this.user.loggedIn);
    }
    document.querySelector("#nav-link-home").classList.add("active");
  },
  firestore: {
    productos: db.collection("Productos"),
  },
};
</script>

<style scoped lang="scss">
@import "../scss/component/_home.scss";
</style>
