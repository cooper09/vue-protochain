<template>
  <div class="animated fadeIn borderline">

        <v-btn class="btn right" 
                  outlined
                  raised
                  primary
                  color="indigo" 
                  @click="closeMe()">Exit
        </v-btn>
    <h3  class="myIndigo">Pending Transactions</h3>
    <v-row>
    <v-responsive>
      <div class="task"> 
        Current Transaction ready to mined (added to the Blockchain):<br/><br/>
        <p class="wrap">
          <b>To:</b> {{tx.toAddress}} <br/>
        </p>
        <p class="wrap">
          <b>From</b> {{tx.fromAddress}}<br/>
        </p>
        <b>Amount</b>: {{tx.amount}}<br/>
      </div>

    </v-responsive> 
    </v-row>

      <div>
        <v-btn
                class="ma-2"
                outlined
                raised
                primary
                color="indigo"
                @click="beginMining()"
              >
                Start Mining
          </v-btn>
        </div>

    </div>
</template>
<script>
//import {ServerTable, ClientTable, Event} from 'vue-tables-2';
export default {
  name: 'Pending',
  data() {
    return {
      tx: {},
      coin:{},
      keys:{},
      data: () => ({

      }),
    }//end return
  },//end data
  methods: {
    closeMe(){
      this.$router.push('/');
    },
    beginMining() {
      console.log("Time to go to work: ", this.tx  )
        // see if I can send an event up the chain....
        //this,$emit('begin-minin', this.tx )
          
      this.coin.addTransaction(this.tx);

    //mine up the new transaction in its own block
    console.log("\n Starting up the 7 dwarfs...");

    const walletPublicAddr = this.keys; 
    this.coin.minePendingTransactions(walletPublicAddr);
     const finalBalance = this.coin.getBalanceOfAddress(this.keys)
                
  console.log('\n Wallet Balance 1: ', this.coin.getBalanceOfAddress(this.keys));
  console.log('\n Wallet Balance 2: ', finalBalance);

  //The New Balance should reflect the add;l mining reward
  this.$store.commit('setBalance', finalBalance )

  console.log("Final Chain: ", this.coin.chain );
  
  alert("Congratulations! You're block has been mined...")
    
    }
  },//end methods
  created () {
    this.tx = this.$store.getters.getNewTx;
    console.log("Pending - retrieved from store: ", this.tx )
    //this.$emit('update-tx', this.tx )

    this.coin = this.$store.getters.getCoin;
    console.log("Pending - Coin in the store: ", this.coin.miningReward );

      this.keys = this.$store.getters.getKeys;
      console.log("Pending - Our keys to the castle: ", this.keys)
  
  }//end created 
}//export
</script>
<style scoped>
.task {
  background: #f4f4f4;
  margin: 0.5em;
  padding: 1em;
  cursor:pointer;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
