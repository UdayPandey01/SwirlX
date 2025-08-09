import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const ETHEREUM_RPC = process.env.SOURCE_RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const BRIDGE_CONTRACT = process.env.BRIDGE_ETH_SEPOLIA!; 
const ERC20_TOKEN_ADDRESS = process.env.TEST_TOKEN!; 

const bridgeAbi = [
  "function lock(address token, uint256 amount, address receiver, string destinationChain) external payable"
];
const erc20Abi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const bridge = new ethers.Contract(BRIDGE_CONTRACT, bridgeAbi, wallet);
  const token = new ethers.Contract(ERC20_TOKEN_ADDRESS, erc20Abi, wallet);

  const receiverOnBase = "0x048830aA6b8EBbf29C493d1328c0266E74E08891"; 
  const amount = ethers.parseUnits("0.01", 18); 
  const destinationChain = "Base";
  const balance = await token.balanceOf(wallet.address);
  if (balance < amount) {
    console.error("Not enough balance");
    return;
  }

  const allowance = await token.allowance(wallet.address, BRIDGE_CONTRACT);
  console.log("Allowance:", ethers.formatUnits(allowance, 18));
  if (allowance < amount) {
    console.log(`Approving ${ethers.formatUnits(amount, 18)} tokens...`);
    const approveTx = await token.approve(BRIDGE_CONTRACT, amount);
    await approveTx.wait();
    console.log("Approved");
    
  }
  

  console.log(`Locking ${ethers.formatUnits(amount, 18)} tokens for ${receiverOnBase} to ${destinationChain}...`);
  // const wormholeFee = ethers.parseEther("0.001");
  console.log(ERC20_TOKEN_ADDRESS, amount, receiverOnBase, destinationChain);
  try {
    const tx = await bridge.lock(ERC20_TOKEN_ADDRESS, amount, receiverOnBase, destinationChain);
    console.log("Tx sent:", tx.hash);
    await tx.wait();
    console.log("Lock confirmed");
  } catch (err: any) {
    console.error("Lock failed:", err.message || err);
  }
}

main().catch(console.error);
