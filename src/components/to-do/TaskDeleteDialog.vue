<template>
  <v-dialog v-model="to_do_store.delete_dialog" width="550" persistent>
    <v-card rounded="lg" class="pa-4">
      <v-card-item>
        <v-card-title class="text-wrap">¿Quieres eliminar esta tarea?</v-card-title>

        <div class="mt-2">
          Estás a punto de eliminar la tarea <strong class="text-primary">{{ current_task.name }}</strong>.
          Esta acción no puede deshacerse.
        </div>
      </v-card-item>

      <v-card-actions :class="{ 'flex-column-reverse': $vuetify.display.xs }">
        <v-spacer></v-spacer>
        <v-btn variant="outlined" :block="$vuetify.display.xs" class="text-none" v-on:click="closeDialog">
          Cancelar
        </v-btn>
        <v-btn color="torch" variant="flat" :block="$vuetify.display.xs" :slim="false" :loading="is_loading"
               class="text-none"
               :class="{ 'ml-0 mb-2': $vuetify.display.xs }"
               v-on:click="deleteTask"
        >
          Eliminar definitivamente
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TaskDeleteDialog',
  data: () => ({
    is_loading: false
  }),
  computed: {
    ...mapState({
      api: state => state.api,
      to_do_store: state => state.to_do_store,
      current_task: state => state.to_do_store.current_task
    })
  },
  methods: {
    ...mapGetters([
      'getToken'
    ]),
    ...mapMutations('to_do_store', [
      'setTaskDelete',
      'setDeleteDialog',
      'resetCurrentTask'
    ]),
    deleteTask(){
      this.is_loading = true;

      let requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
        }
      }

      fetch(this.api('tasks/' + this.current_task.task_id), requestOptions)
        .then(response => response.json())
        .then((result) => {
          this.is_loading = false;

          if(result.success){
            this.closeDialog();
            this.setTaskDelete(result.data.deleted_task_id);
          }
        })
        .catch(error => console.log('error', error));
    },
    closeDialog(){
      setTimeout(() => this.resetCurrentTask(), 200);

      this.setDeleteDialog(false);
    }
  }
}
</script>

<style scoped lang="sass">

</style>
