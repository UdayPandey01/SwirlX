// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/BridgeEth.sol";

contract WhitelistTokenScript is Script {
    function run() public {
        uint256 deployerPrivateKey = uint256(0x145c4e212eb16f29509a796f79fbd864083f45dd70b55d5a1e31385a668e4054);
        vm.startBroadcast(deployerPrivateKey);

        address bridgeAddress = 0xfFBD6b0ac5e12827122B12B43F233f4490034111;
        address tokenToWhitelist = 0x011053718683C5968AC4B0Ce04589a46A6E244F3;

        BridgeEth bridge = BridgeEth(bridgeAddress);

        console.log("BridgeEth owner: ", bridge.owner());
        console.log("Script caller: ", msg.sender); // won't print as expected in Foundry — use vm.addr
        console.log("Script caller (derived): ", vm.addr(deployerPrivateKey));

        bridge.addTokenToWhitelist(tokenToWhitelist);

        vm.stopBroadcast();
    }
}
