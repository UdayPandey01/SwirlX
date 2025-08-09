// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/BridgeEth.sol";

contract WhitelistTokenScript is Script {
    function run() public {
        uint256 deployerPrivateKey = uint256(vm.envString("PRIVATE_KEY"));
        vm.startBroadcast(deployerPrivateKey);

        address bridgeAddress = 0xd86AaD8DB6433d1010301463916d6e1Da25e6b89;
        address tokenToWhitelist = 0xd4696912E308143DbcE647c9c514d63b9b54Effe;

        BridgeEth bridge = BridgeEth(bridgeAddress);

        console.log("BridgeEth owner: ", bridge.owner());
        console.log("Script caller: ", msg.sender); // won't print as expected in Foundry — use vm.addr
        console.log("Script caller (derived): ", vm.addr(deployerPrivateKey));

        bridge.addTokenToWhitelist(tokenToWhitelist);

        vm.stopBroadcast();
    }
}
