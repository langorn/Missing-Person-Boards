#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable"

echo "deleting $CONTRACT and setting $OWNER as beneficiary"
echo

# you can edit with your own preferred data
export IMG_URL="http://www.example.com/1.jpg"
export LOCATION="Malaysia"
export DESCRIPTION="My Cat is Missing"
export CONTACT="+60182929992"
export OWNER="zhro2.testnet"
echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev

# exit on first error after this point to avoid redeploying with successful build
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn build

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ../out/main.wasm

echo --------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT=__new_contract_account_id__'
echo '1. CREATE POST (edit inside bash if you want different value)'
echo "near call \$CONTRACT create '{\"imgUrl\":\"$IMG_URL\", \"location\":\"$LOCATION\", \"description\":\"$DESCRIPTION\", \"contact\":\"$CONTACT\"}' --accountId $OWNER"
echo
echo '2. Retrieve All Posts'
echo "near view \$CONTRACT getBulletinPosts"
echo
echo '3. Retrieve Single Post'
echo "near view \$CONTRACT getBulletinPost '{\"id\":\"UnorderedMap_Id\"}' --accountId $OWNER"
exit 0
