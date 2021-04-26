<template>
  <div class="animated fadeIn borderline">
        <v-btn class="btn right" 
          outlined
          raised
          primary
          color="indigo" 
          @click="closeMe()">Exit
        </v-btn>
    <h3  class="myIndigo">List of Transactions for Block: </h3> <span><p class="wrap">{{block.hash}}</p></span>

    <div v-for="tx in transactions" :key="tx.toAddress">
      <span class="transaction" > Transaction </span>
      <div class="tx">
        <p class="wrap"><b>To: </b>{{tx.toAddress}}</p>
        <p class="wrap"><b>From: </b>{{tx.fromAddress}}</p>
        <p><b>Amount: </b>{{tx.amount}}</p>
      </div>
    </div>
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
.tx {
  background: #f4f4f4;
  margin: 0.5em;
  padding: 1em;
  cursor:pointer;
}
.tx h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.transaction {
  color: white;
  font-style: bold;
  background: indigo;
  padding: 0.25em;
}

</style>
