require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider('sepolia', API_KEY)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// console.log(JSON.stringify(contract.abi));

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x88FC4c6a5037ACEf80bA0f1395081dd42C7FABf27'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://orange-bitter-emu-881.mypinata.cloud/ipfs/QmQjQ1Kbc2Da8LewnfKhVdDXEu7nGWsF23vyLGb4edE3Px?_gl=1*9nqzg0*_ga*MTYxNjg0ODc3OC4xNjk2NDM3NzM0*_ga_5RMPXG14TE*MTY5Njc3MjczNi4zLjEuMTY5Njc3MzA0Mi42MC4wLjA."

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });