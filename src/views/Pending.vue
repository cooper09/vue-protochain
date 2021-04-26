<template>
  <div class="animated fadeIn borderline">

        <v-btn class="btn right" 
                  outlined
                  raised
                  primary
                  color="indigo" 
                  @click="closeMe()">Exit
        </v-btn>
    <h1>Pending Transactions</h1>
    <v-row>
    <v-responsive>
      <div class="task"> 
        Current Transaction ready to mined (added to the Blockchain):<br/><br/>
        <p class="wrap">
          To: {{tx.toAddress}} <br/>
        </p>
        <p class="wrap">
          From: {{tx.fromAddress}}<br/>
        </p>
        Amount: {{tx.amount}}<br/>
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
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
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
        console.log("Time to go to work!")
        // see if I can send an event up the chain....
        //this,$emit('begin-minin', this.tx )
          
  this.coin.addTransaction(this.tx);

    //mine up the new transaction in its own block
    console.log("\n Starting up the 7 dwarfs...");

    const walletPublicAddr = "12334"
    this.coin.minePendingTransactions(walletPublicAddr);
                
  console.log('\n Wallet Balance: ', this.coin.getBalanceOfAddress(walletPublicAddr));

  console.log("Final Chain: ", this.coin.chain )

    
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
