// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BridgeBase} from "../src/BridgeBase.sol";

contract BridgeBaseScript is Script {
    function run() public {
        vm.startBroadcast();

        BridgeBase wrapped = new BridgeBase("Wrapped PEPE", "wPEPE");

        console.log("BridgeBase deployed at:", address(wrapped));

        vm.stopBroadcast();
    }
}
