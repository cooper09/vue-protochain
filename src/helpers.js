
//slideshow.js
export const doSomething = (n)=>{
    return(" I hear and I obey!!");
}

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