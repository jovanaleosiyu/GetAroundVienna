<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed dark flat class="transparent">
      <v-img
        alt="Get Around Vienna Logo"
        class="shrink mr-2"
        contain
        src="./assets/logo.svg"
        transition="fab-transition"
        width="35"
        style="cursor: pointer"
        @click="scrollTo('#home')"
      />
      <v-spacer></v-spacer>
      <!-- Desktop -->
      <div class="nav d-md-block d-none">
        <v-btn
          :class="section.className"
          v-for="section of sections"
          :key="section.to"
          @click="
            scrollTo(section.to);
            section.className.active = true;
          "
          plain
        >
          {{ section.name }}
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="primary d-md-block d-none" elevation="2" rounded>
        Zu der App
      </v-btn>
      <!-- Mobile -->
      <div class="d-md-none d-inline-flex">
        <v-btn icon @click="mobileMenu = true">
          <v-icon large>mdi-menu</v-icon>
        </v-btn>
        <transition name="fade">
          <div v-if="mobileMenu" class="mobile-nav nav">
            <v-icon large @click="mobileMenu = false">mdi-close</v-icon>
            <v-btn
              :class="section.className"
              plain
              v-for="section of sections"
              :key="section.to"
              @click="
                scrollTo(section.to);
                section.className.active = true;
                mobileMenu = false;
              "
            >
              {{ section.name }}
            </v-btn>
            <v-btn class="primary d-md-block d-none" elevation="2" rounded>
              Zu der App
            </v-btn>
          </div>
        </transition>
      </div>
    </v-app-bar>
    <!-- Main -->
    <v-main>
      <!-- Start -->
      <section id="home">
        <StartSection />
      </section>
      <!-- Features -->
      <section id="features">
        <!-- Divider -->
        <div class="divider d-flex flex-column">
          <v-icon class="grey--text text--darken-4">mdi-star-circle</v-icon>
          <div class="title text-lg-h5 text-sm-h6">Features</div>
          <div class="subtitle text-lg-h4 text-h5 d-sm-block d-none">
            Eine Liste unserer wichtigsten Features!
          </div>
        </div>
        <v-row class="my-sm-16 mb-16 pb-lg-16 mx-md-16 mx-8 px-lg-16 px-0">
          <!-- Routes -->
          <v-col cols="12" md="4">
            <div class="reveal reveal_l feature d-flex flex-column">
              <v-icon class="img mb-2 grey--text text--darken-4">mdi-routes</v-icon>
              <div class="title pb-4 text-lg-h5 text-sm-h6">Routen berechnen</div>
              <div class="text text-body-1">
                Lasse dir die beste Route zwischen zwei Orten berechnen. Diese kannst du nach
                verschiedenen Kriterien filtern, wie zum Beispiel nach Umstiegen oder Linien.
              </div>
            </div>
          </v-col>
          <!-- Favourites -->
          <v-col cols="12" md="4">
            <div class="reveal feature d-flex flex-column">
              <v-icon class="img mb-2 grey--text text--darken-4">mdi-star</v-icon>
              <div class="title pb-4 text-lg-h5 text-sm-h6">Favoriten speichern</div>
              <div class="text text-body-1">
                Speichere dir Haltestellen und Routen als Favorit ab. So kannst du dir das ständige
                Eintippen deiner Routen ersparen und schnell auf sie zugreifen.
              </div>
            </div>
          </v-col>
          <!-- Planer -->
          <v-col cols="12" md="4">
            <div class="reveal reveal_r feature d-flex flex-column">
              <v-icon class="img mb-2 grey--text text--darken-4">mdi-calendar</v-icon>
              <div class="title pb-4 text-lg-h5 text-sm-h6">Persönlicher Planer</div>
              <div class="text text-body-1">
                Trage wiederkehrende Fahrten in einen Planer ein. Um pünktlich bei deinem Ziel
                anzukommen, werden dir Benachrichtigungen geschickt, welche dich an die Abfahrt
                erinnern.
              </div>
            </div>
          </v-col>
        </v-row>
      </section>
      <!-- Team -->
      <section id="team">
        <div class="wrapper">
          <!-- Divider -->
          <div class="divider d-flex flex-column">
            <v-icon class="grey--text text--darken-4">mdi-account-supervisor-circle</v-icon>
            <div class="title text-lg-h5 text-sm-h6">Unser Team</div>
            <div class="subtitle text-lg-h4 text-h5 d-sm-block d-none">
              Die Developer hinter Get Around - Vienna!
            </div>
          </div>
          <v-row class="px-xl-16 mx-xl-16">
            <!-- Profile 1 -->
            <v-col align="center" cols="12" md="4" class="pl-xl-16">
              <v-card class="rounded-xl ml-xl-16 mx-sm-0 mx-4">
                <v-avatar class="profilepic" size="180">
                  <v-img src="/img/sun.png"></v-img>
                </v-avatar>
                <div class="d-flex flex-column align-center mt-6 px-6">
                  <div class="mb-2">Projektleiter, Backend Developer</div>
                  <div class="mb-2 text-h5 font-weight-bold">Si Yu Sun</div>
                  <div class="mb-4">
                    Datenbank, Datenmodell und <br />
                    Schnittstellen Design
                  </div>
                </div>
                <v-btn href="mailto:sun.s02@htlwienwest.at" class="mb-16 primary" rounded
                  >sun.s02@htlwienwest.at</v-btn
                >
              </v-card>
            </v-col>
            <!-- Profile 2 -->
            <v-col align="center" cols="12" md="4">
              <v-card class="rounded-xl mx-sm-0 mx-4">
                <v-avatar class="profilepic" size="180">
                  <v-img src="/img/urteil.png"></v-img>
                </v-avatar>
                <div class="d-flex flex-column align-center mt-6 px-6">
                  <div class="mb-2">Frontend Developer</div>
                  <div class="mb-2 text-h5 font-weight-bold">Leopold Urteil</div>
                  <div class="mb-4">
                    Umsetzung des Designs, Interaktionen,<br />aktuelle Datenanzeige
                  </div>
                </div>
                <v-btn href="mailto:urteil.l00@htlwienwest.at" class="mb-16 primary" rounded
                  >urteil.l00@htlwienwest.at</v-btn
                >
              </v-card>
            </v-col>
            <!-- Profile 3 -->
            <v-col align="center" cols="12" md="4" class="pr-xl-16">
              <v-card class="rounded-xl mr-xl-16 mx-sm-0 mx-4">
                <v-avatar class="profilepic" size="180">
                  <v-img src="/img/stevic.png"></v-img>
                </v-avatar>
                <div class="d-flex flex-column align-center mt-6 px-6">
                  <div class="mb-2">Designer, Frontend Developer</div>
                  <div class="mb-2 text-h5 font-weight-bold">Jovana Stevic</div>
                  <div class="mb-4">
                    UI/UX/Grafikdesign, Automatisierte <br />
                    Tests, Animationen/Übergänge
                  </div>
                </div>
                <v-btn href="mailto:stevic.j02@htlwienwest.at" class="mb-16 primary" rounded
                  >stevic.j02@htlwienwest.at</v-btn
                >
              </v-card>
            </v-col>
          </v-row>
        </div>
      </section>
      <!-- Contact  -->
      <section id="contact">
        <!-- Divider -->
        <div class="divider d-flex flex-column">
          <v-icon class="grey--text text--darken-4">mdi-information</v-icon>
          <div class="title text-lg-h5 text-sm-h6">Kontakt</div>
          <div class="subtitle text-lg-h4 text-h5 d-sm-block d-none">
            Bei Fragen kannst du uns gerne kontaktieren!
          </div>
        </div>
        <!-- Contact Formular -->
        <v-sheet elevation="2" class="reveal mt-12 mx-sm-auto mx-4  rounded-xl">
          <v-form ref="form" v-model="valid" lazy-validation class="pa-md-16 pa-8">
            <div class="text-lg-h5 text-h6 text-center font-weight-bold pb-md-12 pb-4">
              Schreibe uns eine Nachricht!
            </div>
            <v-text-field
              v-model="name"
              :counter="30"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-textarea
              v-model="msg"
              label="Nachricht"
              hint="Schreibe deine Nachricht an uns!"
              auto-grow
              :rules="msgRules"
              required
            ></v-textarea>
            <v-btn class="mt-md-4" fab color="primary" :disabled="!valid" @click="send">
              <v-icon dark>
                mdi-send
              </v-icon>
            </v-btn>
          </v-form>
        </v-sheet>
        <!-- Instagram -->
        <div class="insta mt-16 text-center pa-md-16 pa-8 d-flex flex-column align-center">
          <div class="subtitle text-lg-h5 text-h6 font-weight-bold">
            Wenn du Lust und Zeit hast, kannst du uns noch auf unserem Instagram besuchen!
          </div>
          <v-btn
            href="https://www.instagram.com/getaroundvienna/"
            target="_blank"
            class="mt-8 mb-16"
            x-large
            rounded
            color="primary"
          >
            <v-icon>mdi-instagram</v-icon>
            @getaroundvienna
          </v-btn>
        </div>
      </section>
    </v-main>
    <!-- Footer -->
    <v-footer dark padless>
      <v-card flat tile class="grey darken-4 text-center" style="width:100vw">
        <v-card-text class="text-body-1">
          Get Around - Vienna | Diplomarbeit an der
          <a
            href="https://www.htlwienwest.at"
            target="_blank"
            class="light-blue--text text--lighten-2 text-decoration-none"
            >HTL Wien West</a
          >
          (Informationstechnologie) | © 2021 - 2021 www.getaroundvienna.at - All Rights Reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import StartSection from "./components/StartSection.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Email } from "./assets/smtp.js";
