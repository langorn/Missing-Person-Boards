// The entry file of your WebAssembly module.

import {
    context, // visibility into account, contract and blockchain details
    logging, // append to the execution environment log (appears in JS Developer Console when using near-api-js)
    storage, // key-value store for the contract (used by PersistentMap, PersistentVector and PersistentDeque)
    PersistentMap, // data structure that wraps storage to appear like a Map
    PersistentUnorderedMap,
  } from "near-sdk-as";

import { BulletinPost } from "./model";

  // create a new post at missing person board
  export function create(sender: string, 
      imgUrl: string,
      location: string,
      description: string,
      contact: string
      ): BulletinPost {
        const bulletinPost = BulletinPost.newBulletinPost(sender, imgUrl, location, description, contact);
        return bulletinPost;
      }
  
  // retrieve all missing person data as list
    export function getBulletinPosts():  BulletinPost[] {
      let boards = BulletinPost.getBulletins();
      let keyData = boards.values();
      return keyData;
  }
  
  // retrieve one of the missing person data
  export function getBulletinPost(id: string): BulletinPost  {
      let bulletin = BulletinPost.getBulletin(id);
      return bulletin;
  }
