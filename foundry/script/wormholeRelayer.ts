
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const ETHEREUM_RPC = process.env.SOURCE_RPC_URL!;
const BASE_RPC = process.env.DESTINATION_RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

const ethBridgeAddress = process.env.BRIDGE_ETH_SEPOLIA!;
const factoryAddress = process.env.WRAPPED_TOKEN_FACTORY!;

const ethBridgeAbi = [
  "event Lock(address indexed from, address indexed token, uint256 amount, address indexed to, string destinationChain)"
];
const factoryAbi = [
  "function getWrappedToken(string memory originalSymbol) external view returns (address)"
];
const baseTokenAbi = [
  "function mint(address to, uint256 amount) external"
];


async function main() {
  const ethProvider = new ethers.JsonRpcProvider(ETHEREUM_RPC);
  const baseProvider = new ethers.JsonRpcProvider(BASE_RPC);
  const baseWallet = new ethers.Wallet(PRIVATE_KEY, baseProvider);

  const ethBridge = new ethers.Contract(ethBridgeAddress, ethBridgeAbi, ethProvider);
  const factory = new ethers.Contract(factoryAddress, factoryAbi, baseProvider);

  console.log("Listening for Lock events on Ethereum Sepolia...");

  ethBridge.on(
    "Lock",
    async (from, token, amount, to, destinationChain) => {
      console.log(`✅ Lock event detected!`);
      console.log(`   - Details: ${ethers.formatUnits(amount, 18)} tokens for ${to}`);
      
      try {
        const originalSymbol = "MT";
        console.log(`   - Asking factory for the address of wrapped '${originalSymbol}'...`);
        const wrappedTokenAddress = await factory.getWrappedToken(originalSymbol);
        
        if (wrappedTokenAddress === ethers.ZeroAddress) {
          console.error(`   - ❌ Error: Factory doesn't have a wrapped token for '${originalSymbol}'.`);
          return;
        }
        console.log(`   - Factory returned address: ${wrappedTokenAddress}`);

        const wrappedToken = new ethers.Contract(wrappedTokenAddress, baseTokenAbi, baseWallet);

        console.log(`   - Calling mint() on the wrapped token contract...`);
        const tx = await wrappedToken.mint(to, amount);
        console.log(`   - Mint transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log(`   - ✅ Mint confirmed on Base!`);

      } catch (e) {
        console.error("   - ❌ Minting process failed:", e);
      }
    }
  );
}

main().catch(console.error);