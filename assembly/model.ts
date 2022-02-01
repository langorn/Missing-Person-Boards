import { PersistentUnorderedMap,  math } from "near-sdk-as";


@nearBindgen
export const bulletinBoard = new PersistentUnorderedMap<u32, BulletinPost>("bulletinBoard");
// Export a new class
@nearBindgen
export class BulletinPost {
    postId: u32;
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
        let randomNum:u32 = u32(Math.random() * 1000000);
        this.postId =  math.hash32<u32>(randomNum);
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

      static getBulletins (): PersistentUnorderedMap<u32, BulletinPost> {
          return bulletinBoard;
      }
      
      static getBulletin (id: u32): BulletinPost {
          return bulletinBoard.getSome(id);
      }
    
}
