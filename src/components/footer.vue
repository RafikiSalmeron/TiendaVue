<template>
  <footer>
    <div class="topFooter">
      <a target="_blank" href="mailto:elcorreoquequieres@correo.com">
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </a>
      <a target="_blank" href="https://www.google.es/maps/preview">
        <i class="fa fa-map-marker" aria-hidden="true"></i>
      </a>
      <a target="_blank" href="https://www.facebook.com">
        <i class="fa fa-facebook" aria-hidden="true"></i>
      </a>
      <a target="_blank" href="https://www.twitter.com">
        <i class="fa fa-twitter" aria-hidden="true"></i>
      </a>
      <a target="_blank" href="https://www.instagram.com">
        <i class="fa fa-instagram" aria-hidden="true"></i>
      </a>
      <a target="_blank" href="https://www.youtube.com">
        <i class="fa fa-youtube-play" aria-hidden="true"></i>
      </a>
    </div>
    <div class="botFooter">
      <p class="footer-company-name">© Rafael Salmerón Martos</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {},
};
</script>

<style scoped lang="scss">
footer {
  background-color: #424242;
  .topFooter {
    padding: 1rem;
    i {
      font-size: 1.5rem;
      color: white;
      padding: 10px;
      border: 2px solid white;
      border-radius: 5px;
      min-width: 3rem;
      margin: 1rem;

      &:hover {
        -moz-transform: translate(-0px, -15px);
        -ms-transform: translate(-0px, -15px);
        -o-transform: translate(-0px, -15px);
        -webkit-transform: translate(-0px, -15px);
        transform: translate(-0px, -15px);
      }
    }
  }

  .botFooter {
    padding: 1rem;
    background-color: #262626;
    p{
      margin: 0;
      color: white;
    }
  }
}
</style>