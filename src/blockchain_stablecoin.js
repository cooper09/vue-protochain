/* Wallet/Signed Transactions Blockchain
    creates blockchain with simple proof-of-work, transactions queues and signed transactions
*/
const { toExponential } = require('core-js/fn/number/epsilon');
const sha256 = require('crypto-js/sha256');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Token {
    constructor () {
        this.name = "Privi Stablecoin";
        this.symbol = "pUSD";
        this.totalSubpply = 10000000000000000000;
    }//end constructor

    transfer() {
        console.log("Transfer tokens...")
    }
    approval(){
        console.log('transfer approval');
    }
    transferFrom() {
        console.log("Transfer From")
    }

}//end token


class BasicLoan {
    constructor(loanAmt,feeAmt, collateralAmt, state) {
        this.loanAmt = loanAmt,
        this.feeAmt = feeAmt, 
        this.collateralAmt = collateralAmt, 
        this.state = state,
        this.keys = this.getKeys()

        console.log("BasicLoan created: ", this.state)
    }

    fundLoan(walletAddress) {
        console.log("Here's you money! Pleasure doing business with you...");
        let pUSD = new Token();
        console.log("Create pSD token: ", pUSD)
    }

    acceptLoan(data) {
        console.log("BasicLoan.acceptLoan: ", data )
        //cooper s - Here's where we check if the collateral can cover the loand
        // for now we just say that it does and move on....
        return true
    }

    repayLoan(){

    }

    liquidateLoan (){

    }
    getKeys () {
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');

        console.log("Our private key: ", privateKey )
        const walletKey = ec.keyFromPrivate(privateKey)
        const walletPublicAddr = walletKey.getPublic('hex');
    
      const  keysObj = {
          publicKey: publicKey,
          privateKey: privateKey, 
          bankPublicAddr: walletPublicAddr,
          bankKeys: walletKey
        }
        return keysObj;
    }
 }//end BasicLoan

class Transaction {
    constructor (fromAddress, toAddress, amount ){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }//end constructor
  
    calculateHash() {
        return sha256(this.fromAddress + this.toAddress + this.amount).toString();
    }//end calculateHash

    signTransaction(keySignature ){
        console.log("signTransaction: ", keySignature.getPublic('hex') )
        //check public key to make sure we have the right wallet
    
        // cooper s - this is supposed to work but doesn't - why?
     if(keySignature.getPublic('hex') !== this.fromAddress ) {
            throw new Error("This wallet cannot sign this transaction. Sorry!")
        }//end if
       
        const hashTx = this.calculateHash();
        const signature = keySignature.sign(hashTx, 'base64');
        this.signature = signature.toDER('hex');

    }//end signTransaction

    isValid() {
        console.log("Transaction.isValid: ", this );
        if ( this.fromAddress === null)  return true;

        if (!this.signature || this.signature.length === 0 ) {
            throw new Error ('This Transaction has not been signed')
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');

        return publicKey.verify(this.calculateHash(), this.signature );

    }//end isValid

 }//end Transaction
  
 class Block {
    constructor (timestamp, transactions, previousHash ='') {
        //this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.createHash();
        //add nonce for mining
        this.nonce = 0;
    }
    //getPreviousHash
  
    //getNewHash
    createHash() {
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
        //return CryptoJS.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce ).toString()
    }//end createHash
  
    //Set up Proof of Work
    mineBlock(difficulty ) {
        console.log("Whistle while you work!");
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.createHash();
        }//end while
        console.log("New Block has been mined: ", this.hash );
    }//end mineBlock
  
    hasValidTransactions () {
        for ( const tx of this.transactions ) {
            if  (!tx.isValid()) {
                return false;
            } 
        }//end for loop
        return true;
    }//end hasValidTransactions

 }//end Block
  
class Blockchain {
    constructor () {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 0;
        this.pendingTransactions = [];
        this.miningReward = 100;
        this.walletAddress = 0;
    }
    //create genesis block
    createGenesisBlock () {
        const time = new Date().getTime();
        return new Block( time ,'Genesis Block' , '0' );
    }
    //get last block
    getLatestBlock() {
        //console.log("getLatestBlock: ", this.chain[this.chain.length-1] );
        return this.chain[this.chain.length - 1];
    }
    // create new block
  
    //Instead of mining block by block, queue them up as transactions and go from there...
    minePendingTransactions (miningRewardAddress) {
        
        //newBlock.previousHash = this.getLatestBlock().hash;
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);
  
        console.log("Transaction block successfully mined.");
        this.chain.push(block);
  
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress,this.miningReward )
        ]
    }//end minePendingTransactions
  
    addTransaction(transaction) {
        console.log("Adding transaction to the chain: ", transaction )
        if (!transaction.fromAddress || !transaction.toAddress ) {
            throw new Error('Transaction must include to and from address')
        }//end if

        if (!transaction.isValid() ) {
            throw new Error('Transaction is invalid. Cannot be added to blockchain')
        } //end if  

        this.pendingTransactions.push(transaction);
    }//end createTransaction
  
    getBalanceOfAddress (address) {

        let balance;
        for (const block of this.chain ) {
            for (const trans of block.transactions) {
               // console.log("getBalanceOfAddress toAddress: ", trans.fromAddress)
               // console.log("getBalanceOfAddress fromAddress: ", trans.toAddress)
                if (trans.fromAddress === address) {
                    console.log("sending funds remove", trans.amount, " from wallet");
                    balance -= trans.amount;
                }//end if
               
                if (trans.toAddress === address) {
                    console.log("receiving funds add ", trans.amount, " to wallet");
                    balance += trans.amount;
                }//end if
            }//end for
        }//end for
        console.log()
        console.log("getBalanceOfAddress balance: ", balance )
        return balance;
    }//end getBalanceOf
  
    // validate block
    validate() {
        for (let i=1 ; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
           
            //console.log("validate = currentBlock: ", this.chain[i] );
            if ( currentBlock.hash !== currentBlock.createHash()) {
                return false;
            }//end iffy
  
            if (currentBlock.previousHash !== previousBlock.hash ) {
                return false;
            }
  
        }//end for
  
        // if we reach here, the chain is valid
        return true;
    }//end validate

    //Retrieve our blockchain whole
    getBlockChain () {
        //console.log("Blockcahin.getBlockChain: ", this);

        const EC = require('elliptic').ec;
        const ec = new EC('secp256k1');
            
        const walletKey = ec.keyFromPrivate('78c8c039744d8d863b4be8935c0d30aebc4c8c0932246eff4a901e6acf2b17fa');
        const walletAddress = walletKey.getPublic('hex');

        this.walletAddress = walletAddress;

        const timestamp =  new Date().getTime();

        const tx1 = new Transaction(walletKey, walletAddress, 10 )
        tx1.signTransaction(walletKey);
        this.addTransaction(tx1);
                
        console.log("\n Starting up the 7 dwarfs...");
        this.minePendingTransactions(walletAddress);
                
        console.log('\n Wallet Balance: ', this.getBalanceOfAddress(walletAddress));

        console.log("\n Starting up the 7 dwarfs...");
        this.minePendingTransactions(walletAddress);
                
        console.log('\n Wallet Balance: ', this.getBalanceOfAddress(walletAddress)); 
        
        return this;
    }//end getBlockChain
            
 }//end Blockchain
  
 module.exports.Blockchain = Blockchain;
 module.exports.Transaction = Transaction;
 module.exports.BasicLoan = BasicLoan;
 