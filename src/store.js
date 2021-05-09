import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinClass: {},
    currentChain: [],
    keys: {},
    currentBalance: 0,
    loanState: "From the Beginning...",
    newTx:{
      from: "the kid",
      to: "my girl",
      amount: "20"
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
    },
     setBalance (state, data ){
      console.log("Alass....Store mute - new Tx: ", data )
      state.currentBalance = data;
    },
     setLoanState (state, data ){
      console.log("Store LoanStae - new Tx: ", data )
      state.loanState = data;
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
    setBalance ({commit}, data) {
     alert("Store action - balance: ", data )
      commit('setBalance', data )
    },
    setLoanState ({commit}, data) {
     alert("Store action - loan state: ", data )
      commit('setLoanState', data )
    }
  },//end actions
  getters: {
    getCoin:  state => state.coinClass,
    getKeys: state => state.keys,
    getNewTx: state => state.newTx,
    getBalance: state => state.currentBalance,
    getLoanState: state => state.loanState
  }//end getters
})
