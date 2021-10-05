<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed dense flat dark class="transparent">
      <a href="#">
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
      <v-btn plain href="#description">Was</v-btn>
      <v-btn plain href="#features">Features</v-btn>
      <v-btn plain href="#about">Über uns</v-btn>
      <v-btn plain href="#">Kontakt</v-btn>
      <v-btn elevation="2" rounded>
        Zu der App
      </v-btn>
    </v-app-bar>
    <!-- Main -->
    <v-main>
      <!-- Start -->
      <StartSection />
      <!-- Description -->
      <section id="description">
        <v-row align="center" class="wrapper">
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div
              class="w-75 pb-4 text-lg-h2 text-md-h3 text-h4 pt-lg-0 pt-16 grey--text text--lighten-3"
            >
              Die <span class="pink--text text--lighten-2">Get Around - Vienna</span> App
              erleichtert dir den Transport quer durch Wien
            </div>
            <div class="w-75 text-h5 grey--text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum.
            </div>
          </v-col>
          <v-col cols="12" md="5" class="pa-md-0 pa-16">
            <v-img class="mr-16" contain src="/img/phone-mockup.png"></v-img>
          </v-col>
        </v-row>
      </section>
      <!-- Features -->
      <section id="features">
        <!-- Routes -->
        <v-row align="center" class="wrapper">
          <v-col class="pa-md-0 pa-16" cols="12" md="5">
            <v-img class="ml-md-16" contain src="/img/street-map.svg"></v-img>
          </v-col>
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-lg-h2 text-md-h3 text-h4">
              Lasse dir die
              <span class="light-blue--text text--lighten-2">Beste Route</span> von A zu B nach
              deinen <span class="light-blue--text text--lighten-2">Kriterien</span> berechnen
            </div>
            <div class="w-75 text-h5 grey--text">
              Ob schnell, mit wenigen Umstiegen oder einen Weg ohne bestimmte Verkehrsmittel die du
              nicht magst.
            </div>
          </v-col>
        </v-row>
        <!-- Favourites -->
        <v-row align="center" class="wrapper">
          <v-col class="pa-md-0 pa-16" order-md="2" cols="12" md="5">
            <v-img class="mr-md-16" contain src="/img/fav-star.svg"></v-img>
          </v-col>
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-lg-h2 text-md-h3 text-h4">
              Speichere <span class="yellow--text text--accent-4">Favoriten</span> um täglich Zeit
              zu sparen
            </div>
            <div class="w-75 text-h5 grey--text">
              Ob schnell, mit wenigen Umstiegen oder einen Weg ohne bestimmte Verkehrsmittel die du
              nicht magst.
            </div>
          </v-col>
        </v-row>
        <!-- Planer -->
        <v-row align="center" class="wrapper pb-md-0 pb-16">
          <v-col class="pa-md-0 pa-16" cols="12" md="5">
            <v-img class="ml-md-16" contain src="/img/planer.svg"></v-img>
          </v-col>
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-lg-h2 text-md-h3 text-h4">
              Dein <span class="red--text">Persönlicher Planer</span> mit deinen eigenen Routinen
            </div>
            <div class="w-75 text-h5 grey--text">
              Schickt dir rechtzeitig Benachrichtigungen, damit du nicht zu spät kommt
            </div>
          </v-col>
        </v-row>
      </section>
      <!-- About -->
      <section id="about">
        <v-row class="mx-auto mb-16 mt-md-0 mt-16">
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
        <div class="pa-16 wrapper">
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
.w-75 {
  width: 75%;
}
.w-100 {
  width: 100%;
}
#description .wrapper {
  background-color: #3c3c3b;
  width: 100vw;
  min-height: 100vh;
  margin-bottom: 10vh;
  border-bottom-left-radius: 300px !important;
  /* border-bottom-right-radius: 124px !important; */
}
#features .wrapper {
  width: 100vw;
  min-height: 85vh;
}
#features .row {
  width: 90%;
  margin: auto;
}
#about .v-card {
  width: 400px;
  min-height: 550px;
}
#about .row {
  width: 85%;
}

#contact .wrapper {
  background-color: #3c3c3b;
  width: 100vw;
  min-height: 80vh;
  margin-top: 10vh;
  border-top-right-radius: 300px !important;
}
</style>
