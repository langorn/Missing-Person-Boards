import { PersistentUnorderedMap,PersistentMap,  math, Value } from "near-sdk-as";



export const bulletinBoard = new PersistentUnorderedMap<u64, BulletinPost>("bulletinBoard");
// Export a new class
@nearBindgen
export class BulletinPost {
    postId: u64;
    sender: string;
    // timeMs: i32;
    imgUrl: string;
    location: string;
    description: string;
    contact: string;
    postLeft: u32;

    constructor(sender: string, imgUrl: string, location: string, description: string, contact: string) {
        let dateData = Date.now();
        // let timestamp = dateData.getUTCMilliseconds;
        this.postId =  math.hash32<u64>(dateData);
        this.sender = sender;
        this.imgUrl = imgUrl;
        this.location = location;
        this.description = description;
        this.contact = contact;
        this.postLeft = 100;
        // this.timeMs = new Date().toUTCString();

    }

    static buyCredit(
        sender: string, 
        imgUrl: string,
        location: string,
        description: string,
        contact: string,
        postLeft: u32
        ): BulletinPost {
            let bltPost = new BulletinPost(sender, imgUrl, location, description, contact);
            bulletinBoard.set(bltPost.postId, bltPost);
            return bltPost;
      }

      static getBulletins (): PersistentUnorderedMap<u64, BulletinPost> {
          return bulletinBoard;
      }
      
      static getBulletin (id: u64): BulletinPost {
          return bulletinBoard.getSome(id);
      }
    
}