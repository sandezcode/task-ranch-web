<template>
  <v-sheet height="100%" class="d-flex justify-center align-center">
    <v-card variant="text" width="450" class="pa-4">
      <v-card-title>Task Ranch | Registro</v-card-title>

      <v-card-item>
        <v-form ref="RegisterCollaboratorForm">
          <v-row class="pt-2">
            <v-col cols="12">
              <v-text-field v-model="name" color="primary" variant="outlined" rounded="lg" label="Nombre"
                            placeholder="..."
                            hide-details="auto"
                            :rules="[
                              v => !!v || 'El nombre es obligatorio',
                              v => v.length <= 45 || 'Max. 45 caracteres'
                            ]"
                            v-on:keyup="alert = false"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="email" type="email" color="primary" variant="outlined" rounded="lg"
                            label="Correo electrónico"
                            placeholder="Escribe tu correo electrónico"
                            hide-details="auto"
                            :rules="[
                              v => !!v || 'El correo electrónico es obligatorio',
                              v => v.length <= 255 || 'Max. 45 caracteres'
                            ]"
                            v-on:keyup="alert = false"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="password" :type="(is_show_password) ? 'text' : 'password'" color="primary"
                            variant="outlined"
                            rounded="lg"
                            label="Crea una contraseña"
                            placeholder="Escribe una contraseña segura"
                            :append-inner-icon="(is_show_password) ? 'mdi-eye' : 'mdi-eye-off'"
                            hide-details="auto"
                            :rules="[
                              v => !!v || 'Es necesario crear una contraseña',
                              v => v.length >= 6 || 'Debe tener al menos 6 caracteres',
                              v => v.length <= 20 || 'Max. 20 caracteres'
                            ]"
                            v-on:keyup="alert = false"
                            v-on:click:append-inner="is_show_password = !is_show_password"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="confirmed_password" :type="(is_show_password) ? 'text' : 'password'"
                            color="primary"
                            variant="outlined"
                            rounded="lg"
                            label="Confirma tu contraseña"
                            placeholder="Vuelve a escribir tu contraseña"
                            hide-details="auto"
                            :rules="[
                              v => !!v || 'Es necesario confirmar tu contraseña',
                              v => v.length >= 6 || 'Debe tener al menos 6 caracteres',
                              v => v.length <= 20 || 'Max. 20 caracteres',
                              v => v === password || 'Las contraseñas no coinciden'
                            ]"
                            class="pt-2"
                            v-on:keyup="alert = false"
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
               v-on:click="registerCollaborator"
        >
          Registrarme
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Register',
  data: () => ({
    name: '',
    email: '',
    password: '',
    confirmed_password: '',
    is_show_password: false,
    alert: false,
    alert_messages: [],
    is_loading: false
  }),
  computed: {
    ...mapState({
      api: state => state.api
    })
  },
  methods: {
    async registerCollaborator(){
      let registerCollaboratorForm = await this.$refs.RegisterCollaboratorForm.validate();

      if(registerCollaboratorForm.valid){
        if(this.alert){
          this.alert = false;
          this.alert_messages = [];
        }

        this.is_loading = true;

        let requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmed_password
          })
        }

        fetch(this.api('auth/register'), requestOptions)
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
