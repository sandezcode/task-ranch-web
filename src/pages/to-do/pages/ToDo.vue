<template>
  <v-container class="pt-9">
    <v-toolbar color="transparent">
      <v-toolbar-title class="ml-0 text-primary text-h4">Por hacer</v-toolbar-title>

      <template v-slot:append>
        <v-btn :icon="($vuetify.theme.global.current.dark) ? 'mdi-weather-night' : 'mdi-weather-sunny'" variant="plain"
               v-on:click="toggleTheme"
        ></v-btn>

        <v-switch v-model="only_my_tasks" color="success" density="compact" inset hide-details></v-switch>
      </template>

      <template v-slot:extension>
        <v-btn-toggle v-model="status" color="primary" density="compact">
          <v-btn text="Todo" value="all" class="text-none"></v-btn>
          <v-btn text="Pendientes" value="0" class="text-none">
            <template v-slot:prepend>
              <v-icon color="warning">mdi-square-rounded</v-icon>
            </template>
          </v-btn>
          <v-btn text="Completados" value="1" class="text-none">
            <template v-slot:prepend>
              <v-icon color="success">mdi-square-rounded</v-icon>
            </template>
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-toolbar>

    <template v-if="!is_loading_data">
      <v-sheet color="transparent" class="mt-4 ga-4 d-flex flex-wrap justify-center">
        <template v-if="to_do_store.tasks.length">
          <template v-if="status">
            <template v-for="task in to_do_store.tasks">
              <v-scale-transition>
                <template v-if="((only_my_tasks === true) && (task.user.user_id === user.user_id)) || (only_my_tasks === false)">
                  <template v-if="(task.status === parseInt(status)) || (status === 'all')">
                    <v-card :width="($vuetify.display.xs) ? '100%' : '450'" variant="flat" rounded="lg" border
                            class="pa-2 align-self-baseline border-b-xl"
                            :class="(task.status) ? 'border-success' : 'border-warning'"
                    >
                      <template v-if="task.is_loading" v-slot:loader>
                        <v-progress-linear color="primary" indeterminate></v-progress-linear>
                      </template>

                      <v-card-item>
                        <template v-slot:prepend>
                          <v-avatar color="secondary" icon="mdi-pin" variant="tonal" size="40"></v-avatar>
                        </template>

                        <v-card-title :class="{ 'text-decoration-line-through' : task.status === 1 }">
                          {{ task.name }}
                        </v-card-title>
                        <v-card-subtitle>Tarea de <strong>{{ task.user.name }}</strong></v-card-subtitle>

                        <template v-if="task.user.user_id === user.user_id" v-slot:append>
                          <v-menu>
                            <template v-slot:activator="{ props }">
                              <v-btn color="tertiary" icon="mdi-dots-vertical" variant="text" position="absolute"
                                     location="top end"
                                     v-bind="props"
                              ></v-btn>
                            </template>

                            <v-card rounded="lg">
                              <v-list density="compact" class="pa-2">
                                <template v-if="task.status === 0">
                                  <v-list-item prepend-icon="mdi-square-edit-outline" slim rounded="lg"
                                               v-on:click="openDialog('edit_dialog', task)"
                                  >
                                    <v-list-item-title>Editar</v-list-item-title>
                                  </v-list-item>
                                </template>

                                <v-list-item prepend-icon="mdi-delete-outline" slim rounded="lg"
                                             v-on:click="openDialog('delete_dialog', task)"
                                >
                                  <v-list-item-title>Eliminar</v-list-item-title>
                                </v-list-item>
                              </v-list>

                              <v-divider></v-divider>

                              <v-list density="compact" class="pa-2">
                                <v-list-item base-color="success" variant="tonal" slim rounded="lg"
                                             :disabled="task.status === 1"
                                             v-on:click="completeTask(task)"
                                >
                                  <v-list-item-title>Completar tarea</v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-menu>
                        </template>
                      </v-card-item>

                      <v-card-text :class="{ 'text-decoration-line-through' : task.status === 1 }">
                        {{ task.description }}
                      </v-card-text>

                      <v-card-subtitle class="text-right">
                        {{ task.start_date_human }}
                        <v-icon :color="(task.status) ? 'success' : 'warning'">mdi-circle-medium</v-icon>
                      </v-card-subtitle>
                    </v-card>
                  </template>
                </template>
              </v-scale-transition>
            </template>
          </template>
          <template v-else>
            <v-sheet color="transparent" :height="$vuetify.display.height - 180">
              <v-empty-state>
                <template v-slot:media>
                  <v-img src="@/assets/illustrations/undraw_taken_mshk.png" height="200"></v-img>
                </template>
                <template v-slot:title>
                  Usa los filtros para ver las tareas
                </template>
                <template v-slot:text>
                  Selecciona una opción en los filtros de arriba (Todo, Pendientes o Completados) para mostrar tus
                  tareas.
                </template>
              </v-empty-state>
            </v-sheet>
          </template>
        </template>
        <template v-else>
          <v-sheet color="transparent" :height="$vuetify.display.height - 180">
            <v-empty-state>
              <template v-slot:media>
                <v-img src="@/assets/illustrations/undraw_welcoming_42an.png" height="200"></v-img>
              </template>
              <template v-slot:title>
                Bienvenido a tu planificador
              </template>
              <template v-slot:text>
                Empieza organizando tu día: agrega tu primera tarea y mantén el enfoque en tus objetivos.
              </template>
            </v-empty-state>
          </v-sheet>
        </template>
      </v-sheet>
    </template>
    <template v-else>
      <v-sheet color="transparent" class="mt-4 d-flex justify-center">
        <v-card variant="text">
          <v-card-item class="justify-center">
            <v-progress-circular color="grey-lighten-1" indeterminate></v-progress-circular>
          </v-card-item>
          <v-card-subtitle>Cargando las tareas...</v-card-subtitle>
        </v-card>
      </v-sheet>
    </template>

    <v-fab color="primary" icon="mdi-plus" size="64" app v-on:click="openDialog('create_dialog')"></v-fab>
  </v-container>

  <task-form-dialog></task-form-dialog>
  <task-delete-dialog></task-delete-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import TaskFormDialog from '@/components/to-do/TaskFormDialog.vue';
