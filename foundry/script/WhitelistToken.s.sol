// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/BridgeEth.sol";

contract WhitelistTokenScript is Script {
    function run() public {
        uint256 deployerPrivateKey = uint256(0x2933ccb4e9a274b918c12e3917dabd2c94eb591239f6e35555cb43714b6e617d);
        vm.startBroadcast(deployerPrivateKey);

        address bridgeAddress = 0x6D34E425dC7f531B58aA8446b1E2c92DfE9eF965;
        address tokenToWhitelist = 0xd4696912E308143DbcE647c9c514d63b9b54Effe;

        BridgeEth bridge = BridgeEth(bridgeAddress);

        console.log("BridgeEth owner: ", bridge.owner());
        console.log("Script caller: ", msg.sender); // won't print as expected in Foundry — use vm.addr
        console.log("Script caller (derived): ", vm.addr(deployerPrivateKey));

        bridge.addTokenToWhitelist(tokenToWhitelist);

        vm.stopBroadcast();
    }
}
