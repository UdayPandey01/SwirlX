// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BridgeEth} from "../src/BridgeEth.sol";

contract BridgeEthScript is Script {
    function run() public {
        vm.startBroadcast();

        address wormholeCore = 0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78;

        BridgeEth bridgeEth = new BridgeEth(wormholeCore);

        console.log("BridgeEth deployed at:", address(bridgeEth));

        vm.stopBroadcast();
    }
}
