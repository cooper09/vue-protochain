<template>
  <div>
  <v-container class="animated fadeIn">
   <h3>Guild</h3>   
           <v-btn
               @click="showTransactions(block.hash)">
                  Become a Member
                </v-btn>
  </v-container>
  </div><!-- end main div -->
</template>

<script>
export default {
 name: "BlockItem",
 props: ["block"],
   methods: {
    showTransactions(hash) {
      this.$emit('show-transactions', hash );
      //which block was selected
      //console.log("Selected block hash: "+ hash );
      //this.$store.dispatch('setSelectedBlock', hash);
      this.$router.push({name:'List Transactions', params: {transaction: this.block}})
      //this.$router.push({name: './pending', params: {foo: "test" }})
  
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
  margin-right: 0.5em;
  border: 1px solid indigo;
}

</style>
