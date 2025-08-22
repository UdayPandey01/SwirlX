import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const ETHEREUM_RPC = "https://eth-sepolia.g.alchemy.com/v2/PCLr1MFnA4ma6nhEMz3Od";
const PRIVATE_KEY = "0x2933ccb4e9a274b918c12e3917dabd2c94eb591239f6e35555cb43714b6e617d";
const BRIDGE_CONTRACT = "0x6D34E425dC7f531B58aA8446b1E2c92DfE9eF965"; 
const ERC20_TOKEN_ADDRESS = "0xd4696912E308143DbcE647c9c514d63b9b54Effe";

const bridgeAbi = [
    "function lock(address token, uint256 amount, address receiver, string destinationChain) external payable",
    "function unlock(address token, uint256 amount, address receiver, string calldata sourceChain, bytes32 messageId) external"
];
const erc20Abi = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)"
];

async function main(){
    const provider = new ethers.JsonRpcProvider(ETHEREUM_RPC);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const bridge = new ethers.Contract(BRIDGE_CONTRACT, bridgeAbi, wallet);
    const token = new ethers.Contract(ERC20_TOKEN_ADDRESS, erc20Abi, wallet);

    const receiverOnBase = "0x048830aA6b8EBbf29C493d1328c0266E74E08891"; 
    const amount = ethers.parseUnits("0.01", 18); 
    const sourceChain = "Ethereum";
    const messageId = "0xbb7640489bc339cc6db24b5ba813c4c330eb6cd36a7f08a3f3c02e5fa23cc9cf";

    const tx = await bridge.unlock(ERC20_TOKEN_ADDRESS, amount, receiverOnBase, sourceChain, messageId);
    console.log("Tx sent:", tx.hash);
    await tx.wait();
    console.log("Unlock confirmed");
    
}
main();