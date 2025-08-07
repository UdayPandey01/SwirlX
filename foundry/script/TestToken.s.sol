// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/TestToken.sol";

contract TestTokenScript is Script {
    function run() public {
        // Option 1: Load from environment variable (recommended for security)
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Option 2: Use explicit uint256 casting
        uint256 deployerPrivateKey = uint256(0x145c4e212eb16f29509a796f79fbd864083f45dd70b55d5a1e31385a668e4054);
        
        // Option 3: Alternative hex format
        // uint256 deployerPrivateKey = 0x145c4e212eb16f29509a796f79fbd864083f45dd70b55d5a1e31385a668e4054;

        vm.startBroadcast(deployerPrivateKey);

        TestToken token = new TestToken(1_000_000 * 1e18);

        console.log("TestToken deployed at:", address(token));

        vm.stopBroadcast();
    }
}
