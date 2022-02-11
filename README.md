# Missing-Person-Boards
Near Protocol Certificate Submission - Implementation for Near Protocol Certification Project.


## Concept
The purpose of this project is intends to helps resolve missing, unidentified, and unclaimed person cases worldwide with blockchain technology.

## Installation
clone this repo

run `yarn install` 

run `yarn build` 


## Commands
#### Compile source to WebAssembly

    yarn build                    

#### Run unit tests
    yarn test         

#### Deploy Contract to Testnet
    yarn deploy  

## Contract

## Bash and Near CLI
#### Please run this test script in `scripts` folder
    cd scripts
    bash init.sh
    
#### Follow the instruction and type in the terminal

export CONTRACT=dev_************ (replace with contract id returned after dev-deploy contract, or just paste it)


    1. CREATE POST (edit inside bash if you want different value)
    near call $CONTRACT create '{"imgUrl":"http://www.example.com/1.jpg", "location":"Malaysia", "description":"My Cat is Missing", "contact":"+60182929992"}' --accountId zhro2.testnet

    2. Retrieve All Posts
    near view $CONTRACT getBulletionPosts

    3. Retrieve Single Post
    near view $CONTRACT getBulletionPost '{"id":"UnorderedMap_Id"}' --accountId zhro2.testnet

## NodeJS Unit Test
#### Please run this test script in the following format:
    Format:
    node testnet-testing.js MASTER_ACC.testnet CONTRACT_NAME TESTER_ACC
    
    Example:
    node testnet-testing.js zhro1929.testnet missing-person-board1 aki2000


## Features
### Create 
  *Create a Post*

`npx near call CONTRACT_NAME create '{"imgUrl":"..." , "location": "...", "description": "...", "contact": "..."}' --accountId YOUR_ACC.testnet`

*example*

`npx near call mbp32.zhro2.testnet create '{"imgUrl":"http://www.example.com/1.jpg" , "location": "Thailand", "description": "my rabbit is missing", "contact": "+60182208192"}' --accountId zhro2.testnet`

    {
      id: '17SH761gV2DxfuZPEw7UHvy2wZY=',
      sender: 'zhro2.testnet',
      imgUrl: 'http://www.example.com/1.jpg',
      location: 'Thailand',
      description: 'my rabbit is missing',
      contact: '+60182208192'
    }

### getBulletinPosts
 *Retrieve All Posts*
 
`near view CONTRACT_NAME getBulletinPosts`

*example*

`near view mbp32.zhro2.testnet getBulletinPosts`

    View call: mbp32.zhro2.testnet.getBulletinPosts()
    [
      {
        id: '5mTjcCRvRhAMrgxbcBiGV8hwx/k=',
        sender: 'aki32.zhro2.testnet',
        imgUrl: 'aki.img',
        location: 'Singapore',
        description: 'my cat is missing',
        contact: '01429231881'
      }

### getBulletinPost
 *Retrieve Single Post*
 
`near view CONTRACT_NAME getBulletinPost '{"id": "..."}' --accountId YOUR_ACC.testnet`

*example*

`npx near view mbp32.zhro2.testnet getBulletinPost '{"id":"5mTjcCRvRhAMrgxbcBiGV8hwx/k="}' --accountId zhro2.testnet`

    View call: mbp32.zhro2.testnet.getBulletinPost({"id":"5mTjcCRvRhAMrgxbcBiGV8hwx/k="})
    {
      id: '5mTjcCRvRhAMrgxbcBiGV8hwx/k=',
      sender: 'aki32.zhro2.testnet',
      imgUrl: 'aki.img',
      location: 'Singapore',
      description: 'my cat is missing',
      contact: '01429231881'
    }

## Other documentation
#### BulletinBoard contract and test documentation

see `assembly/__tests__/boards.spec.ts` for Bulletin unit testing details
BulletinBoard contract simulation tests


