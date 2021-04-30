<template>
  <div>
  <v-container class="animated fadeIn">
    <v-card class="pa-1 margins" max-width="300" min-height="400">
      <v-responsive class="pt-4"> 
      <center><img src="../logo.png" width="35"/></center> 
      </v-responsive>
        <h3 class="myIndigo">Block</h3>   {{block.index}} 
         <v-card-text>
                <div class="subheading wrap">
                <p class="text-wrap" >
                   <b>Hash:</b> {{block.hash}}
                </p>
                </div>
                <div text-wrap><b>Previous Hash:</b> {{block.previousHash}}</div>
                <div><b>Data:</b> {{block.data }}</div>
                <div><b>Timestamp:</b> {{block.timestamp}}</div>
            </v-card-text>
              <v-card-actions>
                <span class="right"><v-btn
               outlined
                raised
                primary
                color="indigo"
                  @click="showTransactions(block.hash)"
                >
                  Show Transactions
                </v-btn></span>
                        <div>
        </div>
        </v-card-actions>
    </v-card>
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
      this.$router.push({name:'List Transactions', params: {foo: this.block}})
  
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
