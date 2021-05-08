<template>
    <v-container   class="animated fadeIn container">
      <span class="right"><v-btn                   outlined
                  raised
                  primary
                  color="indigo"  @click="closeMe()">Exit</v-btn></span>
   <h3 class="myIndigo">Submit Proposal</h3>
  <p>Submit your proposal to be voted on</p>
    <v-container>
        <form >
          <br/><br/>
            <b>Proposor/Sponsor:</b>  <input id="from" type="text" v-model="from" :placeholder="keys.publicKey" class="border" readonly="readonly"><br/>
            <p  class="smallFont">This is your wallet address. You cannot change it because you can only spend your own coins.</p>
            <br/>
            <b>Type of Share:</b> <input id="share" type="text" v-model="token" placeholder ="Privi" class="border"><br/>
            <p  class="smallFont">Token to share. 
              </p><br/>
            <b>Shares Requested:</b> <input id="amount" type="text" v-model="amount" placeholder ="100" class="border"><br/>
            <p  class="smallFont">Amount required for project.</p><br/>
            <b>Payment Token:</b> <input id="token" type="text" v-model="token" placeholder ="PRIV" class="border"><br/>
            <p  class="smallFont">Token for payment.
            </p><br/>
        
              <b>Details:</b> <input id="details" type="textfield" v-model="details" placeholder ="Type details here..." class="border"><br/>
            <p  class="smallFont">The address of the wallet where you want to send the money to. You can type random text here (if you are not interested in recovering the funds)
              </p><br/>
        </form>
        <div>
              <v-btn
                class="ma-2"
                outlined
                raised
                primary
                color="indigo"
                @click="submitProposal()"
              >
                Submit Proposal
              </v-btn>
        </div>
       </v-container>
    </v-container>
</template>
<script>
import {Transaction} from '../blockchain_guild.js';
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
      amount: '',
      share:'',
      token: '', 
      details:'', 
      guild:{}
    }
  },
  methods: {
    closeMe(){
      this.$router.push('/');
    },
    submitProposal (){
      console.log("Submitting a new Proposal");
      console.log("CreateMember - Our keys to the castle: ", this.keys)

  //retrieve our public (walletPublicAddr) and  () key
      const walletKey = this.keys.walletKey;
      const walletPublicAddr = this.keys.walletPublicAddr;

      const proposalObj = {
        proposer: this.keys.publicKey,
        sponsor: this.proposer,
        sharesRequested: this.amount,
        paymentToken: this.token,
        yesVotes: null,
        noVotes: null, 
        details: this.details
      }//end proposalObj

      // Add the new member to Guilds Membership list
    this.guild.proposals.push(proposalObj); 

    alert("Your Proposal has been added. Click on Submit Vote to see current proposals.")

    //  const newTx = new Transaction(walletPublicAddr,this.keys.publicKey, 100);
    //  console.log("our New transaction: ", newTx );

  //sign transaction with the private key
  //  newTx.signTransaction(walletKey); 
  //  console.log("Signed transaction: ", newTx.signature );

    //set the new transaction to the store
//    this.$store.commit ('setNewTx', newTx );
//    const tx = this.$store.getters.getNewTx;
//    console.log("CreateTransaction - Transaction in the store: ", tx );

//    this.$router.push('/pending');
    //this.$router.push({name: './pending', params: {foo: "test" }})

 
    }//end created
  },//end methods
  emits: [
    "update-members"
  ],
  created () {
      console.log("Begin CreateTransaction!");
      this.coin = this.$store.getters.getCoin;
      console.log("CreateTransaction - Coin in the store: ", this.coin.miningReward );

      this.keys = this.$store.getters.getKeys;

      this.guild = this.$store.getters.getGuild;
  
  }
}//export
</script>
<style scoped>
input[type="text"] {
    box-sizing: border-box;
    padding-left: 10px;
}
</style>
