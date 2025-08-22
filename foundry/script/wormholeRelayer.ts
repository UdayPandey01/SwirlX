import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const ETHEREUM_RPC = "https://eth-sepolia.g.alchemy.com/v2/PCLr1MFnA4ma6nhEMz3Od";
const BASE_RPC = "https://base-sepolia.g.alchemy.com/v2/9zTE0e9JvP06iTyRecls2";
const PRIVATE_KEY = "";

const ethBridgeAddress = "0x6D34E425dC7f531B58aA8446b1E2c92DfE9eF965";
const factoryAddress = "0xE98253795Bc234Cd5111b51492a7d0f7502CF65b";

const ethBridgeAbi = [
  "event Lock(address indexed from, address indexed token, uint256 amount, address indexed to, string destinationChain, bytes32 messageId)",
  "event Unlock(address indexed to,address indexed token,uint256 amount,string sourceChain,bytes32 messageId)"
];
const factoryAbi = [
  "function getWrappedToken(string memory originalSymbol) external view returns (address)"
];
const baseTokenAbi = [
  "function mint(address to, uint256 amount) external",
  "function burn(address from, uint256 amount) external"
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
    async (from, token, amount, to, destinationChain, messageId) => {
      console.log(` Lock event detected!`);
      console.log(`   - Details: ${ethers.formatUnits(amount, 18)} tokens for ${to}`);
      console.log(`   - Destination chain: ${destinationChain}`);
      console.log(`   - Message ID: ${messageId}`);
      
      try {
        const originalSymbol = "MT";
        console.log(`   - Asking factory for the address of wrapped '${originalSymbol}'...`);
        const wrappedTokenAddress = await factory.getWrappedToken(originalSymbol);
        
        if (wrappedTokenAddress === ethers.ZeroAddress) {
          console.error(`   -  Error: Factory doesn't have a wrapped token for '${originalSymbol}'.`);
          return;
        }
        console.log(`   - Factory returned address: ${wrappedTokenAddress}`);

        const wrappedToken = new ethers.Contract(wrappedTokenAddress, baseTokenAbi, baseWallet);

        console.log(`   - Calling mint() on the wrapped token contract...`);
        const tx = await wrappedToken.mint(to, amount);
        console.log(`   - Mint transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log(`   -  Mint confirmed on Base!`);

      } catch (e) {
        console.error("   -  Minting process failed:", e);
      }
    }
  )
  ethBridge.on(
    "Unlock",
    async (to, token, amount, sourceChain, messageId  ) => {
      console.log(` Unlock event detected!`);
      console.log(`   - Details: ${ethers.formatUnits(amount, 18)} tokens for ${to}`);
      console.log(`   - Source chain: ${sourceChain}`);
      console.log(`   - Message ID: ${messageId}`);
      
      try {
        const originalSymbol = "MT";
        console.log(`   - Asking factory for the address of wrapped '${originalSymbol}'...`);
        const wrappedTokenAddress = await factory.getWrappedToken(originalSymbol);
        
        if (wrappedTokenAddress === ethers.ZeroAddress) {
          console.error(`   -  Error: Factory doesn't have a wrapped token for '${originalSymbol}'.`);
          return;
        }
        console.log(`   - Factory returned address: ${wrappedTokenAddress}`);

        const wrappedToken = new ethers.Contract(wrappedTokenAddress, baseTokenAbi, baseWallet);

        console.log(`   - Calling burn() on the wrapped token contract...`);
        const tx = await wrappedToken.burn(to, amount);
        console.log(`   - Burn transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log(`   -  Burn confirmed on Base!`);

      } catch (e) {
        console.error("   -  Burning process failed:", e);
      }
    }
  )
}

main().catch(console.error);
