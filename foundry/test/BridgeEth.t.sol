// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {BridgeEth} from "../src/BridgeEth.sol";

contract BridgeEthTest is Test {
    BridgeEth public bridgeEth;

    function setUp() public {
        bridgeEth = new BridgeEth();
        bridgeEth.setNumber(0);
    }

    function test_Increment() public {
        bridgeEth.increment();
        assertEq(bridgeEth.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        bridgeEth.setNumber(x);
        assertEq(bridgeEth.number(), x);
    }
}
