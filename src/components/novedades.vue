<template>
  <div id="noved-main-container">
      <h2> Novedades </h2>
      <div id="noved-container">
          <div id="noved-card" v-for="producto in novedades" v-bind:key="producto.id" v-cloak>
              <p> Nombre : {{producto.Nombre}} </p>
              <p> Descripcion : {{producto.descripcion}} </p>
              <p> Precio  : {{producto.Precio}} </p>
              <img :src="producto.img" alt="Producto Novedad" />
              <p> Stock : {{producto.stock}} </p>
              <button :disabled="stock(producto)" @click="addProduct(producto)"> Añadir al carrito </button>
          </div>
      </div>
  </div>
</template>

<script>
import Firebase from "../db";
import {db} from '../db';


export default {
  name: "Novedades",
  props: {
      novedades: {
          type: Array,
          default: function () {
              return [];
          }
      }
  },
    methods: {
      stock(producto) {
      if (producto.stock > 0) {
        return false;
      }
      return true;
    },
    addProduct(producto) {
      if(this.user.loggedIn){
      console.log(this.carrito);
      console.log(producto);
      for (var chart of this.carrito) {
        if (
          chart.email == this.user.data.email &&
          chart.idProduct == producto.id
        ){
          console.log("HAY");
          this.cesta = chart;
          this.hay = true;
        }
      }
      if(this.hay){
        if(this.cesta.cantidad == producto.stock){
            this.$notify({title: 'Añadir al carrito',type: 'error', text: 'No hay más stock disponible. Ya tienes el máximo número de artículos posible en el carrito.'})
        }else{
          db.collection("Carrito").doc(this.cesta.id).update({
            cantidad: parseFloat(this.cesta.cantidad) + 1,
            precioTotal: (parseFloat(this.cesta.cantidad) + 1) * parseFloat(producto.Precio),
            producto
          });
          this.$notify({title: 'Añadir al carrito',type: 'success', text: 'Has añadido un producto al carrito.'})
        }  
      }else{
        db.collection("Carrito").add({
          email: this.user.data.email,
          idProduct: producto.id,
          cantidad: 1,
          precioTotal: parseFloat(producto.Precio),
          producto
          });
          this.$notify({title: 'Añadir al carrito',type: 'success', text: 'Has añadido un producto al carrito.'})
      }
      this.hay = false;
      }else{
        this.$notify({title: 'Añadir al carrito',type: 'error', text: 'Tienes que iniciar sesión para añadir productos al carrito.'})
      }
    },
  },
  data(){
    return {
      user: {
        loggedIn: false,
        data: {},
      },
      carrito: [],
      cesta: null,
      hay: false
    }
  },
  firestore: {
    carrito: db.collection("Carrito"),
  },
  mounted: function () {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
    });
  },
};
</script>

<style>

</style>