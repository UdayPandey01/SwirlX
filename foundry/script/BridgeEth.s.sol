// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BridgeEth} from "../src/BridgeEth.sol";

contract BridgeEthScript is Script {
    function run() public {
        vm.startBroadcast();

        address wormholeCore = 0x706abc4E45D419950511e474C7B9Ed348A4a716c;

        BridgeEth bridgeEth = new BridgeEth(wormholeCore);

        console.log("BridgeEth deployed at:", address(bridgeEth));

        vm.stopBroadcast();
    }
}
