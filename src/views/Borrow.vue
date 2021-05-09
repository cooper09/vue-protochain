<template>
  <div>
      <v-container   class="animated fadeIn container">

              <span class="right"><v-btn
                  outlined
                  raised
                  primary
                  color="indigo"  @click="closeMe()">Exit</v-btn></span>
        <h3 class="myIndigo">Convert your collateral to pUSD </h3>
                <form>
                  <br/><br/>
                    <b>From Address:</b>  <input id="from" type="text" v-model="from" :placeholder="keys.publicKey" class="border" readonly="readonly"><br/>
                    <p  class="smallFont">This is your wallet address. This us where your funds will be sent.</p>
                    <br/>
                    <b>Loan Amount (pUSD):</b> <input id="loanAmt" type="text" v-model="loanAmt" placeholder ="amount in pUSD" class="border"><br/>
                    <p  class="smallFont">Amount of pUSD stablecoin you would like to receive.
        </p><br/>
                    <b>Fee Amount:</b> <input id="feeAmt" type="text" v-model="feeAmt" placeholder ="1" class="border" readonly="readonly"><br/>
                    <p  class="smallFont">Brokerage Fee</p><br/>

                    <b>Collateral Amount (Privi):</b> <input id="collateral" type="text" v-model="collateral" placeholder ="100" class="border" ><br/>
                    <p  class="smallFont">Collateral you are staking.</p><br/>
                    
                  
                </form>
                  <div>
              <v-btn
                class="ma-2"
                outlined
                raised
                primary
                color="indigo"
                @click="submitLoan()"
              >
                Process
              </v-btn>
        </div>
      </v-container>
  </div>
</template>

<script>
import {BasicLoan, Transaction} from '../blockchain_stablecoin.js';

export default {  
  components: {

  },//end components
  data() {
      return {
        from: '',
          to: '',
          loanAmt: null,
          feeAmt: 1,
          collateral: null,
          coin: {},
          keys: {},
          loanState:"",
          newLoan: {}
      }
  },//end data
  methods: {
    closeMe () {
      this.$router.push('/')
    },
    submitLoan () {
      console.log("Submit Loan....");

      const walletKeyS = this.keys.walletKey;
      //const walletPublicAddr = this.keys.walletPublicAddr;

      const loanObj = {
        loanAmt: this.loanAmt,
        feeAmt: this.feeAmt,
        collateral: this.collateral
      }
        this.newLoan = new BasicLoan (this.loanAmt,this.feeAmt, this.collateral, this.loanState);
        console.log("new loan object: ", this.newLoan)
        const bankKeys = this.newLoan.keys;
        console.log("Bank keys: ", bankKeys)
         if (this.newLoan.acceptLoan(loanObj)){
            const loanTx = new Transaction(bankKeys.bankPublicAddr,this.keys.publicKey, this.loanAmt);
            console.log("our New transaction: ", loanTx );

            /* mine our transaction
              1) add this transaction to queue
              2) then mine (should be some interval but this will be instaneous)
            */
            this.coin.minePendingTransactions(this.keys.publicKey);
            const finalBalance = this.coin.getBalanceOfAddress(this.keys);

            console.log("new balance: ", finalBalance)

         }//end iffy 
    }//end submitLoan

  },//end methods
  created()  {
      console.log("Begin Borrowing!");
      this.coin = this.$store.getters.getCoin;
      console.log("Borrow - Coin in the store: ", this.coin.miningReward );

      this.keys = this.$store.getters.getKeys;
      this.loanState = this.$store.getters.getLoanState;
  }//end created
};
</script>
