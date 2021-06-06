<template>
  <div id="profile">
    <Header />
    <div class="div-container-pedido">
      <div
        class="pedidos-product"
        v-for="object in pedidos"
        v-bind:key="object.id"
      >
        <div
          class="pedido-product"
          v-for="pedido in object.pedido"
          v-bind:key="pedido.id"
        >
          <div class="img-container">
            <img :src="pedido.producto.img" alt="Producto" />
          </div>

          <div class="desc-container">
            <p>
              <strong>{{ pedido.producto.Nombre }}</strong>
            </p>
            <p>
              {{ pedido.producto.descripcion }}
            </p>
          </div>
          <div class="text-container">
            <p>
              <strong>Cantidad: {{ pedido.cantidad }}</strong>
            </p>
            <p>
              <strong>Precio Total: {{ pedido.precioTotal }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import Firebase from "../db";

import { db } from "../db";

export default {
  name: "Profile",

  components: {
    Header,
    Footer,
  },
  data() {
    return {
      pedidos: [],
      user: {
        loggedIn: false,
        data: {},
      },
      email: "",
    };
  },
  computed: {
    authenticated() {
      return this.user.loggedIn;
    },
  },
  mounted: function () {
    this.email = localStorage.getItem("userEmail");
    if (this.email) {
      this.user.loggedIn = true;
      console.log(this.user.loggedIn);
      this.$bind(
        "pedidos",
        db.collection("Pedidos").where("email", "==", this.email)
      );
    } else {
      this.user.loggedIn = false;
      this.user.data = {};
      this.$notify({
        title: "Inicio de Sesión",
        type: "error",
        text: "Tienes que iniciar sesión para acceder a tu perfil.",
      });
      this.$bind("pedidos", db.collection("Pedidos").where("email", "==", ""));
      this.$router.push({ name: "home" });
    }
  },

  firestore: {
    pedidos: db
      .collection("Pedidos")
      .where("email", "==", Firebase.auth.currentUser ? this.email : ""),
  },
};
</script>

<style scoped lang="scss">
@import "../scss/component/_profile.scss";
</style>
