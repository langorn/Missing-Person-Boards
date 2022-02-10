// creates a keyStore that searches for keys in .near-credentials
// requires credentials stored locally by using a NEAR-CLI command: `near login` 
// https://docs.near.org/docs/tools/near-cli#near-login

const HELP = `Please run this script in the following format:
    node testnet-testing.js MASTER_ACC.testnet CONTRACT_NAME TESTER_ACC
ex: node testnet-testing.js zhro1929.testnet missing-person-board1 aki2000
`;
const nearAPI = require("near-api-js");
const BN = require("bn.js");
const fs = require("fs").promises;
const assert = require("assert").strict;
const { connect, KeyPair, keyStores, utils } = nearAPI;


// verify if you type the correct command
if (process.argv.length !== 5) {
  console.info(HELP);
  process.exit(1);
}

MASTER_ACC = process.argv[2];
CONTRACT_NAME = process.argv[3];
TESTER_ACC = process.argv[4];

const config = {
  networkId: "testnet",
  // keyStore: keyStore, // optional if not signing transactions
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

const contractMethods = {
  viewMethods: ["getBulletinPosts", "getBulletinPost"],
  changeMethods: ["create"],
};

const contractSetting = {
   contractAccount: `${CONTRACT_NAME}.${MASTER_ACC}`,
   masterAccount: `${MASTER_ACC}`,
   keyPath: `../.near-credentials/testnet/${MASTER_ACC}.json`,
}

let keyPair;
let pubKey;
let masterAccount; 
let near
let keyStore;



async function initNear() {
    // connect to NEAR
    // const near = await connect(config);
    // const account = await near.account("zhro2.testnet");
    const keyFile = require(contractSetting.keyPath);
    masterKey = nearAPI.utils.KeyPair.fromString(
      keyFile.secret_key || keyFile.private_key
    );
    pubKey = masterKey.getPublicKey();
    keyStore = new nearAPI.keyStores.InMemoryKeyStore();
    keyStore.setKey(config.networkId, contractSetting.masterAccount, masterKey);
    near = await nearAPI.connect({
      deps: {
        keyStore,
      },
      networkId: config.networkId,
      nodeUrl: config.nodeUrl,
    });

    masterAccount = await near.account(`${MASTER_ACC}`);

    // generate a new public key for the contract
    // keyPair = KeyPair.fromRandom("ed25519");
    // pubKey = keyPair.publicKey.toString();
    // await keyStore.setKey(config.networkId, contractSetting.contractAccount, keyPair);

    console.log("Finish init NEAR");
}

async function createContractUser(
  accountPrefix,
  contractAccountId,
  contractMethods
) {
  // generate a new public key for new user
  keyPair = KeyPair.fromRandom("ed25519");
  pubKey = keyPair.publicKey.toString();

  let accountId = accountPrefix + "." + contractSetting.masterAccount;
  await masterAccount.createAccount(
    accountId,
    pubKey,
    new BN(10).pow(new BN(25))
  );
  keyStore.setKey(config.networkId, accountId, keyPair);
  const account = await new nearAPI.Account(near.connection, accountId);
  const accountUseContract = await new nearAPI.Contract(
    account,
    contractAccountId,
    contractMethods
  );
  return accountUseContract;
}


async function initTest() {
    // deploy a contract 
    const contract = await fs.readFile('./out/main.wasm');
    const _contractAccount = await masterAccount.createAndDeployContract(
      contractSetting.contractAccount,
      pubKey,
      contract,
      new BN(10).pow(new BN(25))
    ); 

    // create a contract user
    const akiUseContract = await createContractUser(
      `${TESTER_ACC}`,
      contractSetting.contractAccount,
      contractMethods
    );
    return  { akiUseContract }
}

async function test() {


    await initNear();
    const { akiUseContract } = await initTest();
    let akiContract = await akiUseContract.create({
      args: {
          imgUrl: "aki.img",
          location: "Singapore",
          description: "my cat is missing",
          contact: "01429231881"
      }
      });
     console.log(akiContract);
  
    // 1a test - getBulletinPost
    let akiMessage = await akiUseContract.getBulletinPost({id: akiContract.id})
    assert.deepEqual(akiMessage, akiContract);
    console.log('test 1a - After test for get single post');
    // const response = await account.state();
    // let response = await contractInfo.getBulletinPosts();
    // console.log(response);
}

test();