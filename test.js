const nearAPI = require("near-api-js");
const BN = require("bn.js");
const fs = require("fs").promises;
const assert = require("assert").strict;

function getConfig(env) {
  switch (env) {
    case "sandbox":
    case "local":
      return {
        networkId: "sandbox",
        nodeUrl: "http://localhost:3030",
        masterAccount: "test.near",
        contractAccount: "cguestbooks1928.test.near",
        keyPath: "/tmp/near-sandbox/validator_key.json",
      };
  }
}

const contractMethods = {
  viewMethods: ["getBulletinPosts", "getBulletinPost"],
  // viewMethods: ["getBulletinPost"],
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
//   console.log("Finish init NEAR");
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
    new BN(10).pow(new BN(25))
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
    new BN(10).pow(new BN(25))
  );
//   console.log(`pub key : ${pubKey}`)
  const aliceUseContract = await createContractUser(
    "alice",
    config.contractAccount,
    contractMethods
  );

  const bobUseContract = await createContractUser(
    "bob",
    config.contractAccount,
    contractMethods
  );
//   console.log("Finish deploy contracts and create test accounts");
  return { aliceUseContract, bobUseContract };
}

async function test() {
  // 1. Creates testing accounts and deploys a contract
  await initNear();
  const { aliceUseContract, bobUseContract  } = await initTest();

  // 2. Performs a `set_status` transaction signed by Alice and then calls `get_status` to confirm `set_status` worked
  //console.log('working now');

//   let args = {
//     sender: "meme1", 
//     imgUrl: "aaxx.img",
//     location: "singapore",
//     description: "my cat is missing",
//     contact: "01429231881",
//     postLeft: 100
//     }
  let aliceContract = await aliceUseContract.create({
    args: {
        sender: "meme1", 
        imgUrl: "aaxx.img",
        location: "singapore",
        description: "my cat is missing",
        contact: "01429231881",
        // postLeft: 100
    }
    });
   console.log(aliceContract);
   let alice_message = await aliceUseContract.getBulletinPost({id: aliceContract.id})
//  //   await aliceUseContract.set_status({ args: { message: "hello" } });
//   // let alice_message = await aliceUseContract.get_status({
//   //   account_id: "alice.test.near",
//   // });
   //assert.equal(alice_message, aliceContract);
   assert.deepStrictEqual(alice_message, aliceContract);
  // 3. Gets Bob's status and which should be `null` as Bob has not yet set status
//   let bob_message = await bobUseContract.get_status({
//     account_id: "bob.test.near",
//   });
//   assert.equal(bob_message, null);

//   // 4. Performs a `set_status` transaction signed by Bob and then calls `get_status` to show Bob's changed status and should not affect Alice's status
//   await bobUseContract.set_status({ args: { message: "world" } });
//   bob_message = await bobUseContract.get_status({
//     account_id: "bob.test.near",
//   });
//   assert.equal(bob_message, "world");
//   alice_message = await aliceUseContract.get_status({
//     account_id: "alice.test.near",
//   });
//   assert.equal(alice_message, "hello");
}

test();
