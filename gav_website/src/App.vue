<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar fixed dense flat dark class="transparent">
      <div class="d-flex align-center">
        <v-img
          alt="Get Around Vienna Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="fab-transition"
          width="35"
        />
      </div>
      <!-- <v-toolbar-title>Get Around - Vienna</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn plain>Features</v-btn>
      <v-btn plain>Über uns</v-btn>
      <v-btn plain>Kontakt</v-btn>
      <v-btn elevation="2" rounded>
        Zu der App
      </v-btn>
    </v-app-bar>
    <!-- Main -->
    <v-main>
      <!-- Start -->
      <StartSection />
      <!-- Description -->
      <section class="description">
        <v-row align="center" class="wrapper">
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-h2 grey--text text--lighten-3">
              Die <span class="pink--text text--lighten-2">Get Around - Vienna</span> App
              erleichtert dir den Transport quer durch Wien
            </div>
            <div class="w-75 text-h5 grey--text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum.
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <v-img class="mr-16" contain src="/img/phone-mockup.png"></v-img>
          </v-col>
        </v-row>
      </section>
      <!-- Features -->
      <section class="features">
        <!-- Routes -->
        <v-row align="center" class="wrapper">
          <v-col cols="12" md="5">
            <v-img class="ml-16" contain src="/img/street-map.svg"></v-img>
          </v-col>
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-h2">
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
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-h2">
              Speichere <span class="yellow--text text--accent-4">Favoriten</span> um täglich Zeit
              zu sparen
            </div>
            <div class="w-75 text-h5 grey--text">
              Ob schnell, mit wenigen Umstiegen oder einen Weg ohne bestimmte Verkehrsmittel die du
              nicht magst.
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <v-img class="mr-16" contain src="/img/fav-star.svg"></v-img>
          </v-col>
        </v-row>
        <!-- Planer -->
        <v-row align="center" class="wrapper">
          <v-col cols="12" md="5">
            <v-img class="ml-16" contain src="/img/planer.svg"></v-img>
          </v-col>
          <v-col cols="12" md="7" class="d-flex flex-column align-center">
            <div class="w-75 pb-4 text-h2">
              Dein <span class="red--text">Persönlicher Planer</span> mit deinen eigenen Routinen
            </div>
            <div class="w-75 text-h5 grey--text">
              Schickt dir rechtzeitig Benachrichtigungen, damit du nicht zu spät kommt
            </div>
          </v-col>
        </v-row>
      </section>
      <!-- About -->
      <section class="about">
        <v-row class="pa-16">
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
                <v-list-item class="align-self-end">
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
                  <!-- , Projektmanagement -->
                </div>
                <v-list-item class="align-self-end">
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
                  Backend Development
                  <!-- , Projektmanagement -->
                </div>
                <v-list-item class="align-self-end">
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
        </v-row>
      </section>
    </v-main>
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
.description .wrapper {
  background-color: #3c3c3b;
  width: 100vw;
  min-height: 100vh;
  margin-bottom: 15vh;
}
.features .wrapper {
  width: 100vw;
  min-height: 90vh;
}
.about .v-card {
  width: 400px;
  min-height: 550px;
}
.w-75 {
  width: 75%;
}
</style>
