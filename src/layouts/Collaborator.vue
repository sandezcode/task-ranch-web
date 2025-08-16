<template>
  <v-btn color="primary" append-icon="mdi-chevron-down" variant="outlined" rounded="lg" position="fixed"
         location="top right"
         class="ma-2"
         style="z-index: 9999;"
  >
    Marcos Torres
  </v-btn>

  <v-main>
    <v-row no-gutters>
      <v-col cols="12" lg="8" class="mx-auto">
        <router-view />
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  name: 'Collaborator'
}
</script>

<style scoped lang="sass">

</style>
