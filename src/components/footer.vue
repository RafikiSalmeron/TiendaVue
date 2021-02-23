<template>
  <footer>
			<div>
				<p id="nameEmpresa">Rafikify</p>
				<a href="mailto:elcorreoquequieres@correo.com">
					<div class="divFoot">
						<img src="../assets/email.png">
						<p class="pFooter">rafikify@email.com</p>
					</div>
				</a>
				<div class="divFoot">
					<img src="../assets/phone.png">
					<p class="pFooter">999 99 99 99</p>
				</div>
			</div>
			<div>
				<a href="https://www.google.es/maps/preview">
					<div class="divFoot">
						<img src="../assets/gps.png">
						<p class="pFooter">¿Cómo llegar?</p>
					</div>
				</a>
				<div class="divFoot">
					<a href="https://www.facebook.com">
						<img src="../assets/facebook.png">
					</a>
					<a href="https://www.instagram.com">
					<img src="../assets/instagram.png">
				</a>
				<a href="https://www.twitter.com">
					<img src="../assets/twitter.png">
				</a>
				<a href="https://www.youtube.com">
					<img src="../assets/youtube.png">
				</a>
				</div>
			</div>
		</footer>
</template>

<script>
export default {
  name: "Footer",
  props: {},
};
</script>

<style>
footer {
  background-color: #B4A7D6;
  border-radius: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  border-style: solid;
  border-color: #8E7CC3;
  margin-top: 1rem;
}

footer>div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.divFoot {
  display: flex;
  flex-direction: row;
}

.pFooter {
  margin-bottom: 0;
  font-size: larger;
}

.divFoot img {
  margin-right: 0.5rem;
}

.divFoot img:hover {
  transform: scale(1.1);
}

#nameEmpresa {
  font-size: xx-large;
  font-family: 'Brush Script MT', cursive;
}

footer a {
  color: black;
}

</style>