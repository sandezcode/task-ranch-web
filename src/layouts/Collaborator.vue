<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" append-icon="mdi-chevron-down" variant="outlined" rounded="lg" position="fixed"
             location="top right"
             class="ma-2"
             style="z-index: 9999;"
             v-bind="props"
      >
        {{ user.name }}
      </v-btn>
    </template>

    <v-card rounded="lg">
      <v-list density="compact" class="pa-2">
        <v-list-item base-color="torch" prepend-icon="mdi-exit-to-app" slim rounded="lg" v-on:click="logout">
          <v-list-item-title>Cerrando sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>

  <v-main>
    <v-row no-gutters>
      <v-col cols="12" lg="8" class="mx-auto">
        <router-view />
      </v-col>
    </v-row>
  </v-main>

  <v-dialog v-model="logout_dialog" width="300" persistent>
    <v-card rounded="lg">
      <v-card-item>
        <v-card-subtitle class="pb-0">Cerrando sesión...</v-card-subtitle>

        <template v-slot:append>
          <v-progress-circular color="primary" width="2" size="20" indeterminate></v-progress-circular>
        </template>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Collaborator',
  data: () => ({
    logout_dialog: false
  }),
  computed: {
    ...mapState({
      api: state => state.api,
      user: state => state.user
    })
  },
  methods: {
    ...mapGetters([
      'getToken'
    ]),
    logout(){
      this.logout_dialog = true;

      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        }
      }

      fetch(this.api('auth/logout'), requestOptions)
        .then(response => response.json())
        .then((result) => {
          if(result.success){
            this.$store.dispatch('resetStore');
            this.$store.dispatch('clearLocalStorage');

            this.$router.push({ name: 'Login' });
          }
        })
        .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped lang="sass">

</style>
