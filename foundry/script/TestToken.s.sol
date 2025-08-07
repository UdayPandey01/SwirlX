// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/TestToken.sol";

contract TestTokenScript is Script {
    function run() public {
        // Option 1: Load from environment variable (recommended for security)
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Option 2: Use explicit uint256 casting
        uint256 deployerPrivateKey = vm.envUnit("PRIVATE_KEY);
        

        vm.startBroadcast(deployerPrivateKey);

        TestToken token = new TestToken(1_000_000 * 1e18);

        console.log("TestToken deployed at:", address(token));

        vm.stopBroadcast();
    }
}
