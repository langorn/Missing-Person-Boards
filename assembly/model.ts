import { PersistentUnorderedMap,  math } from "near-sdk-as";

export const bulletinBoard = new PersistentUnorderedMap<i32, BulletinPost>("bulletinBoardzx");

// Export a new class
@nearBindgen
export class BulletinPost {
    id: string;
    postId: i32;
    sender: string;
    // timeMs: i32;
    imgUrl: string;
    location: string;
    description: string;
    contact: string;
    //postLeft: i32;

    constructor(sender: string, imgUrl: string, location: string, description: string, contact: string) {
        //let dateData = Date.now();
        //let randomNum:f64 = Math.random() * 100000;
        this.postId = 778892; //math.hash32<i32>(randomNum);
        this.id = "zxmalslal2ll2l2";
        this.sender = sender;
        this.imgUrl = imgUrl;
        this.location = location;
        this.description = description;
        this.contact = contact;
        //this.postLeft = 100;
        // this.timeMs = new Date().toUTCString();

    }

       static buyCredit(
        sender: string, 
        imgUrl: string,
        location: string,
        description: string,
        contact: string
        ): BulletinPost {
            const bltPost = new BulletinPost(sender, imgUrl, location, description, contact);
            //bulletinBoard.set(bltPost.postId, bltPost);
            return bltPost;
      }

      static getBulletins (): PersistentUnorderedMap<i32, BulletinPost> {
          return bulletinBoard;
      }
      
      static getBulletin (id: i32): BulletinPost {
          return bulletinBoard.getSome(id);
      }
    
}
