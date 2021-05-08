<template>
    <v-container   class="animated fadeIn container">
      <span class="right"><v-btn                   outlined
                  raised
                  primary
                  color="indigo"  @click="closeMe()">Exit</v-btn></span>
   <h3 class="myIndigo">Create Member</h3>
  <p>Stake your share and join the fun!</p>
    <v-container>
        <form  @submit="submitMember()">
          <br/><br/>
            <b>From Address:</b>  <input id="from" type="text" v-model="from" :placeholder="keys.publicKey" class="border" readonly="readonly"><br/>
            <p  class="smallFont">This is your wallet address. This will be your "Delegate" key identifyting you as a member of the Guild.</p>
            <br/>
            <b>Name:</b> <input id="guildName" type="text" v-model="name" placeholder ="Guild Name" class="border"><br/>
            <p  class="smallFont"> Your Guild Name
</p><br/>
            <b>Type of Share:</b> <input id="token" type="text" v-model="token" placeholder ="PRIVI" class="border"><br/>
            <p  class="smallFont"> The Token you are staking)
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
                @click="createMember()"
              >
                Sign Up Now
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
      token: '',
      amount: '',
      guild: {},
      name
    }
  },
  methods: {
    closeMe(){
      this.$router.push('/');
    },
    createMember (){
      console.log("Create a new Member");
      console.log("CreateMember - Our keys to the castle: "+ this.keys)

  //retrieve our public (walletPublicAddr) and  () key
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

       this.coin.addTransaction(newTx);

    //mine up the new transaction in its own block
    console.log("\n Starting up the 7 dwarfs...");

    const memberObj = {
      title: "New Member",
      name: this.name,
      delegateKey: walletKey,
      shares: 100,
      exists: true
    }//end memberObj


   // const walletPublicAddr = this.keys; 
    this.coin.minePendingTransactions(walletPublicAddr, memberObj);
                
  console.log('\n Wallet Balance: ', this.coin.getBalanceOfAddress(this.keys));

  console.log("Final Chain: ", this.coin.chain )

// Add the new member to Guilds Membership list
this.guild.members.push(memberObj);

console.log("Current Guild members: ",  this.guild.members )
  alert("Congratulations and Welcome to the Guild...")
    }//end createMember
  },//end methods
  emits: [
    "update-members"
  ],
  created () {
      console.log("Begin CreateTransaction!");
      this.coin = this.$store.getters.getCoin;
      console.log("CreateTransaction - Coin in the store: ", this.coin.miningReward );

      this.keys = this.$store.getters.getKeys;
      console.log("CreateMember - Keys: ", this.keys)

      console.log("CreateMember - params: ", this.$route.params.keys );

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
