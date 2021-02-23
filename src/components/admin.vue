<template>
  <div class="admin-container">
    <Header/>
    <h3>Añadir producto</h3>
      <div id="divAñadir">
           <table class="añadir">
             <tr>
                <td>ID: </td>
                <td><input v-model="adminID" disabled /></td>
              </tr>

              <tr>
                <td>Nombre: </td>
                <td><input v-model="adminNombre" type="text"></td>
              </tr>

              <tr>
                <td>Descripción: </td>
                <td><input v-model="adminDescripcion" type="text"></td>
              </tr>

              <tr>
                <td>Imagen src: </td>
                <td><input v-model="adminImg" type="text"></td>
              </tr>

              <tr>
                <td>Precio: </td>
                <td><input v-model="adminPrecio" type="number" min="0"></td>
              </tr>

              <tr>
                <td>Stock: </td>
                <td><input v-model="adminStock" type="number" min="0"></td>
              </tr>
            </table>
            <div class="boton">
              <i v-if="edit" @click="editarProducto()" class="fa fa-check fa-2x" style="color: #198754;" aria-hidden="true"> Editar</i>
              <i v-else @click="addProduct" class="fa fa-plus-square fa-2x" style="color: #198754;" aria-hidden="true"> Añadir</i>      
              <i v-if="edit" @click="cancelarEdit" class="fa fa-times fa-2x" style="color: #198754;" aria-hidden="true"> Cancelar</i>
            </div>

        </div>
    <div class="div-container-produc">
      <div
        class="admin-product"
        v-for="producto in productos"
        v-bind:key="producto.id"
      > <div class="img-container">
          <img :src="producto.img" alt="Producto" />
      </div>
        
        <div class="desc-container">
          <p>
            <strong>Descripcion: {{ producto.descripcion }}</strong>
          </p>
        </div>
        <div class="text-container">
          <p>
            <strong>{{ producto.Nombre }}</strong>
          </p>
          <p>
            <strong>Stock: {{ producto.stock }}</strong>
          </p>
          <p>
            <strong>Precio: {{ producto.Precio }}</strong>
          </p>
          <button @click="editarCampos(producto)">Editar</button>
          <button @click="borrarProducto(producto)">Eliminar</button>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import { db } from "../db";
import Firebase from "../db";
import Header from "./header.vue";
import Footer from "./footer.vue";

export default {
  components: { Header, Footer },
  name: "Test",
  props: {},
  data() {
    return {
      user: {
        loggedIn: true,
        data: {},
      },
      productos: [],
      carrito: [],
      adminID: "ID Automático",
      adminNombre: "",
      adminDescripcion: "",
      adminPrecio: 0,
      adminImg: "",
      adminStock: 0,
      edit: false,
    };
  },
  methods: {
    editarCampos(product) {
      this.edit = true;
      this.adminID = product.id;
      this.adminNombre = product.Nombre;
      this.adminDescripcion = product.descripcion;
      this.adminPrecio = product.Precio;
      this.adminImg = product.img;
      this.adminStock = product.stock;
    },
    editarProducto() {
      for (let itemCarro of this.carrito) {
        if (itemCarro.idProduct == this.adminID) {
          db.collection("Carrito")
            .doc(itemCarro.id)
            .update({
              precioTotal:
                parseInt(itemCarro.cantidad) * parseFloat(this.adminPrecio),
              producto: {
                Nombre: this.adminNombre,
                Precio: parseFloat(this.adminPrecio),
                descripcion: this.adminDescripcion,
                img: this.adminImg,
                stock: parseInt(this.adminStock),
              },
            });
        }
      }
      db.collection("Productos")
        .doc(this.adminID)
        .update({
          Nombre: this.adminNombre,
          Precio: parseFloat(this.adminPrecio),
          descripcion: this.adminDescripcion,
          img: this.adminImg,
          stock: parseInt(this.adminStock),
        });

      this.cancelarEdit();

      this.$notify({
        title: "Producto editado",
        type: "success",
        text: "El producto se ha editado.",
      });
    },
    borrarProducto(product) {
      for (let itemCarro of this.carrito) {
        if (itemCarro.idProduct == product.id) {
          db.collection("Carrito").doc(itemCarro.id).delete();
        }
      }

      db.collection("Productos").doc(product.id).delete();
      this.cancelarEdit();

      this.$notify({
        title: "Producto eliminado",
        type: "success",
        text: "El producto se ha eliminado.",
      });
    },
    cancelarEdit() {
      this.edit = false;
      this.adminID = "ID Automático";
      this.adminNombre = "";
      this.adminDescripcion = "";
      this.adminPrecio = "";
      this.adminImg = "";
      this.adminStock = "";
    },
    addProduct() {
      db.collection("Productos").add({
        Nombre: this.adminNombre,
        Precio: parseFloat(this.adminPrecio),
        descripcion: this.adminDescripcion,
        img: this.adminImg,
        novedad: false,
        stock: parseInt(this.adminStock),
      });
      this.$notify({
        title: "Producto añadido",
        type: "success",
        text: "El producto se ha añadido.",
      });
      this.cancelarEdit();
    },
  },
  firestore: {
    productos: db.collection("Productos"),
    carrito: db.collection("Carrito"),
  },
  mounted: function () {
    if (Firebase.auth.currentUser) {
      if (Firebase.auth.currentUser.email != "admin@admin.com") {
        this.$notify({
          title: "Inicio de Sesión",
          type: "error",
          text: "Tienes que ser administrador para acceder al administrador.",
        });
        this.$router.push({ name: "home" });
      }
    } else {
      this.$notify({
        title: "Inicio de Sesión",
        type: "error",
        text: "Tienes que iniciar sesión para acceder al administrador.",
      });
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style scoped lang="scss">
@import "../scss/component/_admin.scss";
</style>