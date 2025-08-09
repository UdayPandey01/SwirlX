// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/WrappedTokenFactory.sol";
import "../src/BridgeBase.sol";

contract DeployWrappedTokenFactory is Script {
    function run() external {
        vm.startBroadcast();

        WrappedTokenFactory factory = new WrappedTokenFactory();
        console.log("WrappedTokenFactory deployed at:", address(factory));

        string memory name = "Wrapped MyToken";
        string memory symbol = "WMT";
        string memory originalSymbol = "MT";

        address wrappedAddress = factory.deployWrappedToken(name, symbol, originalSymbol);
        console.log("Wrapped token deployed at:", wrappedAddress);
        

        vm.stopBroadcast();
    }
}
