<template>
  <div id="productos-main-container">
    <h2>Productos</h2>
    <div class="productos-container">
      <div
        class="produc-card"
        v-for="producto in productos"
        v-bind:key="producto.id"
        v-cloak
      >
        <img :src="producto.img" alt="Producto Novedad" />
        <p class="bold">{{ producto.Nombre }}</p>
        <p>{{ producto.descripcion }}</p>
        <p class="bold precio">{{ producto.Precio }} €</p>
        <p class="stock">Stock : {{ producto.stock }}</p>
        <div class="btnContainer">
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
  </div>
</template>

<script>
import Firebase from "../db";
import { db } from "../db";

export default {
  name: "Productos",
  props: {
    productos: {
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
        console.log(this.carrito);
        console.log(producto);
        for (var chart of this.carrito) {
          if (
            chart.email == this.user.data.email &&
            chart.idProduct == producto.id
          ) {
            console.log("HAY");
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
            email: this.user.data.email,
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
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
        if (this.user.data.email == "admin@admin.com") {
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
@import "../scss/abstract/_mixins.scss";
@import "../scss/abstract/_variables.scss";

h2 {
  margin: 2rem;
}
.productos-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  .produc-card {
    border: 1px solid black;
    width: 300px;
    margin: 2rem;
    padding: 1rem;
    background-color: rgba(12, 12, 12, 0.747);
    border-radius: 8px;
    color: white;
    position: relative;
    &:hover {
      transform: scale(1.1);
    }
    img {
      width: 200px;
      height: 180px;
      &:hover {
        transform: rotate(20deg);
      }
    }
    .bold {
      font-weight: bold;
    }
    .precio {
      font-size: 2rem;
      background-color: rgba(0, 0, 0, 0.397);
      border-radius: 8px;
    }
    .stock {
      margin-bottom: 3rem;
    }

    .btnContainer {
      position: absolute;
      bottom: 2%;
      left: 10%;
      .btnAddChart {
        font-size: 2rem;
        background-color: rgb(255, 255, 255);
        border-radius: 8px;
        border: none;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>