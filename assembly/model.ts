import { Value } from "near-sdk-as";

// Export a new class
export class BulletinPost {
    postId: i32;
    sender: string;
    // timeMs: i32;
    imgUrl: string;
    location: string;
    description: string;
    contact: string;
    postLeft: u32;

    constructor(sender: string, imgUrl: string, location: string, description: string, contact: string) {
        this.sender = sender;
        // this.timeMs = new Date().toUTCString();
        this.imgUrl = imgUrl;
        this.location = location;
        this.description = description;
        this.contact = contact;
        this.postLeft = 100;
    }
    // set (key: val){

    // }
    
}