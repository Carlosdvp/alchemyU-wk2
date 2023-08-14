const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);
const userName = 'Brandi Johnston';

async function main() {
  // get the proof
  const index = niceList.findIndex(n => n === userName);
  const proof = merkleTree.getProof(index);

  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: userName,
      proof: proof,
    });

    console.log({ gift });
  } catch (error) {
    console.error('Error', error.message);
  }
}

main();