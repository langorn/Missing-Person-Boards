import { PersistentUnorderedMap,PersistentMap,  math, Value } from "near-sdk-as";
import { postBulletion } from "./main";


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
        this.postId =  math.hash32<string>('taskx');
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
        //   let bulletPost = new PersistentMap<string, string>("bulletinPost");
        //   bulletPost.set('sender', sender);
        //   bulletPost.set('imgUrl', imgUrl);
        //   bulletPost.set('location', location);
        //   bulletPost.set('description', description);
        //   bulletPost.set('contact', contact);
            bulletinBoard.set(bltPost.postId, bltPost);
            return bltPost;
      }
    // set (key: val){

    // }
    
}