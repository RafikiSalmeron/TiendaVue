<template>
  <div id="noved-main-container">
    <h2>Novedades</h2>
    <div class="noved-container">
      <div
        class="noved-card"
        v-for="producto in novedades"
        v-bind:key="producto.id"
        v-cloak
      >
        <img :src="producto.img" alt="Producto Novedad" />
        <p class="bold">{{ producto.Nombre }}</p>
        <p class="precio bold">{{ producto.Precio }} €</p>
        <p class="stock">Stock : {{ producto.stock }}</p>
        <button
          class="btnAddChart"
          v-if="!admin"
          :disabled="stock(producto)"
          @click="addProduct(producto)"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from "../db";
import { db } from "../db";

export default {
  name: "Novedades",
  props: {
    novedades: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    stock(producto) {
      if (producto.stock > 0) {
        return false;
      }
      return true;
    },
    addProduct(producto) {
      if (this.user.loggedIn) {
        for (var chart of this.carrito) {
          if (chart.email == this.email && chart.idProduct == producto.id) {
            this.cesta = chart;
            this.hay = true;
          }
        }
        if (this.hay) {
          if (this.cesta.cantidad == producto.stock) {
            this.$notify({
              title: "Añadir al carrito",
              type: "error",
              text:
                "No hay más stock disponible. Ya tienes el máximo número de artículos posible en el carrito.",
            });
          } else {
            db.collection("Carrito")
              .doc(this.cesta.id)
              .update({
                cantidad: parseFloat(this.cesta.cantidad) + 1,
                precioTotal:
                  (parseFloat(this.cesta.cantidad) + 1) *
                  parseFloat(producto.Precio),
                producto,
              });
            this.$notify({
              title: "Añadir al carrito",
              type: "success",
              text: "Has añadido un producto al carrito.",
            });
          }
        } else {
          db.collection("Carrito").add({
            email: this.email,
            idProduct: producto.id,
            cantidad: 1,
            precioTotal: parseFloat(producto.Precio),
            producto,
          });
          this.$notify({
            title: "Añadir al carrito",
            type: "success",
            text: "Has añadido un producto al carrito.",
          });
        }
        this.hay = false;
      } else {
        this.$notify({
          title: "Añadir al carrito",
          type: "error",
          text: "Tienes que iniciar sesión para añadir productos al carrito.",
        });
      }
    },
  },
  data() {
    return {
      user: {
        loggedIn: false,
        data: {},
      },
      email: "",
      admin: false,
      carrito: [],
      cesta: null,
      hay: false,
    };
  },
  firestore: {
    carrito: db.collection("Carrito"),
  },
  mounted: function () {
    this.email = localStorage.getItem("userEmail");
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user.loggedIn = true;
        if (this.email == "admin@admin.com") {
          this.admin = true;
        }
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
        this.admin = false;
      }
    });
  },
};
</script>

<style scoped lang="scss">
@import "../scss/component/_novedades.scss";
</style>