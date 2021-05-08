<template>
  <div class="animated fadeIn borderline">
        <v-btn class="btn right" 
          outlined
          raisedI can 
          primary
          color="indigo" 
          @click="closeMe()">Exit
        </v-btn>
    <h3  class="myIndigo">List of Proposals currently on the Block: </h3>
    <br/>
       <div v-for="proposal in proposals" :key="proposal.name">
      <span class="transaction" > Proposal</span>
      
   <div class="tx">
        <p class="wrap"><b>Name: </b>{{proposal.proposer}}</p>
        <p class="wrap"><b>Proposal: </b>{{proposal.details}}</p>
        <span><form>
          <input type="radio" name="choice" value="yes"> Yes
          <input type="radio" name="choice" value="no"> No
        </form></span>Submit when ready...
        <span><v-btn class="btn right" 
          outlined
          raisedI can 
          primary
          color="indigo" 
          @click="submitVote(proposal)">Submit
        </v-btn></span>
      </div> 
    </div> 
  </div>
</template>
<script>
import {createTransaction} from '../helpers';
export default {
  name:'ListProposals',
  data () {
    return {
      coin: {},
      chain:{},
      block: '', 
      proposals:[],
      guild:{},
      keys: {}
    }
  },
  methods: {
    closeMe(){
      this.$router.push('/');
    },
    submitVote(proposal, keys) {
      alert("Your vote has been submitted: "+  proposal.details )
      const stinky = createTransaction(proposal, this.keys);
      console.log("Return from createTransaction: ", stinky )
;    }
  },//end methods
  created() {
    //First get the coin class..

      console.log("this route params: ", this.$route.params.foo );

        this.block = this.$route.params.data;
        console.log("selected block: ", this.block );

        this.coin = this.$store.getters.getCoin;

        this.guild = this.$store.getters.getGuild;
        console.log("Current Proposals: ", this.guild.proposals )

        this.guild.proposals.map( (proposal) => {
          console.log("ListProposals.proposal: ", proposal )
          this.proposals.push(proposal)
          //return ("Transaction not found")
        }) 

        const keys = this.$store.getters.getKeys;
  }//end created
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
