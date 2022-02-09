import { PersistentUnorderedMap,  math, base64 } from "near-sdk-as";
import { seed2 } from "./bar"


export const bulletinBoard = new PersistentUnorderedMap<string, BulletinPost>("bulletinBoard");



       export function generateRandomDna(): string {
           let buf = math.randomBuffer(20);
           let b64 = base64.encode(buf);
           return b64;
       }

// Export a new class
@nearBindgen
export class BulletinPost {
    id: string;
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
        //let randomName = nanoid(13);
        //console.log(randomName)
        this.id = generateRandomDna(); //sender; //math.randomBuffer(14); // nanoid(6); //seed2(); //77210 ;//math.hash32<f64>(randomNum);
        //this.id = generateRandomDna(); //"993191"; //math.randomBuffer(14); //nanoid(7);
        this.sender = sender;
        this.imgUrl = imgUrl;
        this.location = location;
        this.description = description;
        this.contact = contact;
        //this.postLeft = 100;
        // this.timeMs = new Date().toUTCString();
        
    }


static nanoid(length: number = 21): string {
  let id = ''
  for (let i = 0; i < length; i++) {
    id += urlAlphabet[i32(Math.floor(Math.random() * 64))]
  }
  logger.info(id);
  return id
}

       static buyCredit(
        sender: string, 
        imgUrl: string,
        location: string,
        description: string,
        contact: string
        ): BulletinPost {
            const bltPost = new BulletinPost(sender, imgUrl, location, description, contact);
            bulletinBoard.set(bltPost.id, bltPost);
            return bltPost;
      }

      static getBulletins (): PersistentUnorderedMap<string, BulletinPost> {
          return bulletinBoard;
      }
      
      static getBulletin (id: string): BulletinPost {
          return bulletinBoard.getSome(id);
      }
    
}
