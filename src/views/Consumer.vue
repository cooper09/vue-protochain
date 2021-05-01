<template>
  <div class="animated fadeIn">
    <v-btn class="closeBtn" @click="closeMe">X</v-btn>
    <h1>Consumer Page</h1>
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
        <li v-for="(video, index) in videos" :key="index" class="videos__item" @click="playGoodie">
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
        },
   
      ]
    };
  },//end data
  methods: {
    showContent(){
      console.log("Show content...")
    },
    playGoodie() {
      alert("Play goodie: " );
    },
    foo() {
      console.log("Video has loaded...");
    },
    closeMe(){
      this.$router.push('/');
    }
  }//end methods
}//export
</script>
<style scoped>

  .closeBtn {
    float: right;
  }
</style>