function animateFrom(elem, direction) {
  direction = direction || 1;
  let x = 0;
  let y = direction * 100;
  if (elem.classList.contains("reveal_l")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("reveal_r")) {
    x = 100;
    y = 0;
  } else if (elem.classList.contains("reveal_b")) {
    y *= -1;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto"
    }
  );
}
function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}
export default {
  name: "App",
  components: {
    StartSection
  },
  data: () => ({
    sections: [
      { name: "Home", to: "#home", className: { "home-link": true, active: true } },
      { name: "Features", to: "#features", className: { "features-link": true, active: false } },
      { name: "Über uns", to: "#team", className: { "team-link": true, active: false } },
      { name: "Kontakt", to: "#contact", className: { "contact-link": true, active: false } }
    ],
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    msg: "",
    msgRules: [v => !!v || "Message is required"],
    mobileMenu: false
  }),
  methods: {
    send() {
      if (!this.$refs.form.validate()) return;
      return; // Code ab hier geht nicht
      console.log(this.msg, this.name, this.email);
      Email.send({
        SecureToken: "7fb364bc-c581-4d1a-9b83-e07ce64873ee",
        To: "getaroundvienna@gmail.com",
        From: this.email,
        Subject: `Message from ${this.name}`,
        Body: this.msg
      }).then(message => alert(message));
    },
    scrollTo(target) {
      this.$vuetify.goTo(target, { duration: 800 });
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      scrub: 0.5,
      toggleClass: { targets: ".v-app-bar", className: "transparent" }
    });
    for (const section of this.sections) {
      ScrollTrigger.create({
        trigger: section.to,
        start: "top 10%",
        onToggle: ({ isActive }) => (section.className.active = isActive)
      });
    }
    // Reveal
    gsap.utils.toArray(".reveal").forEach(function(elem) {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function() {
          animateFrom(elem);
        },
        onEnterBack: function() {
          animateFrom(elem, -1);
        },
        onLeave: function() {
          hide(elem);
        }
      });
    });
  }
};
</script>

