<template>
  <div class="animated fadeIn">
    <v-btn class="closeBtn" @click="closeMe">X</v-btn>
    <h1>Content Provider</h1>
    Current Balance: {{balance}}test
      <v-tabs>
        <v-tab @click="openForm()">Video</v-tab>
        <v-tab>Audio</v-tab>
        <v-tab>NFT</v-tab>
    </v-tabs>
        <v-container>
        <form >
          <br/><br/>
            <b>Your Address:</b>  <input id="provider" type="text" v-model="from" :placeholder="keys.publicKey" class="border" readonly="readonly" width="60"><br/>
            <p  class="smallFont">This is your wallet address. You cannot change it because you can only spend your own coins.</p>
            <br/>
            <b>Identifier:</b> <input id="id" type="text" v-model="hash" placeholder ="0x000" class="border" readonly="readonly"><br/>
            <p  class="smallFont">Your content's unique identifier</p><br/>
            <b>Title:</b> <input id="title" type="text" v-model="title" placeholder ="" class="border" width="90"><br/>
            <p  class="smallFont">If you have a specific title you want to use</p><br/>

            <b>Content Location:</b> <input id="location" type="text" v-model="location" placeholder ="File Location" class="border"><br/>
            <p  class="smallFont">Your content's location</p><br/>

            <b>Provider:</b> <input id="provider" type="text" v-model="provider" placeholder ="" class="border"><br/>
            <p  class="smallFont">Your content's provider/artist/owner</p><br/>
           
        </form>
        <div>
              <v-btn
                class="ma-2"
                outlined
                raised
                primary
                color="indigo"
                @click="mintCoin()"
              >
                Create Content
              </v-btn>
        </div>
       </v-container>

  </div>
</template>
<script>
import {Token} from '../blockchain_token.js';
import {createId} from '../helpers.js';
export default {

  data() {
    return {
      coin: {},
      keys: {},
      from:'',
      to: '',
      amount: '',
      balance: 0,
      hash: "",
      title: "The Rise and Fall of Pittsburgh",
      location: "ipfs//File",
      provider: "Acme Video"
    }
  },
  methods: {
    closeMe(){
      this.$router.push('/');
    },
    mintCoin() {
        console.log("Mint Coin for the provider:", this.coin);
        console.log("Provider mintcoin - Our keys to the castle: ", this.keys)
        
        // mint one hundred token and transfer 
        const token = new Token();
        console.log("New Token: ", token);
        token.transfer(this.keys, 100);

        //create transaction add this to blockchain
        // 1) assign content a unique hash
        // 2) add metadata transaction block

        //make sure goodies get to where their going
        //ipfs or whatever


    // move to the bottom
        console.log('\n Provider.mintCoin - Wallet Balance: ', this.coin.getBalanceOfAddress(this.keys));
        this.balance = this.coin.getBalanceOfAddress(this.keys);
    
    }//end  mintcoin
  },//end methods
    created () {
    //every module should have access to the same chain and keys

      console.log("Provider - Begin CreateTransaction!");
      this.coin = this.$store.getters.getCoin;
      console.log("Provider - Coin in the store: ", this.coin.miningReward );
      this.keys = this.$store.getters.getKeys;

    //Everything created here is an NFT so everything is assigned a unique identifier
        this.hash = createId();

        console.log(" Our new Id: ", this.hash )
  
  }//end created
}//export
</script>
<style scoped>
  .closeBtn {
    float: right;
  }
</style>
