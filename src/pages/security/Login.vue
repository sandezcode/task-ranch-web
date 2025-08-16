<template>
  <v-sheet height="100%" class="d-flex justify-center align-center">
    <v-card variant="text" width="450" class="pa-4">
      <v-card-title>Task Ranch | Inicia sesion</v-card-title>

      <v-card-item>
        <v-form ref="LoginCollaboratorForm">
          <v-row class="pt-2">
            <v-col cols="12">
              <v-text-field v-model="email" type="email" color="primary" variant="outlined" rounded="lg"
                            label="Correo electrónico"
                            placeholder="Escribe tu correo electrónico"
                            hide-details="auto"
                            :rules="[v => !!v || 'El correo electrónico es obligatorio']"
                            v-on:keyup="alert = false"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="password" :type="(is_show_password) ? 'text' : 'password'" color="primary"
                            variant="outlined"
                            rounded="lg"
                            label="Contraseña"
                            placeholder="Escribe tu contraseña"
                            :append-inner-icon="(is_show_password) ? 'mdi-eye' : 'mdi-eye-off'"
                            hide-details="auto"
                            :rules="[v => !!v || 'La contraseña es obligatoria']"
                            v-on:keyup="alert = false"
                            v-on:click:append-inner="is_show_password = !is_show_password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-alert v-model="alert" color="error" density="compact" variant="text" class="text-center">
          <template v-for="alert_message in alert_messages">
            {{ alert_message }} <br>
          </template>
        </v-alert>
      </v-card-item>

      <v-card-actions class="px-4">
        <v-btn color="primary" variant="flat" rounded="lg" block size="x-large" :loading="is_loading" class="text-none"
               v-on:click="loginCollaborator"
        >
          Iniciar sesion
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    is_show_password: false,
    alert: false,
    alert_messages: [],
    is_loading: false
  }),
  computed: {
    ...mapState({
      api: state => state.config.api
    })
  },
  methods: {
    async loginCollaborator(){
      let loginCollaboratorForm = await this.$refs.LoginCollaboratorForm.validate();

      if(loginCollaboratorForm.valid){
        if(this.alert){
          this.alert = false;
          this.alert_messages = [];
        }

        this.is_loading = true;

        let requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        }

        fetch(this.api('auth/login'), requestOptions)
          .then(response => response.json())
          .then((result) => {
            this.is_loading = false;

            if(result.success){
              localStorage.setItem('auth', JSON.stringify(result.auth));
              localStorage.setItem('user', JSON.stringify(result.data.user));
              localStorage.setItem('token', JSON.stringify(result.data.token));

              this.$router.push({ name: 'ToDo' });
            }else{
              this.alert_messages = result.errors;
              this.alert = true;
            }
          })
          .catch(error => console.log('error', error));
      }
    }
  }
}
</script>

<style scoped lang="sass">

</style>
