<template>
  <div class="animated fadeIn">
    <v-btn class="closeBtn" @click="closeMe">X</v-btn>
    <h1>This is an about page</h1>

  </div>
</template>
<script>
export default {
  methods: {
    closeMe(){
      this.$router.push('/');
    }
  }
}//export
</script>
<style scoped>
  .closeBtn {
    float: right;
  }
</style>
