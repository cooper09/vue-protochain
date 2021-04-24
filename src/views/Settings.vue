<template>
  <div class="animated fadeIn">
    <v-btn class="right" @click="closeMe">X</v-btn>
    <h1>Settings page</h1>
    <div>
      <form  @submit="submitSettings()">
            Difficulty: <input type="text" v-model="difficulty" placeholder ="2" class="border"><br/>
            
            Mining Reward: <input type="text" v-model="reward" placeholder ="100" class="border"><br/>
 
        </form>
        <v-btn @click="submitSettings">Submit</v-btn>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Settings',
  data () {
    return {
      difficulty: '',
      reward: '100'
    }
  },
  methods: {
    closeMe(){
      this.$router.push('/');
    },
    submitSettings() {
      console.log("Submit Settings");
    }
  }
}//export
</script>
<style scoped>
</style>
