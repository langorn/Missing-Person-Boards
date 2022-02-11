const nearAPI = require("near-api-js");
const BN = require("bn.js");
const fs = require("fs").promises;
const assert = require("assert").strict;
CONTRACT_NAME = "missing-person-board.test.near";

function getConfig(env) {
  switch (env) {
    case "sandbox":
    case "local":
      return {
        networkId: "sandbox",
        nodeUrl: "http://localhost:3030",
        masterAccount: "test.near",
        contractAccount: CONTRACT_NAME,
        keyPath: "/tmp/near-sandbox/validator_key.json",
      };
  }
}

const contractMethods = {
  viewMethods: ["getBulletinPosts", "getBulletinPost"],
  changeMethods: ["create"],
};
let config;
let masterAccount;
let masterKey;
let pubKey;
let keyStore;
let near;

async function initNear() {
  config = getConfig(process.env.NEAR_ENV || "sandbox");
  const keyFile = require(config.keyPath);
  masterKey = nearAPI.utils.KeyPair.fromString(
    keyFile.secret_key || keyFile.private_key
  );
  pubKey = masterKey.getPublicKey();
  keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  keyStore.setKey(config.networkId, config.masterAccount, masterKey);
  near = await nearAPI.connect({
    deps: {
      keyStore,
    },
    networkId: config.networkId,
    nodeUrl: config.nodeUrl,
  });
  masterAccount = new nearAPI.Account(near.connection, config.masterAccount);
  console.log("Finish init NEAR");
}

async function createContractUser(
  accountPrefix,
  contractAccountId,
  contractMethods
) {
  let accountId = accountPrefix + "." + config.masterAccount;
  await masterAccount.createAccount(
    accountId,
    pubKey,
    new BN(3).pow(new BN(25))
  );
  keyStore.setKey(config.networkId, accountId, masterKey);
  const account = await new nearAPI.Account(near.connection, accountId);
  const accountUseContract = await new nearAPI.Contract(
    account,
    contractAccountId,
    contractMethods
  );
  return accountUseContract;
}

async function initTest() {
  const contract = await fs.readFile("out/main.wasm");
  const _contractAccount = await masterAccount.createAndDeployContract(
    config.contractAccount,
    pubKey,
    contract,
    new BN(3).pow(new BN(25))
  ); 
  const akiUseContract = await createContractUser(
    "aki",
    config.contractAccount,
    contractMethods
  );

  const bobUseContract = await createContractUser(
    "bob",
    config.contractAccount,
    contractMethods
  );
  return { akiUseContract, bobUseContract };
}

async function test() {
  // 1. Creates testing accounts and deploys a contract
  await initNear();
  const { akiUseContract, bobUseContract  } = await initTest();

  // first test - create
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

  //  test - create
  let bobContract = await bobUseContract.create({
    args: {
        imgUrl: "bob.img",
        location: "Thailand",
        description: "my rabbit is missing",
        contact: "01429222551"
    }
    });
   console.log(bobContract);

  // 1b test - getBulletinPost
   let bobMessage = await bobUseContract.getBulletinPost({id: bobContract.id})
   assert.deepEqual(bobMessage, bobContract);
   console.log('test 1b - After test for get single post');


  // third test - getBulletinPosts
   let allPost = await akiUseContract.getBulletinPosts();
   console.log(allPost)
}

test();
