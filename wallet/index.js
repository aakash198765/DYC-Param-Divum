import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
const Wallet = require('ethereumjs-wallet');

const createWallet = () => {

    const state=true;
    
const EthWallet = Wallet.default.generate();

const paramId = EthWallet.getAddressString();
const privateKey = EthWallet.getPrivateKeyString();
const publicKey = EthWallet.getPublicKeyString();
const storeData = async () => {
  try {
    await AsyncStorage.setItem('paramId', paramId)
    await AsyncStorage.setItem('privateKey', privateKey)
    await AsyncStorage.setItem('publicKey', publicKey)
   

  } catch (e) {
    // saving error
  }
  
    console.log('work');
}

storeData();




}

export default createWallet;