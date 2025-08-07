import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const ETHEREUM_RPC = process.env.SOURCE_RPC_URL!;
const BASE_RPC = process.env.DESTINATION_RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

const bridgeEthAddress = "0xfFBD6b0ac5e12827122B12B43F233f4490034111";
const bridgeBaseAddress = "0x57330238d1c145E4A1884bE56FA1afdC865B6125";

const bridgeAbi = [
  "event Lock(address indexed from, address indexed to, uint256 amount)",
  "function mint(address to, uint256 amount) external",
];

async function main() {
  const ethProvider = new ethers.JsonRpcProvider(ETHEREUM_RPC);
  const baseProvider = new ethers.JsonRpcProvider(BASE_RPC);
  console.log("PRIVATE_KEY length:", PRIVATE_KEY?.length);
  console.log("PRIVATE_KEY:", PRIVATE_KEY);

  const wallet = new ethers.Wallet(PRIVATE_KEY, ethProvider);

  const ethBridge = new ethers.Contract(bridgeEthAddress, bridgeAbi, wallet);
  const baseBridge = new ethers.Contract(bridgeBaseAddress, bridgeAbi, wallet);

  console.log("Listening for Lock events...");

  ethBridge.on(
    "Lock",
    async (
      sender: string,
      token: string,
      amount: ethers.BigNumberish,
      receiver: string,
      destinationChain: string
    ) => {
      console.log(
        `Lock event: Sender: ${sender}, Token: ${token}, Amount: ${ethers.formatEther(
          amount
        )}, Receiver: ${receiver}, DestChain: ${destinationChain}`
      );

      try {
        const tx = await baseBridge.mint(receiver, amount);
        console.log(
          `Minted ${ethers.formatEther(amount)} to ${receiver} tx: ${tx.hash}`
        );
        await tx.wait();
        console.log(`Mint confirmed on Base`);
      } catch (e) {
        console.error("Minting failed:", e);
      }
    }
  );
}

main();