import TaskDeleteDialog from '@/components/to-do/TaskDeleteDialog.vue';

export default {
  name: 'ToDo',
  components: {
    TaskFormDialog,
    TaskDeleteDialog
  },
  mounted(){
    this.getTasks();
  },
  data: () => ({
    only_my_tasks: false,
    status: 'all',
    is_loading_data: true
  }),
  computed: {
    ...mapState({
      api: state => state.api,
      user: state => state.user,
      to_do_store: state => state.to_do_store
    })
  },
  methods: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapMutations('to_do_store', [
      'setFormStatus',
      'setTasks',
      'setTaskUpdate',
      'setCurrentTask',
      'setDeleteDialog'
    ]),
    toggleTheme(){
      this.$vuetify.theme.global.name = (this.$vuetify.theme.global.current.dark) ? 'light' : 'dark';

      localStorage.setItem('current_app_theme', this.$vuetify.theme.global.name);
    },
    getTasks(){
      let requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        }
      }

      fetch(this.api('tasks'), requestOptions)
        .then(response => response.json())
        .then((result) => {
          this.is_loading_data = false;

          if(result.success){
            this.setTasks(result.data.tasks);
          }
        })
        .catch(error => console.log('error', error));
    },
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
          this.setCurrentTask(currentTask);
          this.setFormStatus({
            form_dialog: true,
            form_type: 'edit'
          });
          break;
        }
        case 'delete_dialog': {
          this.setCurrentTask(currentTask);
          this.setDeleteDialog(true);
          break;
        }
      }
    },
    completeTask(task){
      task.is_loading = true;

      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        },
        body: JSON.stringify({ task_id: task.task_id })
      }

      fetch(this.api('tasks/complete-task'), requestOptions)
        .then(response => response.json())
        .then((result) => {
          task.is_loading = false;

          if(result.success){
            this.setTaskUpdate(result.data.task);
          }
        })
        .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped lang="sass">

</style>
