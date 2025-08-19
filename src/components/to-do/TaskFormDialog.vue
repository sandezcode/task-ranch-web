<template>
  <v-dialog v-model="to_do_store.form_dialog" width="600" persistent>
    <v-card rounded="lg">
      <v-toolbar color="transparent">
        <v-toolbar-title>{{ getFormTitle }}</v-toolbar-title>

        <template v-slot:append>
          <v-btn color="tertiary" icon="mdi-close" v-on:click="closeDialog"></v-btn>
        </template>

        <template v-if="alert" v-slot:extension>
          <v-alert :type="alert_type" density="compact" variant="tonal">
            <template v-for="alert_message in alert_messages">
              {{ alert_message }} <br>
            </template>
          </v-alert>
        </template>
      </v-toolbar>

      <v-card-item>
        <v-form ref="TaskForm">
          <v-row dense>
            <v-col cols="12" class="pt-3">
              <v-text-field v-model="name" color="primary" density="comfortable" variant="outlined" rounded="lg"
                            label="Nombre"
                            placeholder="Escribe un nombre breve para tu tarea"
                            hide-details="auto"
                            :rules="[
                              v => !!v || 'El nombre de la tarea es obligatorio',
                              v => (v.length <= 45) || 'El nombre no puede superar los 45 caracteres'
                            ]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" class="pt-3">
              <v-textarea v-model="description" color="primary" density="comfortable" variant="outlined" rounded="lg"
                          rows="6"
                          label="Descripción"
                          placeholder="Agrega una breve descripción de lo que trabajarás hoy"
                          no-resize
                          hide-details="auto"
                          :rules="[
                            v => !!v || 'La descripción de la tarea es obligatoria',
                            v => (v.length <= 255) || 'La descripción no puede superar los 255 caracteres'
                          ]"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" class="pt-3">
              <v-text-field v-model="start_date" type="date" color="primary" density="comfortable" variant="outlined"
                            rounded="lg"
                            label="Fecha de inicio"
                            hide-details="auto"
                            :rules="[v => !!v || 'La fecha de inicio es obligatoria']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-item>

      <v-card-actions>
        <v-btn color="primary" variant="flat" :slim="false" :loading="is_loading" :disabled="is_loading"
               class="text-none"
               v-on:click="processForm"
        >
          <template v-if="to_do_store.form_type === 'create'">Crear tarea</template>
          <template v-if="to_do_store.form_type === 'edit'">Actualizar</template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TaskFormDialog',
  data: () => ({
    alert: false,
    alert_type: undefined,
    alert_messages: [],
    name: '',
    description: '',
    start_date: '',
    is_loading: false,
    timeout: null
  }),
  computed: {
    ...mapState({
      api: state => state.api,
      to_do_store: state => state.to_do_store,
      current_task: state => state.to_do_store.current_task
    }),
    getFormTitle(){
      let formTitle = '';

      switch(this.to_do_store.form_type){
        case 'create': { formTitle = 'Nueva tarea'; break; }
        case 'edit': { formTitle = 'Editar tarea'; break; }
      }

      return formTitle;
    }
  },
  watch: {
    current_task(newCurrentTask){
      if(this.to_do_store.form_type === 'edit'){
        this.name = newCurrentTask.name;
        this.description = newCurrentTask.description;
        this.start_date = newCurrentTask.start_date;
      }
    }
  },
  methods: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapMutations('to_do_store', [
      'setFormStatus',
      'setTask',
      'setTaskUpdate',
      'resetCurrentTask'
    ]),
    async processForm(){
      clearTimeout(this.timeout);
      this.is_loading = true;

      let taskForm = await this.$refs.TaskForm.validate();

      if(taskForm.valid){
        switch(this.to_do_store.form_type){
          case 'create': { this.createTask(); break; }
          case 'edit': { this.editTask(); break; }
        }
      }else{
        this.is_loading = false;
      }
    },
    createTask(){
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          start_date: this.start_date
        })
      }

      fetch(this.api('tasks'), requestOptions)
        .then(response => response.json())
        .then((result) => {
          this.is_loading = false;

          if(result.success){
            this.closeDialog();
            this.setTask(result.data.task);
          }else{
            this.alert_type = 'error';
            this.alert_messages = result.errors;
            this.alert = true;
            this.timeout = setTimeout(() => this.alert = false, 3000);
          }
        })
        .catch(error => console.log('error', error));
    },
    editTask(){
      let requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          start_date: this.start_date
        })
      }

      fetch(this.api('tasks/' + this.current_task.task_id), requestOptions)
        .then(response => response.json())
        .then((result) => {
          this.is_loading = false;

          if(result.success){
            this.closeDialog();
            this.setTaskUpdate(result.data.task);
          }else{
            this.alert_type = 'error';
            this.alert_messages = result.errors;
            this.alert = true;
            this.timeout = setTimeout(() => this.alert = false, 3000);
          }
        })
        .catch(error => console.log('error', error));
    },
    clearFormData(){
      if(this.alert){
        this.alert = false;
        this.alert_type = undefined;
        this.alert_messages = [];
      }

      this.name = '';
      this.description = '';
      this.start_date = '';
    },
    closeDialog(){
      setTimeout(() => {
        if(this.to_do_store.form_type === 'edit'){
          this.resetCurrentTask();
        }
      }, 200);

      this.setFormStatus({
        form_dialog: false,
        form_type: ''
      });

      setTimeout(() => this.clearFormData(), 200);
    }
  }
}
</script>

<style scoped lang="sass">

</style>
