<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="btn"><img src="./logo.png" width="40"></span>
        <span class="font-weight-light">Proto-Chain</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://priviprotocol.io/"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>
    <v-content   class="animated fadeIn">

    <h2 class="myIndigo">Proto-Moloch</h2>
      You can upload content (video, audio, nft ) or you can enjoy content...help yourself.
    <p></p>
    <p class="wrap m">
        <span class="myIndigo"><b>Wallet (Public) Address:</b></span> {{keys.publicKey}}
    </p>
      <router-view></router-view>
        <span><v-btn class="btn right" outlined raised primary color="indigo"  @click="consumerPage()">Enjoy</v-btn></span>
        <span><v-btn class="btn right" outlined raised primary color="indigo" @click="providerPage()">Upload</v-btn></span>
        <span><v-btn class="btn" outlined raised primary color="indigo" @click="showBlockChain()">Admin</v-btn></span>
    </v-content>
    <v-content transition="slide-x-transition">
      <Guild />
    </v-content>

  </v-app>
</template>

<script>
import Web3 from 'web3';
import Consumer from './views/Consumer';
import Provider from './views/Provider';
import HelloWorld from './components/HelloWorld';
import Guild from './components/Guild';
import {Blockchain} from './blockchain_guild.js';
import {getKeys,getWallet} from './helpers';

export default {
  name: 'App',
  components: {
    Consumer,
    Provider,
    HelloWorld,
    Guild
  },
  data: () => ({
    //
    keys:{},
    wallet:{}
  }),
  methods: {
    appMethod (){
      console.log('appMethod at our service...')
    },
  consumerPage() {
    console.log("settings page")
      this.$router.push('/consumer')
    },
  providerPage(){
      //this.$router.push({name: 'Create Transactions', params: {keys: this.keys }})
      this.$router.push('/provider')
    },
  showBlockChain () {
    this.$router.push('/blockchain')
  },
  async loadWeb3 () {
    console.log("loadWeb3");
    if (window.ethereum) {
      console.log("loadWeb3: ethereum window: ", window.ethereum);
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    } else if (window.web3) {
      console.log("loadWeb3: web3 window: ", window.web3);
      window.web3 = new  Web3(window.web3.currentProvider)
    }//end iffy
    else {
      window.alert('Non-Ethereum browser detected! Please connect to MetaMask')
    }//end iffy else
  }//end loadWeb3
},//end methods

  async created () {
    console.log(' AppVue - Create new test class')

  // create blockchain class
    const coin = new Blockchain ();
    this.$store.commit('setCoin', coin)
    const newCoin = this.$store.getters.getCoin;
    console.log("Block Coin in the store: ", newCoin.miningReward )

    //get and store private and public keys
    this.keys = getKeys();
    console.log("App - Our Keys: ", this.keys);
    this.$store.commit('setKeys', this.keys);

  await this.loadWeb3();
    
    //this.wallet =  getWallet();
    //console.log("App create wallet: ",  this.wallet );
    
  }//end created

};//end exports
</script>
<style>
body {
  padding: 2em;
}
.right {
  float: right;
}
.container {
     border: 1px solid indigo; 
      padding: 1em;
    }
.wrap {
    white-space: nowrap ;
    word-break: normal;
    overflow: hidden ;
    text-overflow: ellipsis;
  }
.blocks {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 1rem;
}
 .btn {
  margin: 1em;
  cursor: pointer;
 }
 .borderline {
  border: solid 1px indigo;
  padding: 1em;
}
.myIndigo {
  color: indigo;
}
input[type="text"] {
    box-sizing: border-box;
    padding-left: 10px;
}
</style>
