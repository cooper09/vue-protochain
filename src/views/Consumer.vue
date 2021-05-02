<template>
  <div class="animated fadeIn">
          <span class="right"><v-btn                   outlined
                  raised
                  primary
                  color="indigo"  @click="closeMe()">Exit</v-btn></span>
    <h1>Consumer Page</h1>
    Your balance: {{balance}}
    <br/><br/>
    <v-tabs>
        <v-tab @click="showContent()">Video</v-tab>
        <v-tab>Audio</v-tab>
        <v-tab>NFT</v-tab>
    </v-tabs>
    <br/>
    <p>
      <b>Enjoy our contents.</b>
      <br/> 
      <code>Remember: </code> for each content you consume, the 
      <code>Content Provider</code> will be compensated with 
      <code>MyTok</code> tokens. 
    </p>
    <div class="videos">
      <ul class="videos__list">
        <li v-for="(video, index) in videos" :key="index" class="videos__item" @click="playGoodie()">
          <LazyYoutubeVideo
            :src="video.url"
            :preview-image-size="video.previewImageSize"
            :aspect-ratio="video.aspectRatio"
            :thumbnail-listeners="{ load: foo }"
          />
          <p>Video: {{video.title}}</p>
          <p>Content Address: {{video.address}}</p>
          <p>Identifier: {{video.hash}}</p>
        </li>
      </ul>
    </div>
    <br/><br/>
    <hr />
  </div>
</template>
<script>
import {Transaction} from '../blockchain_token.js';
import Pending from './Pending';
import LazyYoutubeVideo from "vue-lazy-youtube-video";
export default {
  components: {
    LazyYoutubeVideo
  },
   data() {
    return {
      videos: [
        {
          url: "https://www.youtube.com/embed/3KIW5zUemvk",
          previewImageSize: "maxresdefault", 
          title: "Privi Protocol",
          address: "0x00",
          hash: "0x00"
        }
      ],
      tx:{},
      coin: {},
      keys: {},
      from:'',
      to: '',
      amount: '',
      balance: 0
   };//end return
  },//end data
  methods: {
    showContent(){
      console.log("Show content...")
    },
    playGoodie() {
      console.log("Consumer.playGoodie: ", this.coin);
      console.log("Consumer.playGoodies - keys: ", this.keys)
      /* 
        1) create transaction between the current wallet the provider wallet. 
        2) send transactoin to Pending for normal "procedure"...
      */
          //retrieve our public (walletPublicAddr) and  () key
      const walletKey = this.keys.walletKey;
      const walletPublicAddr = this.keys.walletPublicAddr;

    const timeDuration = 288  //in seconds
    let approxCost = timeDuration / 10;
      const newTx = new Transaction(walletPublicAddr,this.keys.publicKey, approxCost);
      console.log("our New transaction: ", newTx );

    //sign transaction with the private key
      newTx.signTransaction(walletKey); 
      console.log("Consumer - Signed transaction: ", newTx.signature );

      console.log("Time to go to work: ", newTx )
        // see if I can send an event up the chain....
        //this,$emit('begin-minin', this.tx )
          
      this.coin.addTransaction(newTx);

          //mine up the new transaction in its own block
    console.log("\n Starting up the 7 dwarfs...");

    this.coin.minePendingTransactions(this.keys);

    console.log('\n Wallet Balance: ', this.coin.getBalanceOfAddress(this.keys));
    this.balance = this.coin.getBalanceOfAddress(this.keys);
    },
    foo() {
      console.log("Video has loaded...");
    },
    closeMe(){
      this.$router.push('/');
    }
  },//end methods
    created () {
      console.log("Consumer - Begin CreateTransaction!");
      this.coin = this.$store.getters.getCoin;
      console.log("Consumer - Coin in the store: ", this.coin.miningReward );

      this.keys = this.$store.getters.getKeys;
  
  }//end playGoodie
}//export
</script>
<style scoped>

  .closeBtn {
    float: right;
  }
</style>
