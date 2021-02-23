<template>
  <div class="admin-container">
    <div class="div-container-produc">
      <div
        class="admin-product"
        v-for="producto in productos"
        v-bind:key="producto.id"
      >
        <img :src="producto.img" alt="Producto" />
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
    <div class="admin-inputs">
      <label>ID: <input v-model="adminID" disabled /></label>
      <label>Nombre: <input v-model="adminNombre" /></label>
      <label>Descripcion: <textarea v-model="adminDescripcion" /></label>
      <label>Precio: <input type="number" v-model="adminPrecio" /></label>
      <label>URL imagen: <input v-model="adminImg" /></label>
      <label>Stock: <input type="number" min="0" v-model="adminStock" /></label>
      <button v-if="edit" @click="editarProducto()">Editar</button>
      <button v-else @click="addProduct">Añadir</button>
      <button v-if="edit" @click="cancelarEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { db } from "../db";

export default {
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
};
</script>

<style scoped lang="scss">
.div-container-produc {
  width: 50%;
}
.text-container{
  width: 70%;
}
.admin-inputs {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
}
.admin-container {
  display: flex;
}
.admin-product {
  display: flex;
  flex-direction: row;
}
img {
  width: 10rem;
  height: 10rem;
}
</style>