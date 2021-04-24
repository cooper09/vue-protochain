<template>
  <div class="animated fadeIn">
    <v-btn class="right" @click="closeMe">X</v-btn>
    <h1>Create Transaction page</h1>
<!--    <Pending /> -->

     <v-container>
        <form  @submit="submitTransaction()">
          <br/><br/>
            From Address: <input id="from" type="text" v-model="from" :placeholder="keys.publicKey" class="border" readonly="readonly"><br/>
          
            <br/>
            To Address:  <input id="to" type="text" v-model="to" placeholder ="" class="border"><br/>  <br/><br/>
            
            Amount: <input id="amount" type="text" v-model="amount" placeholder ="" class="border"><br/>
           
           
        </form>
            <v-btn  @click="createTx()">Sign & Create</v-btn>
     </v-container>
       
  </div>
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
    showPending (){
      alert("Show pending page....");
      //this.$router.push('/pending')
    },
    createTx (){
      console.log("Create and sign a transaction", this.coin);
      //this.keys = this.$store.getters.getKeys;
      console.log("CreateTX - Our keys to the castle: ", this.keys)

      const walletKey = this.keys.walletKey;
      const walletPublicAddr = this.keys.walletPublicAddr;

      const newTx = new Transaction(walletPublicAddr,this.keys.publicKey, 100);
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

       //this.keys = this.$route.params.keys;
       //console.log("CreateTransaction - keys: ", this.keys)

      this.keys = this.$store.getters.getKeys;
      //console.log("CreateTransaction - Our keys to the castle: ", this.keys)
  
  }
}//export
</script>
<style scoped>
</style>
