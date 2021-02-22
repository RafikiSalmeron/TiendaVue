<template>
  <section id="chart">
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
					<li class="breadcrumb-item active" aria-current="page">Nosotros</li>
				</ol>
			</nav>
			<h3>Cesta</h3>
			<h6>(1) Artículo en tu cesta </h6>
			<hr id="tophr">
			<div id="article">Artículo</diV>
			<div id="precio">Precio</diV>
			<div id="cantidad">Cantidad</div>
      <div id="hola" v-for="chart in carrito" v-bind:key="chart.id">
			<hr id="medhr">
			<div class="articulo">
				<div id="foto">
           <img :src="chart.producto.img" class="img-article" alt="Producto" />
				</div>
				<div id="info">
					<div id="producto"> {{chart.producto.Nombre}} </div>
					<div id="infoProduc"> {{chart.producto.descripcion}}</div>
					<div id="stock"> ¡Stock disponible! </div>
				</div>
			</div>
			<div id="precioBot"> {{chart.producto.Precio}}</div>
			<div id="step"> <input type="number" :id="chart.id" @change="cambiarUnidades" :value="chart.cantidad" min="1" :max="chart.producto.stock"> </div>
      <button @click="removeProduct(chart.id)">Eliminar artículo</button>
			<hr id="bothr">
      </div>

			<div id="botonCesta">
				<div id="subtotal">Subtotal({{cantidad}} producto/s): {{total}}</div>

				<div id="realizar"><button @click="realizarPedido()">Realizar pedido</button></div>
			</div>
		</section>
</template>

<script>

import Firebase from "../db";
import { db } from "../db";

export default {
  name: "Chart",
  props: {},
  data() {
    return {
      user: {
        loggedIn: true,
        data: {},
      },
      carrito: []
    };
  },
   computed: {
     total : function () {
       let pTotal = 0;
       for ( var item of this.carrito){
         pTotal += item.precioTotal;    
       }
       return pTotal.toFixed(2) + " €";
     },
     cantidad : function () {
       let cTotal = 0;
       for ( var item of this.carrito){
         cTotal += parseFloat(item.cantidad);    
       }
       return cTotal;
     }
   },
   methods: {
    realizarPedido(){
      for ( var item of this.carrito){
          db.collection("Carrito").doc(item.id).delete();
       }
       this.$notify({title: 'Pedido realizado', type: 'success', text: 'El pedido se ha realizado correctamente.'})
       this.$router.push({name:'home'});
    },
    removeProduct(id){
      db.collection("Carrito").doc(id).delete();
    },
    cambiarUnidades: function (e) {
         let articulo;
         db.collection('Carrito').doc(e.target.id).get().then(snapshot => {
            articulo = snapshot.data()
            console.log(articulo.producto.Precio);
            // do something with document
            db.collection('Carrito').doc(e.target.id).
            update({
              cantidad: e.target.value,
              precioTotal: articulo.producto.Precio.toFixed(2) * e.target.value
            })
        })
          
        },
   },
  
   firestore: {
      carrito: db.collection("Carrito").where("email", "==", Firebase.auth.currentUser ? Firebase.auth.currentUser.email:""),
  },
  mounted: function () {
    if(Firebase.auth.currentUser){
        this.user.loggedIn = true;
        this.user.data = Firebase.auth.currentUser;
        this.$bind('carrito', db.collection("Carrito").where("email", "==", Firebase.auth.currentUser.email));
        console.log(true);
      }else{
        this.user.loggedIn = false;
        this.$notify({title: 'Inicio de Sesión', type: 'error', text: 'Tienes que iniciar sesión para acceder al carrito.'})
        this.$router.push({name:'home'});
        this.$bind('carrito', db.collection("Carrito").where("email", "==", ""));
        console.log(false);
      }
  },
};



</script>








<style scoped>
    section {
  
  margin-left: 1rem;
}

h3 {
  margin-left: 1rem;
  grid-row: 2;
}

h6 {
  margin-left: 1rem;
  grid-row: 3;
}

#tophr {
  grid-row: 4;
  grid-column: 1 / span 3;
}

#medhr {
  grid-row: 6;
  grid-column: 1 / span 3;
}

#article {
  grid-row: 5;
  grid-column: 1;
  text-align: center;
  align-self: center;
}

#precio {
  grid-row: 5;
  grid-column: 2;
  text-align: center;
  align-self: center;
}

#cantidad {
  grid-row: 5;
  grid-column: 3;
  text-align: center;
  align-self: center;
}

.articulo {
  grid-row: 7;
  grid-column: 1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding-left: 10%;
}

.img-article {
  width: 80%;
  height: 80%;
  align-self: center;
}

#info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  padding-left: 5%;
  padding-right: 5%;
}

#producto {
  font-weight: bold;
}

#infoProduc {
  margin-top: 3vh;
  margin-bottom: 3vh;
}

#stock {
  font-weight: bold;
  color: green;
}

#precioBot {
  grid-row: 7;
  grid-column: 2;
  text-align: center;
  font-size: larger;
  font-weight: bold;
  align-self: center;
}

#step {
  grid-row: 7;
  grid-column: 3;
  align-self: center;
  text-align: center;
}

#points {
  width: 3em;
  text-align: center;
}

#bothr {
  grid-row: 8;
  grid-column: 1 / span 3;
}

#botonCesta {
  grid-row: 9;
  grid-column: 1 / span 3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#subtotal {
  font-weight: bold;
  font-size: x-large;
}

#realizar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  font-size: xx-large;
  font-weight: bold;
  text-align: center;
  height: 40%;
  margin-top: 4vh;
  background-color: #B6D7A8;
  box-shadow: 2px 3px;
  border-radius: 8px;
}

#realizar a{
  color:black;
}

#realizar:hover {
  transform: scale(1.1);
}

</style>