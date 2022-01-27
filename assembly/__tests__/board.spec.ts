import { create, getBulletinPost, getBulletinPosts } from '../main';
import { BulletinPost, bulletinBoard } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

describe("create a contract", () => {
    it("create a post", () => {
        const missingPost = create("me", "aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920", 100);
        expect(bulletinBoard.getSome(missingPost.postId)).toStrictEqual(missingPost);
    })

    it(" get single post information", () => {
        const missingPost1 = create("me1", "aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920", 100);
        const missingPost2 = create("me2", "aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920", 100);
        const missingPost3 = create("me3", "aaaa.img", "singapore,singapore", "My Cat is missing", "0142292920", 100);
        // get those data we just generate
        expect(getBulletinPost(missingPost1.postId)).toStrictEqual(missingPost1);
        expect(getBulletinPost(missingPost2.postId)).toStrictEqual(missingPost2);
        expect(getBulletinPost(missingPost3.postId)).toStrictEqual(missingPost3);
    })
})
