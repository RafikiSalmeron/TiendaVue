<template>
  <div class="register-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <router-link to="/">
        <img src="../assets/rafiki.png" />
      </router-link>
    </nav>
    <div class="container">
      <div class="container2">
        <div class="field">
          <h2>Registrar</h2>
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="Email aqui.."
              v-model="email"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Contraseña</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="Contraseña aqui.."
              v-model="password"
            />
          </div>
          <button @click="register">Registrar</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { db } from "../db";
import firebase from "firebase/app";
import Footer from "./footer.vue";

export default {
  name: "Register",
  components: { Footer },
  data() {
    return {
      email: "",
      password: "",
      pata: [],
    };
  },
  firestore: {
    pata: db.collection("Productos"),
  },
  methods: {
    register: function () {
      if (this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.email = "";
            this.password = "";
            this.$router.push({ name: "login" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Todos los campos son requeridos");
      }
    },
  },
};
</script>


<style scoped lang="scss">
.container {
  width: 100vw;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h2 {
  margin: 2rem;
}
nav {
  display: flex;
  justify-content: center;
}
img {
  width: 64px;
  height: 64px;
  &:hover{
      transform: scale(1.05);
    }
}

input {
  width: 40vw;
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 1rem;
}

label {
  font-size: 1.5em;
}

button {
  margin: 3rem;
  border-color: #5cb85c;
  border-radius: 7px;
  border-style: solid;
  font-size: 1.5em;
  width: 40vw;
  &:hover {
    background-color: #5cb85c;
    color: white;
    transform: scale(1.05);
  }
}
</style>