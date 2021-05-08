<template>
  <div>
  <v-container class="animated fadeIn">
   <h3>Guild</h3>   
           <v-btn
                  outlined
                  raised
                  primary
                  color="indigo"
                  margins
               @click="becomeMember()">
                  Become a Member
              </v-btn><br/>
             <v-btn                   
                outlined
                raised
                primary
                margins
                color="indigo"  @click="submitProposal()">Submit Proposal</v-btn>
                  <br/>
                <v-btn                   
                  outlined
                  raised
                  primary
                  margins
                  color="indigo"  @click="submitVote()">Submit Vote
                </v-btn>
  </v-container>
  </div><!-- end main div -->
</template>

<script>
export default {
 name: "BlockItem",
 props: ["block"],
   methods: {
    becomeMember() {
      //alert("Uncle Sam wants You!!!")
      //this.$emit('show-transactions', hash );
     
    //  this.$router.push({name:'Add Member', params: {data, "test"}})
      this.$router.push({name: 'List Proposals', params: {data: "test" }})
    //this.$router.push('/addmember')
  
    }, //end beomeMember
    submitProposal() {
      alert("Submit Proposal")
      this.$router.push('/submitproposal')
    },
    submitVote() {
    //  alert("Submit your Vote")
      this.$router.push('/listproposals')
    }

  },//end methods
}//end export 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right {
  float:right;
}
.margins {
  margin: 0.5em;

}

</style>
