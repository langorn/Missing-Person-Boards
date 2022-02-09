const nearAPI = require("near-api-js");
const BN = require("bn.js");
const fs = require("fs").promises;
const assert = require("assert").strict;
const { connect } = nearAPI;

// creates a keyStore that searches for keys in .near-credentials
// requires credentials stored locally by using a NEAR-CLI command: `near login` 
// https://docs.near.org/docs/tools/near-cli#near-login

const { keyStores } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);


const config = {
  networkId: "testnet",
  keyStore: keyStore, // optional if not signing transactions
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

let account; 
async function initNear() {
    // connect to NEAR
    const near = await connect(config);
    // const account = await near.account("zhro2.testnet");
    account = await near.account("zhro2.testnet");
}

async function initTest() {
    const loadedContract = await fs.readFile('./out/main.wasm');
    const response = await account.deployContract(loadedContract);
    // console.log(response);
    // let newUser = await account.createAccount(
    //     "testing-account2.testnet", // new account name
    //     "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
    //     "10000000000000000000" // initial balance for new account in yoctoNEAR
    // );

    let contractInfo = new nearAPI.Contract(
        account, // the account object that is connecting
        "zhro2.testnet",
        {
          // name of contract you're connecting to
          viewMethods: ["getBulletinPosts", "getBulletinPost"], // view methods do not change state but usually return a value
          changeMethods: ["create"], // change methods modify state
          sender: account, // account object to initialize and sign transactions.
        }
      );

    return  { contractInfo }
}

async function test() {


    await initNear();
    const { contractInfo } = await initTest();
    // const response = await account.state();
    let response = await contractInfo.getBulletinPosts();
    console.log(response);
}

test();