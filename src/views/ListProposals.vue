<template>
  <div class="animated fadeIn borderline">
        <v-btn class="btn right" 
          outlined
          raisedI can 
          primary
          color="indigo" 
          @click="closeMe()">Exit
        </v-btn>
    <h3  class="myIndigo">List of Proposals currently on the Block: </h3> <span><p class="wrap">goodie goes here</p></span>
       <div v-for="proposal in proposals" :key="proposal.name">
      <span class="transaction" > Proposal </span>
   <div class="tx">
        <p class="wrap"><b>Name: </b>{{proposal.name}}</p>
        <p class="wrap"><b>Proposal: </b>{{proposal.proposal}}</p>
      </div> 
    </div> 
  </div>
</template>
<script>
export default {
  name:'ListProposals',
  data () {
    return {
      coin: {},
      chain:{},
      block: '', 
      proposals:[],
      guild:{}
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

        this.block = this.$route.params.data;
        console.log("selected block: ", this.block );

        this.coin = this.$store.getters.getCoin;

        this.guild = this.$store.getters.getGuild;
        console.log("Current Proposals: ", this.guild.proposals )

        this.guild.proposals.map( (proposal) => {
          console.log("ListProposals.proposal: ", proposal )
          this.proposals.push(proposal)
        /*  if (block.hash === this.block.hash ) {
             this.transactions = block.transactions;
             return 
          } //end iffy  */
          //return ("Transaction not found")
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
