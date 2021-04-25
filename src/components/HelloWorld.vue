<template>
  <v-container class="animated fadeIn ">

     <div v-for= "block in blocks" :key="block.hash">
              

              <v-layout row wrap >
                <v-flex  xs12 sm6 md4 lg3 :key="block.id" v-for="block in blocks" class="blocks">
                  <div class="col-sn">
                      <BlockItem v-bind:block="block"/><v-btn @click="showTxs(block.hash)">Transactions</v-btn>
                  </div>
                </v-flex>
            </v-layout>
    
         
    </div>
  </v-container>
</template>

<script>
import BlockItem from './BlockItem.vue';

export default {
  name: 'ListTransactions',
  components: {
    BlockItem
  },
  data: () => ({
    blocks: [
      {
        hash: "123",
        data: "block one"
      },
      { 
        hash: "456",
        data: "block two"
      },
      {
      hash: "789",
      data:"block three"
      }

    ],
    keys: {}
  }),
  coin: {},
  methods: {
    settingsPage() {
      this.$router.push('/settings')
    },
    createPage(){
      //this.$router.push({name: 'Create Transactions', params: {keys: this.keys }})
      this.$router.push('/create')
    },
    showTxs (block){
      console.log("Show transactions for: ", block);
      this.$router.push({name: 'List Transactions', params: {foo: block }})
    }
  },//end methods
    created () {
      console.log("Begin HelloWorld!");
      this.coin = this.$store.getters.getCoin;
      console.log("HelloWorld - Coin in the store: ", this.coin.miningReward );
      this.blocks = this.coin.chain;

      this.keys = this.$store.getters.getKeys;
      console.log("Our keys to the castle: ", this.keys)
    }
};//end export
</script>
<style scoped>

</style>
