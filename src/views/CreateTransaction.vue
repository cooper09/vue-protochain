<template>
    <v-container   class="animated fadeIn container">
      <span class="right"><v-btn                   outlined
                  raised
                  primary
                  color="indigo"  @click="exitPage()">Exit</v-btn></span>
   <h3 class="myIndigo">Create Transaction </h3>
  <p>Transfer some tokens/coins to someone!</p>
    <v-container>
        <form  @submit="submitTransaction()">gsdf
          <br/><br/>
            <b>From Address:</b>  <input id="from" type="text" v-model="from" :placeholder="keys.publicKey" class="border" readonly="readonly"><br/>
            <p  class="smallFont">This is your wallet address. You cannot change it because you can only spend your own coins.</p>
            <br/>
            <b>To Address:</b> <input id="to" type="text" v-model="to" placeholder ="0x000" class="border"><br/>
            <p  class="smallFont">The address of the wallet where you want to send the money to. You can type random text here (if you are not interested in recovering the funds)
</p><br/>
            <b>Amount:</b> <input id="amount" type="text" v-model="amount" placeholder ="100" class="border"><br/>
            <p  class="smallFont">You can transfer any amount. Account balance is not checked in this demo. Have at it</p><br/>
           
        </form>
        <div>
              <v-btn
                class="ma-2"
                outlined
                raised
                primary
                color="indigo"
                @click="createTx()"
              >
                Sign & Create transaction
              </v-btn>
        </div>
       </v-container>
    </v-container>
</template>
<script>
import {Transaction} from '../blockchain_signing.js';
import Pending from './Pending';

export default {
  components: {
    Pending,
  },
  data() {
    return {
      coin: {},
      keys: {},
      from:'',
      to: '',
      amount: ''
    }
  },
  methods: {
    closeMe(){
      this.$router.push('/');
    },
    createTx (){
      console.log("Create and sign a transaction", this.coin);
      console.log("CreateTX - Our keys to the castle: ", this.keys)

  //retrieve our public (walletPublicAddr) and  () key
      const walletKey = this.keys.walletKey;
      const walletPublicAddr = this.keys.walletPublicAddr;

      const newTx = new Transaction(walletPublicAddr,this.keys.publicKey, this.amount );
      console.log("our New transaction: ", newTx );

  //sign transaction with the private key
    newTx.signTransaction(walletKey); 
    console.log("Signed transaction: ", newTx.signature );

    //set the new transaction to the store
    this.$store.commit ('setNewTx', newTx );
    const tx = this.$store.getters.getNewTx;
    console.log("CreateTransaction - Transaction in the store: ", tx );

    this.$router.push('/pending');
    //this.$router.push({name: './pending', params: {foo: "test" }})

 
    }//end created
  },//end methods
  emits: [
    "update-tx"
  ],
  created () {
      console.log("Begin CreateTransaction!");
      this.coin = this.$store.getters.getCoin;
      console.log("CreateTransaction - Coin in the store: ", this.coin.miningReward );

      this.keys = this.$store.getters.getKeys;
  
  }
}//export
</script>
<style scoped>
input[type="text"] {
    box-sizing: border-box;
    padding-left: 10px;
}
</style>
