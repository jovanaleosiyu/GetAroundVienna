<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed dense flat dark class="transparent">
      <a href="/">
        <v-img
          alt="Get Around Vienna Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="fab-transition"
          width="35"
        />
      </a>
      <!-- <v-toolbar-title>Get Around - Vienna</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <!-- Desktop -->
      <div class="d-md-block d-none">
        <v-btn plain href="/">Home</v-btn>
        <v-btn plain href="#features">Features</v-btn>
        <v-btn plain href="#about">Über uns</v-btn>
        <v-btn plain href="#contact">Kontakt</v-btn>
        <v-btn elevation="2" rounded>
          Zu der App
        </v-btn>
      </div>
      <!-- Mobile -->
      <div class="d-md-none d-inline-flex">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <div class="mobile-nav d-none">
          <v-list nav class="pa-12">
            <v-list-item href="#description">Was</v-list-item>
            <v-list-item href="#features">Features</v-list-item>
            <v-list-item href="#about">Über uns</v-list-item>
            <v-list-item href="#contact">Kontakt</v-list-item>
          </v-list>
          <!-- <v-btn plain href="#description">Was</v-btn>
          <v-btn plain href="#features">Features</v-btn>
          <v-btn plain href="#about">Über uns</v-btn>
          <v-btn plain href="#">Kontakt</v-btn>
          <v-btn elevation="2" rounded>
            Zu der App
          </v-btn> -->
        </div>
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
        <!-- Routes -->
        <v-row class="my-sm-16 mb-16 pb-lg-16 mx-md-16 mx-8 px-lg-16 px-0">
          <v-col cols="12" md="4" xs="12">
            <div class="feature d-flex flex-column">
              <v-icon class="img mb-2 grey--text text--darken-4">mdi-routes</v-icon>
              <div class="title pb-4 text-lg-h5 text-sm-h6">Routen berechnen</div>
              <div class="text text-body-1">
                Lasse dir die beste Route zwischen zwei Orten berechnen. Diese kannst du nach
                verschiedenen Kriterien filtern, wie zum Beispiel nach Umstiegen oder Linien.
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4" xs="12">
            <div class="feature d-flex flex-column">
              <v-icon class="img mb-2 grey--text text--darken-4">mdi-star</v-icon>
              <div class="title pb-4 text-lg-h5 text-sm-h6">Favoriten speichern</div>
              <div class="text text-body-1">
                Speichere dir Haltestellen und Routen als Favorit ab. So kannst du dir das ständige
                Eintippen deiner Routen ersparen und schnell auf sie zugreifen.
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4" xs="12">
            <div class="feature d-flex flex-column">
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
        <v-row class="mx-auto grey lighten-5">
          <!-- Profile 1 -->
          <v-col align="center">
            <v-card class="rounded-xl">
              <v-card-text class="d-flex pt-12 px-8 flex-column align-start">
                <v-avatar size="128">
                  <v-img
                    src="https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  ></v-img>
                </v-avatar>
                <div class="mt-5 pb-1 text-h3 indigo--text">
                  Jovana Stevic
                </div>
                <div class="text-caption">
                  UI/UX Design, Frontend Development, Marketing
                  <!-- , Projektmanagement -->
                </div>
                <v-list-item href="mailto:stevic.j02@htlwienwest.at" class="align-self-end">
                  <v-list-item-content class="text-caption">
                    stevic.j02@htlwienwest.at
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-email
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <p class="text-justify">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                  vero eos et accusam et justo duo dolores et ea rebum...
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Profile 2 -->
          <v-col align="center">
            <v-card class="rounded-xl">
              <v-card-text class="d-flex pt-12 px-8 flex-column align-start">
                <v-avatar size="128">
                  <v-img
                    src="https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  ></v-img>
                </v-avatar>
                <div class="mt-5 pb-1 text-h3 indigo--text">
                  Si Yu Sun
                </div>
                <div class="text-caption">
                  Backend Development
                </div>
                <v-list-item href="mailto:sun.s02@htlwienwest.at" class="align-self-end">
                  <v-list-item-content class="text-caption">
                    sun.s02@hltwienwest.at
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-email
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <p class="text-justify">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                  vero eos et accusam et justo duo dolores et ea rebum...
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Profile 3 -->
          <v-col align="center">
            <v-card class="rounded-xl">
              <v-card-text class="d-flex pt-12 px-8 flex-column align-start">
                <v-avatar size="128">
                  <v-img
                    src="https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  ></v-img>
                </v-avatar>
                <div class="mt-5 pb-1 text-h3 indigo--text">
                  Leopold Urteil
                </div>
                <div class="text-caption">
                  Frontend Development
                </div>
                <v-list-item href="mailto:urteil.l00@htlwienwest.at" class="align-self-end">
                  <v-list-item-content class="text-caption">
                    urteil.l00@htlwienwest.at
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-email
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <p class="text-justify">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                  vero eos et accusam et justo duo dolores et ea rebum...
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
      <!-- Contact  -->
      <section id="contact">
        <div class="elevation-4 pa-16 d-flex flex-column justify-center wrapper">
          <div class="text-md-h1 text-h3 pb-8 red--text text--accent-2">
            Interresse <span class="white--text">geweckt?</span><br />Fragen?
          </div>
          <div class="text-md-h5 pb-8 white--text">
            Erreiche uns auf folgenden Social Media Profilen
          </div>
          <div>
            <v-btn class="mr-4 mb-sm-0 mb-4" rounded x-large>
              Instagram
              <v-icon right dark>
                mdi-instagram
              </v-icon>
            </v-btn>
            <v-btn class="mb-sm-0 mb-4" rounded x-large>
              Facebook
              <v-icon right dark>
                mdi-facebook
              </v-icon>
            </v-btn>
          </div>
        </div>
      </section>
    </v-main>
    <v-footer dark padless>
      <v-card flat tile class="red accent-2 text-center w-100">
        <v-card-text class="white--text">
          Get Around - Vienna | Diplomarbeit an der
          <a
            class="text-decoration-none indigo--text text--accent-1"
            href="https://www.htlwienwest.at/"
            target="_blank"
            >HTL Wien West</a
          >
          (Informationstechnologie) | 5BHITM 2021/22
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="pa-2 text-right">
          © 2021 - 2021 www.getaroundvienna.at - All Rights Reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import StartSection from "./components/StartSection.vue";
export default {
  name: "App",
  components: {
    StartSection
  },
  data: () => ({
    //
  })
};
</script>

<style lang="css">
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
#features .feature .title {
  font-weight: bold;
}
/* Team */
#about .v-card {
  width: 400px;
  min-height: 550px;
}
#about .row {
  margin: 15vh 0 0 0;
  padding: 12vh 0 20vh 0;
}
#contact .wrapper {
  background-color: #3c3c3b;
  width: 100vw;
  min-height: 95vh;
}
/*  */
.mobile-nav {
  position: fixed;
  right: 0;
  width: 100vw;
}
</style>
