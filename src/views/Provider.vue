<template>
  <div class="animated fadeIn">
    <v-btn class="closeBtn" @click="closeMe">X</v-btn>
    <h1>Content Provider</h1>
      <v-tabs>
        <v-tab @click="openForm()">Video</v-tab>
        <v-tab>Audio</v-tab>
        <v-tab>NFT</v-tab>
    </v-tabs>
        <v-container>
        <form >
          <br/><br/>
            <b>Your Adderss:</b>  <input id="provider" type="text" v-model="from" :placeholder="keys.publicKey" class="border" readonly="readonly"><br/>
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
export default {

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
    mintCoin() {
        console.log("Mint Coin for the provider:", this.coin);
        console.log("Provider mintcoin - Our keys to the castle: ", this.keys)
        const token = new Token();
        console.log("New Token: ", token);
        token.transfer(this.keys, 100)
    }
  },//end methods
}//export
</script>
<style scoped>
  .closeBtn {
    float: right;
  }
</style>
