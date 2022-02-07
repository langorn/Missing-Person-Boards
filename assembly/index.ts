// The entry file of your WebAssembly module.
// @nearBindgen
import {
    context, // visibility into account, contract and blockchain details
    logging, // append to the execution environment log (appears in JS Developer Console when using near-api-js)
    storage, // key-value store for the contract (used by PersistentMap, PersistentVector and PersistentDeque)
    PersistentMap, // data structure that wraps storage to appear like a Map
    PersistentVector, // data structure that wraps storage to appear like a Vector
    PersistentDeque, // data structure that wraps storage to appear like a Deque
    PersistentUnorderedMap,
    PersistentSet, // data structure that wraps storage to appear like a Set
    ContractPromise, // make asynchronous calls to other contracts and receive callbacks
    base58, // utility base58 encoder
    base64, // utility base64 encoder / decoder
    math, // utility math functions for hashing using SHA and Keccak as well as pseudo-random data
    util, // utility type conversion and read_register
  } from "near-sdk-as";
import { BulletinPost } from "./model";

  // let bulletinBoard = new PersistentVector<BulletinPost>("bulletinBoard");
  
  export function create(sender: string, 
      imgUrl: string,
      location: string,
      description: string,
      contact: string
      ): BulletinPost {
        const bulletinPost = BulletinPost.buyCredit(sender, imgUrl, location, description, contact);
        return bulletinPost;
      }
  
   
  export function getBulletinPosts(): PersistentUnorderedMap<i32, BulletinPost>  {
      let boards = BulletinPost.getBulletins();
       return boards;
  }
  
  export function getBulletinPost(id: i32): BulletinPost  {
      let bulletin = BulletinPost.getBulletin(id);
      return bulletin;
  }
