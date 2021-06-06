<template>
  <div id="productDetail">
    <Header />
    <div class="div-container-pedido">
      <div class="pedido-product">
        <div class="img-container">
          <img :src="producto.img" alt="Producto" />
        </div>

        <div class="desc-container">
          <p>
            <strong>{{ producto.Nombre }}</strong>
          </p>
          <p>
            {{ producto.descripcion }}
          </p>
        </div>
        <div class="text-container">
          <p>
            <strong>Stock: {{ producto.stock }}</strong>
          </p>
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
  name: "ProductDetail",

  components: {
    Header,
    Footer,
  },
  data() {
    return {
      producto: {},
      user: {
        loggedIn: false,
        data: {},
      },
      email: "",
      id: "",
      loading: false,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct: function () {
      // Se guarda en una variable la url de la página
      const url = document.URL.toString();
      // Se separa el string con el separador indicado ('/')
      this.id = url.split("/")[5];
      // Consulta base de datos
      const docRef = db.collection("Productos").doc(this.id);
      docRef.get().then((doc) => {
        // Si el documento en la base de datos existe
        if (doc.exists) {
          // Se guarda los datos del resultado de la consulta en una variable
          this.producto = doc.data();
          this.loading = false;
          // Si no existe
        } else {
          this.$notify({
            title: "El producto no existe",
            type: "error",
            text: "No se ha podido encontrar el producto especificado.",
          });
          this.$router.push({ name: "home" });
        }
      });
    },
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
    } else {
      this.user.loggedIn = false;
      this.user.data = {};
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
