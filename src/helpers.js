
import Web3 from 'web3';
const sha256 = require('crypto-js/sha256');

import {Transaction} from './blockchain_guild.js';

//slideshow.js
export const doSomething = (n)=>{
    return(" I hear and I obey!!");
}

export const createId = (data)=> {


  const timestamp = new Date().getTime();
  const abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
    let token=""; 
    for(let i=0;i<32;i++){
         token += abc[Math.floor(Math.random()*abc.length)];
    }
  return sha256(token + timestamp + JSON.stringify(data)).toString();
}//end createId


export const getKeys= () => {

    //Creat a wallet to "sign" any transaction
    console.log("Key me up...")
    const EC = require('elliptic').ec;
    const ec = new EC('secp256k1');

    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
  
    console.log("Our private key: ", privateKey )
    const walletKey = ec.keyFromPrivate(privateKey)
    const walletPublicAddr = walletKey.getPublic('hex');

  const  keysObj = {
      publicKey: publicKey,
      privateKey: privateKey, 
      walletPublicAddr: walletPublicAddr,
      walletKey: walletKey
    }
    return keysObj;
  }//end getKeys

  export const createTransaction = (data, keys) => {
    console.log("CreateTransacton for: ", data , " keys: ", keys );

    const newTx = new Transaction(keys, keys.publicKey, 100);
    console.log("our New transaction: ", newTx );

      //sign transaction with the private key
      newTx.signTransaction(keys, keys.publicKey); 
      console.log("Signed transaction: ", newTx.signature );
  
      //set the new transaction to the store
      this.$store.commit ('setNewTx', newTx );
      const tx = this.$store.getters.getNewTx;
      console.log("CreateTransaction - Transaction in the store: ", tx );
    return tx;
 }//end createTransaction
