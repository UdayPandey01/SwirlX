import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

// ✅ Load environment variables
const ETHEREUM_RPC = "https://eth-sepolia.g.alchemy.com/v2/PCLr1MFnA4ma6nhEMz3Od";
const PRIVATE_KEY = "0x145c4e212eb16f29509a796f79fbd864083f45dd70b55d5a1e31385a668e4054";
const BRIDGE_CONTRACT = "0xfFBD6b0ac5e12827122B12B43F233f4490034111"; // Ethereum Sepolia bridge
const ERC20_TOKEN_ADDRESS = "0x011053718683C5968AC4B0Ce04589a46A6E244F3"; // 👈 Replace this with your token address

// ✅ ABI for ERC20 and Bridge contract
const bridgeAbi = [
  "function lock(address token, uint256 amount, address receiver, string destinationChain) external"
];
const erc20Abi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
];

async function main() {
  // ✅ Connect wallet
  const provider = new ethers.JsonRpcProvider(ETHEREUM_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  // ✅ Connect contracts
  const bridge = new ethers.Contract(BRIDGE_CONTRACT, bridgeAbi, wallet);
  const token = new ethers.Contract(ERC20_TOKEN_ADDRESS, erc20Abi, wallet);

  // ✅ Params
  const receiverOnBase = "0x1445E10B5D32d9F7dd1cd44C856ad4d896Bf6D81"; // 👈 Replace with actual receiver address
  const amount = ethers.parseUnits("0.0001", 18); // Sending 0.1 token (adjust decimals as per token)
  const destinationChain = "Base";

  // ✅ Check balance
  const balance = await token.balanceOf(wallet.address);
  if (balance < amount) {
    console.error("Not enough balance");
    return;
  }

  // ✅ Approve if needed
  const allowance = await token.allowance(wallet.address, BRIDGE_CONTRACT);
  if (allowance < amount) {
    console.log(`Approving ${ethers.formatUnits(amount, 18)} tokens...`);
    const approveTx = await token.approve(BRIDGE_CONTRACT, amount);
    await approveTx.wait();
    console.log("Approved");
  }

  // ✅ Call lock
  console.log(`Locking ${ethers.formatUnits(amount, 18)} tokens for ${receiverOnBase} to ${destinationChain}...`);
  const tx = await bridge.lock(ERC20_TOKEN_ADDRESS, amount, receiverOnBase, destinationChain);
  console.log("Tx sent:", tx.hash);

  await tx.wait();
  console.log("Lock confirmed");
}

main().catch(console.error);
