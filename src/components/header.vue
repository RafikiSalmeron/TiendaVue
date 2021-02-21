<template>
  <header>
    <div id="top-header">
      <div class="logo">
        <img id="logo" alt="Logo" src="../assets/logo.svg" />
        <p>Rafikify</p>
      </div>
      <div id="buscar">
        <input
          id="search"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
        />
        <button
          id="btnSearch"
          onclick="searchDoc()"
          class="btn btn-outline-primary"
        >
          Search
        </button>
      </div>
      <div id="botones">
        <img
          @click="cestita()"
          id="cart"
          alt="Cesta de la compra"
          src="../assets/cart.png"
        />
        <img
          @click="userProfile()"
          id="user"
          alt="Tu usuario"
          src="../assets/user.png"
        />
      </div>
    </div>
    <nav>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html"
            >Inicio</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="products.html">Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="nosotros.html">Nosotros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="contact.html">Contacto</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Firebase from "../db";

export default {
  name: "Header",
  props: {},
  data() {
    return {
      user: {
        loggedIn: false,
        data: {},
      },
    };
  },
  methods: {
    userProfile() {
      this.$router.push({ name: "login" });
    },
    cestita() {
      if (this.user.loggedIn == false) {
        this.$notify({
          title: "Inicio de Sesión",
          type: "error",
          text: "Tienes que iniciar sesión para acceder al carrito.",
        });
      } else {
        this.$router.push({ name: "chart" });
      }
    },
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
header {
  background-color: #b4a7d6;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 2rem;
  border-style: solid;
  border-color: #8e7cc3;
}

nav {
  align-self: center;
}

nav li:hover {
  transform: scale(1.1);
  background-color: #0275d8;
  border-radius: 5px;
  color: red;
}
nav li:hover a {
  color: white;
}

#btnSearch:hover {
  transform: scale(1.1);
}

#top-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

#logo {
  width: 4rem;
  height: 4rem;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo > p {
  margin-left: 1rem;
  margin-bottom: 0;
  font-size: x-large;
  font-family: "Brush Script MT", cursive;
  color: #4d70eb;
}

#buscar {
  display: flex;
  flex-direction: row;
  height: 50%;
  align-self: center;
}

#botones {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

#botones img:hover {
  transform: scale(1.2);
  cursor: pointer;
}

#search {
  margin-right: 1em;
}
#user {
  margin-left: 1rem;
}
</style>