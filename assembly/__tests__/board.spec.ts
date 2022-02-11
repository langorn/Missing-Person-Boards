import { create, getBulletinPost, getBulletinPosts } from "../index";
import { bulletinBoard } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

describe("create a contract", () => {
   
    it("create a post", () => {
        const missingPost = create("aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920");
        expect(bulletinBoard.getSome(missingPost.id)).toStrictEqual(missingPost);
    })

    it(" get single post information", () => {
        const missingPost1 = create("aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920");
        const missingPost2 = create("aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920");
        const missingPost3 = create("aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920");
        // get those data we just generate
        expect(getBulletinPost(missingPost1.id)).toStrictEqual(missingPost1);
        expect(getBulletinPost(missingPost2.id)).toStrictEqual(missingPost2);
        expect(getBulletinPost(missingPost3.id)).toStrictEqual(missingPost3);
    })


    it("Retrieve All Posts", () => {
        const missingPost1 = create("aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920");
        const missingPost2 = create("aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920");
        const missingPost3 = create("aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920");
        // get those data we just generate
        const missingPostArray = [missingPost1, missingPost2, missingPost3];
        expect(getBulletinPosts()).toStrictEqual(missingPostArray);

    })


})
