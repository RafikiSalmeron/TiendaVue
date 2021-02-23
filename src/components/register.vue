<template>
  <div>
    <div class="field">
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
    </div>
    <button @click="register">Registrar</button>
  </div>
</template>

<script>
import { db } from "../db";
import firebase from "firebase/app";

export default {
  name: "Register",
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