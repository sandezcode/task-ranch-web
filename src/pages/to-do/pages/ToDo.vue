<template>
  <v-container class="pt-9">
    <v-toolbar color="transparent">
      <v-toolbar-title class="ml-0 text-primary text-h4">Por hacer</v-toolbar-title>

      <template v-slot:append>
        <v-switch color="success" density="compact" inset hide-details></v-switch>
      </template>

      <template v-slot:extension>
        <v-btn-toggle v-model="status" color="primary" density="compact">
          <v-btn text="Todo" class="text-none"></v-btn>
          <v-btn text="Pendientes" class="text-none">
            <template v-slot:prepend>
              <v-icon color="warning">mdi-square-rounded</v-icon>
            </template>
          </v-btn>
          <v-btn text="Completados" class="text-none">
            <template v-slot:prepend>
              <v-icon color="success">mdi-square-rounded</v-icon>
            </template>
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-toolbar>

    <v-sheet color="transparent" class="mt-4 ga-4 d-flex flex-wrap justify-center">
      <template v-if="true">
        <template v-for="n in 10">
          <v-card :width="($vuetify.display.xs) ? '100%' : '450'" variant="flat" rounded="lg" border
                  class="pa-2 align-self-baseline border-b-xl border-warning"
          >
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar color="secondary" icon="mdi-pin" variant="tonal" size="40"></v-avatar>
              </template>

              <v-card-title>Gestionar inventarios</v-card-title>
              <v-card-subtitle>
                Tarea de <strong>Marco Torres</strong>
              </v-card-subtitle>

              <template v-slot:append>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn color="tertiary" icon="mdi-dots-vertical" variant="text" position="absolute"
                           location="top end"
                           v-bind="props"
                    ></v-btn>
                  </template>
                </v-menu>
              </template>
            </v-card-item>

            <v-card-text>
              Lorem ipsum dolor sit amet consectetur, adipiscing elit pretium facilisis, scelerisque tortor hac class.
              Aenean luctus mauris scelerisque parturient rhoncus leo fermentum orci tempus consequat, phasellus feugiat
              volutpat montes sem facilisis cursus mollis sagittis tellus, proin per lobortis potenti eget habitant
              pharetra penatibus imperdiet. Ante velit aliquet ad accumsan nisi diam ligula odio cubilia vel, orci
              sociosqu senectus iaculis aenean vitae pretium dis hendrerit, per in libero molestie blandit sem cum
              vestibulum eros.
            </v-card-text>
          </v-card>
        </template>
      </template>
      <template v-else>
        <v-sheet color="transparent" :height="$vuetify.display.height - 180">
          <v-empty-state>
            <template v-slot:media>
              <v-img src="@/assets/illustrations/undraw_dog_walking_w27q.png" height="200"></v-img>
            </template>
            <template v-slot:title>
              ¡Todo bajo control!
            </template>
            <template v-slot:text>
              No tienes tareas pendientes en este momento. Crea una nueva y sigue avanzando con tus objetivos.
            </template>
          </v-empty-state>
        </v-sheet>
      </template>
    </v-sheet>

    <v-fab color="primary" icon="mdi-plus" size="64" app v-on:click="openDialog('create_dialog')"></v-fab>
  </v-container>

  <task-form-dialog></task-form-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import TaskFormDialog from '@/components/to-do/TaskFormDialog.vue';

export default {
  name: 'ToDo',
  components: {
    TaskFormDialog
  },
  data: () => ({
    status: 0
  }),
  methods: {
    ...mapMutations('to_do_store', [
      'setFormStatus'
    ]),
    openDialog(dialog, currentTask = {}){
      switch(dialog){
        case 'create_dialog': {
          this.setFormStatus({
            form_dialog: true,
            form_type: 'create'
          });
          break;
        }
        case 'edit_dialog': {
          //this.setCurrentTask(currentTask);
          /*this.setFormStatus({
            form_dialog: true,
            form_type: 'edit'
          });*/
          break;
        }
        case 'delete_dialog': {
          //this.setCurrentTask(currentTask);
          //this.setDeleteDialog(true);
          break;
        }
      }
    }
  }
}
</script>

<style scoped lang="sass">

</style>
