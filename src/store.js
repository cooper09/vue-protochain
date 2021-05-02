import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinClass: {},
    currentChain: [],
    keys: {},
    newTx:{
      from: "the kid",
      to: "my girl",
      amount: "20"
    },
    nft:{
      id: "987654321",
      title: "Dead men tell no tales",
      location: "youube link",
      provider: "me",
      type: "video"
    }
  },//end state
  mutations: {
    setCoin (state, data ){
      state.coinClass = data;
    },
    setKeys (state, data ){
      state.keys = data;
    },
    setNewTx (state, data ){
      console.log("Alass....Store mute - new Tx: ", data )
      state.newTx = data;
//      alert("newTx has been updated: ")
    },
    setNft(state, data) {
      console.log("Set  - new NFT: ", data )
      state.nft = data; 
    }
    
  },//end mutations
  actions: {
    setCoin ({commit}, data) {
      commit('setCoin', data )
    },
    setKeys ({commit}, data) {
      commit('setKeys', data )
    },
    setNewTx  ({commit}, data) {
      console.log("Store action - new Tx: ", data )
      commit('setnewTx', data )
    },
    setNft ({commit}, data) {
      commit('setNft', data )
    }
  },//end actions
  getters: {
    getCoin:  state => state.coinClass,
    getKeys: state => state.keys,
    getNewTx: state => state.newTx,
    getNft: state => state.nft,
  }//end getters
})
