<template>
  <div class="animated fadeIn">
    <v-btn class="right" @click="closeMe">X</v-btn>
    <h1>List Transactions page</h1>
    {{transactions}}
  </div>
</template>
<script>
export default {
  name:'ListTransactions',
  data () {
    return {
      coin: {},
      chain:{},
      block: '', 
      transactions:[]
    }
  },
  methods: {
    closeMe(){
      this.$router.push('/');
    }
  },
  created() {
    //First get the coin class..

      console.log("this route params: ", this.$route.params.foo );

        this.block = this.$route.params.foo;
        console.log("selected block: ", this.block );

        this.coin = this.$store.getters.getCoin;

        this.chain = this.coin.chain;
        //console.log()

        this.chain.map( block => {
          if (block.hash === this.block.hash ) {
             this.transactions = block.transactions;
             return 
          } //end iffy 
          return ("Transaction not found")
        })
  }
}//export
</script>
<style scoped>
</style>