<style lang="css">
.v-application {
  overflow: hidden;
}
/* App Bar Hover */
.nav .v-btn:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 15%;
  right: 0;
  width: 70%;
  height: 2px;
  background-color: white;
  transition: transform 0.3s;
  transform: scaleX(0);
}
.nav .v-btn:hover:after,
.active:after {
  transform: scaleX(1) !important;
}
/* Divider */
.divider {
  padding-top: 5vh;
}
.divider .v-icon {
  font-size: 56px;
}
.divider .title {
  width: 80%;
  margin: 0.3em auto;
  overflow: hidden;
  text-align: center;
  font-weight: 300;
  color: #212121;
  font-weight: bold;
}
.divider .title:before,
.divider .title:after {
  content: "";
  display: inline-block;
  /* width: 15%; */
  width: 60px;
  margin: 0 0.5em 0 -55%;
  vertical-align: middle;
  border-bottom: 3px solid;
}
.divider .title:after {
  margin: 0 -55% 0 0.5em;
}
.divider .subtitle {
  text-align: center;
  margin-top: 12px;
  font-weight: bold;
}
/* Features */
#features .feature {
  text-align: center;
  padding: 10vh 10%;
}
#features .feature .text {
  line-height: 1.8em;
}
#features .feature .img {
  font-size: 100px;
}
#features .feature .img:hover {
  font-size: 110px;
  cursor: zoom-in;
}
#features .feature .title {
  font-weight: bold;
}
/* Team */
#team .wrapper {
  background-image: url("/img/map-bg.png");
  padding-bottom: 25vh;
}
#team .divider {
  padding-bottom: 5vh;
  padding-top: 10vh;
}
#team .profilepic {
  margin-top: -90px;
}
#team .v-card {
  max-width: 400px;
  min-height: 380px;
  margin-top: 15vh;
}
#team .v-btn {
  text-transform: none;
}
#team .v-card:hover {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 10px 0px rgb(0 0 0 / 12%) !important;
}
/* Contact */
#contact .v-sheet {
  max-width: 700px;
}
#contact .insta .subtitle {
  line-height: 1.5em;
  max-width: 600px;
}
/* Footer */
.v-footer {
  margin-top: 10vh;
}
.mobile-nav {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25vh;
  background-color: #212121;
}
.mobile-nav .v-btn {
  margin-top: 1vh;
}
/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
