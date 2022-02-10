import { PersistentUnorderedMap,  math, base64, context } from "near-sdk-as";
import { seed2 } from "./bar"

// a missing person board 
export const bulletinBoard = new PersistentUnorderedMap<string, BulletinPost>("bulletinBoard");

// generate a unique id for search purpose
function generateRandomDna(): string {
    let buf = math.randomBuffer(20);
    let b64 = base64.encode(buf);
    return b64;
}

// Export a new class
@nearBindgen
export class BulletinPost {
    id: string;
    sender: string;
    imgUrl: string;
    location: string;
    description: string;
    contact: string;

    constructor(imgUrl: string, location: string, description: string, contact: string) {
        this.id = generateRandomDna();
        this.sender = context.sender;
        this.imgUrl = imgUrl;
        this.location = location;
        this.description = description;
        this.contact = contact;
    }

     // create a new post in the board
     static newBulletinPost(
            imgUrl: string,
            location: string,
            description: string,
            contact: string
      ): BulletinPost {
            const bltPost = new BulletinPost(imgUrl, location, description, contact);
            bulletinBoard.set(bltPost.id, bltPost);
            return bltPost;
      }

      // list all board 
      static getBulletins (): PersistentUnorderedMap<string, BulletinPost> {
          return bulletinBoard;
      }    

      // get one of the board data
      static getBulletin (id: string): BulletinPost {
          return bulletinBoard.getSome(id);
      }
    
}
