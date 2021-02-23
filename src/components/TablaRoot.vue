<template>
  <div class="tabla-root">
    <h3>Lista de productos</h3>
      <div class="producto"  v-for="el in root" v-bind:key="el.id">
        <table class="info">
          <tr>
            <td>Nombre: </td>
            <td><input id="art" type="text" :value="el.articulo" ></td>
          </tr>

          <tr>
            <td>Descripción: </td>
            <td><input id="desc" type="text" :value="el.descripcion"></td>
          </tr>

          <tr>
            <td>Imagen src: </td>
            <td><input id="img" type="text" :value="el.img"></td>
          </tr>

          <tr>
            <td>Precio: </td>
            <td><input id="precio" type="text" :value="el.precio"></td>
          </tr>

          <tr>
            <td>Stock: </td>
            <td><input id="stock" type="text" :value="el.stock"></td>
          </tr>
        </table>
        <div class="botones">
          <i @click="editar(el.id)" class="fa fa-pencil-square-o fa-3x" style="color: #black;" aria-hidden="true"></i>
          <i @click="borrar(el.id)" class="fa fa-minus-square fa-3x" style="color: #dc3545;" aria-hidden="true"></i>
        </div>
      </div>
      <hr> 
      <h3>Añadir producto</h3>
      <div id="divAñadir">
           <table class="añadir">
              <tr>
                <td>Nombre: </td>
                <td><input id="art2" type="text"></td>
              </tr>

              <tr>
                <td>Descripción: </td>
                <td><input id="desc2" type="text"></td>
              </tr>

              <tr>
                <td>Imagen src: </td>
                <td><input id="img2" type="text"></td>
              </tr>

              <tr>
                <td>Precio: </td>
                <td><input id="precio2" type="text"></td>
              </tr>

              <tr>
                <td>Stock: </td>
                <td><input id="stock2" type="text"></td>
              </tr>
            </table>
            <div class="boton">
              <i @click="añadir()" class="fa fa-plus-square fa-2x" style="color: #198754;" aria-hidden="true"> Añadir</i>
            </div>
        </div>
  </div>
</template>

<script>
import { db } from "../../db";

export default {
  name: 'TablaRoot',
  props:{
    root:{
      type: Array,
      default: function(){
        return [];
      }
    }
  },
  data () {
    return {}
  },
  methods:{
    //Hace un update al array productos con el valor introducido en el input correspondiente
    editar:function(id){
       db.collection("arrayProductos").doc(id).update({
         articulo: document.getElementById("art").value,
         descripcion: document.getElementById("desc").value,
         img: document.getElementById("img").value,
         precio: document.getElementById("precio").value,
         stock: document.getElementById("stock").value,
        });
       this.$notify({
            title: "Se ha editado correctamente el artículo"
        });
    },
    //Borra el producto del cual recibe la id como parámetro
    borrar: function(id){
       db.collection("arrayProductos").doc(id).delete();
       this.$notify({
            title: "Se ha eliminado el artículo"
        });
    },
    //Añade a firestore un nuevo artículo con los datos introducidos en los correspondientes inputs y notifica
    añadir: function(){
          db.collection("arrayProductos").add({
            articulo: document.getElementById("art2").value,
            descripcion: document.getElementById("desc2").value,
            img: document.getElementById("img2").value,
            precio: document.getElementById("precio2").value,
            stock: document.getElementById("stock2").value,
          });
             document.getElementById("art2").value="";
             document.getElementById("desc2").value="";
             document.getElementById("img2").value="";
             document.getElementById("precio2").value="";
             document.getElementById("stock2").value="";
          this.$notify({
            title: "Se ha añadido un nuevo artículo"
          });
        }
  }
}
</script>

<style scoped>
  .tabla-root{
    margin-top:2rem;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
  }
  .producto{
    background-color: rgb(224, 224, 224);
    margin: 3rem;
    padding: 1rem;
    border:1px black solid;
    display: flex;
    align-items: center;
  }
  .producto:nth-child(0){
    margin-top:0;
  }
  .info{
    width: 85%;
  }
  .info input{
    width:100%;
  }
  .botones{
    width:15%;
    display:flex;
    justify-content: space-around;
  }
  #divAñadir{
    background-color: rgb(223, 223, 223);
    border:1px black solid;
    padding:1rem;
    margin:0rem 3rem 5rem 3rem;
    display: flex;
    justify-content:flex-start;
  }
  .añadir{
    width: 70%;
  }
  .añadir td input{
    width:100%;
  }
  .boton{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
  }
  h3{
    margin-top:3rem;
  }
  i:hover{
    transform: scale(1.1);
  }
</style>
