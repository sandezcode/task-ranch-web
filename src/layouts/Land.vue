<template>
  <router-view />
</template>

<script>
export default {
  name: 'Land',
  mounted(){
    if(localStorage.getItem('current_app_theme')){
      this.$vuetify.theme.global.name = localStorage.getItem('current_app_theme');
    }
  }
}
</script>
