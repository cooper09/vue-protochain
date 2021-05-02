<template>
  <v-container class="animated fadeIn ">
                <span class="right"><v-btn                   outlined
                  raised
                  primary
                  color="indigo"  @click="closeMe()">Exit</v-btn></span>
     <div >
              <v-layout row wrap >
                <v-flex  xs12 sm6 md4 lg3 :key="block.id" v-for="block in blocks" class="blocks">
                  <div class="col-sn">
  
                      <BlockItem v-bind:block="block" />
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
    },
    closeMe() {
      this.$router.push('/')
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
