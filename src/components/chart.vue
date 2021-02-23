<template>
  <section id="chart">
      <Header/>
			<h3>Cesta</h3>
			<h6>({{cantidad}}) Artículo/s en tu cesta </h6>
      <table>
        <thead>
            <th>Artículo</th>
            <th>Precio</th>
            <th>Cantidad</th>
        </thead>
        <tr v-for="chart in carrito" v-bind:key="chart.id">
          <td class="exTD"> <img :src="chart.producto.img" class="img-article" alt="Producto" /> </td>
          <td class="midTD">
            <div id="info">
              <div id="producto"> {{chart.producto.Nombre}} </div>
              <div id="infoProduc"> {{chart.producto.descripcion}}</div>
              <div class="stock"> ¡Stock disponible! </div>
              <button class="eliminar" @click="removeProduct(chart.id)">Eliminar artículo</button>
            </div>
          </td>
          <td class="exTD"> 
            <input type="number" :id="chart.id" @change="cambiarUnidades" :value="chart.cantidad" min="1" :max="chart.producto.stock"/>
            <p class="precio">{{chart.producto.Precio}} €</p>
            
          </td>
        </tr>
      </table>
			<hr>

			<div id="botonCesta">
				<div id="subtotal">Subtotal({{cantidad}} producto/s): {{total}}</div>

				<div id="realizar"><button class="btnRealizar" @click="realizarPedido()">Realizar pedido</button></div>
			</div>
      <Footer/>
		</section>
</template>

<script>

import Firebase from "../db";
import { db } from "../db";
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  components: { Header, Footer },
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

<style scoped lang="scss">
  section {
    min-height: 100vh;
  }

  .btnRealizar {
    border-color: green;
    border-radius: 9px;
    border-style: solid;
    &:hover{
      background-color: #5cb85c;
      color: white;
    }
  }

  .eliminar{
    border-color: red;
    border-radius: 9px;
    &:hover{
      background-color: #d9534f;
      color: white;
    }
  }

  .precio{
    margin-top: 1rem;
    font-size: 2rem;
  }
  table{
    width: 99%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  tr{
    border-top: 1px solid rgba(148, 148, 148, 0.76);
  }
  .exTD{
   width: 25%;
  }

  .midTD{
   width: 50%;
   padding: 1rem;
  }

.img-article {
  max-width: 200px;
  max-height:180px;
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

.stock {
  font-weight: bold;
  color: green;
  margin-bottom: 1rem;
}

#step {
  text-align: center;
}

#botonCesta {
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
  margin-bottom: 2rem;
}


#realizar a{
  color:black;
}

#realizar:hover {
  transform: scale(1.1);
}

</style>