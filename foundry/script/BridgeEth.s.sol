// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BridgeEth} from "../src/BridgeEth.sol";

contract BridgeEthScript is Script {
    BridgeEth public bridgeEth;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        bridgeEth = new BridgeEth();

        vm.stopBroadcast();
    }
}
