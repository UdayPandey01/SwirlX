// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {BridgeEth} from "../src/BridgeEth.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock Token", "MTK") {
        _mint(msg.sender, 1000 ether);
    }
}


contract BridgeEthTest is Test {
    BridgeEth public bridgeEth;
    MockToken public mockToken;

    address public user = address(1);
    address public receiver = address(2);
    bytes32 public messageId = keccak256("test");

    function setUp() public {
        bridgeEth = new BridgeEth();
        mockToken = new MockToken();

        mockToken.transfer(user, 500 ether);
        bridgeEth.addTokenToWhitelist(address(mockToken));

        vm.label(user, "User");
        vm.label(receiver, "Receiver");
        vm.label(address(mockToken), "MockToken");
    }

    function test_addTokenToWhitelist() public {
        bridgeEth.addTokenToWhitelist(address(1));
        assertEq(bridgeEth.whitelistedTokens(address(1)), true);
    }

    function test_removeTokenFromWhitelist() public {
        bridgeEth.addTokenToWhitelist(address(1));
        bridgeEth.removeTokenFromWhitelist(address(1));
        assertEq(bridgeEth.whitelistedTokens(address(1)), false);
    }

    function test_lock() public {
        vm.startPrank(user);
        mockToken.approve(address(bridgeEth), 100 ether);   

        vm.expectEmit(true, true, true, true);
        emit BridgeEth.Lock(user, address(mockToken), 100 ether, receiver, "base");
        bridgeEth.lock(address(mockToken), 100 ether, receiver, "base");

        vm.stopPrank();

        assertEq(mockToken.balanceOf(user), 400 ether);
        assertEq(mockToken.balanceOf(address(bridgeEth)), 100 ether);
    }

    function test_unlock() public {
        uint256 amount = 200 ether;

        mockToken.transfer(address(bridgeEth), amount);

        vm.expectEmit(true, true, true, true);
        emit BridgeEth.Unlock(receiver, address(mockToken), amount, "base", messageId);

        bridgeEth.unlock(address(mockToken), amount, receiver, "base", messageId);

        assertEq(mockToken.balanceOf(receiver), amount);
        assertEq(bridgeEth.processedMessages(messageId), true);
    }

    function test_unlockFailsIfAlreadyProcessed() public {
        mockToken.transfer(address(bridgeEth), 100 ether);
        bridgeEth.unlock(address(mockToken), 100 ether, receiver, "base", messageId);

        vm.expectRevert("Already processed");
        bridgeEth.unlock(address(mockToken), 100 ether, receiver, "base", messageId);
    }

    function test_unlockFailsIfTokenNotWhitelisted() public {
        address fakeToken = address(0xBEEF);

        vm.expectRevert("Token not whitelisted");
        bridgeEth.unlock(fakeToken, 100 ether, receiver, "base", keccak256("msg2"));
    }

    function test_unlockFailsIfReceiverIsZero() public {
        vm.expectRevert("Receiver cannot be zero");
        bridgeEth.unlock(address(mockToken), 100 ether, address(0), "base", keccak256("msg3"));
    }

    function test_unlockFailsIfAmountIsZero() public {
        vm.expectRevert("Amount must be greater than 0");
        bridgeEth.unlock(address(mockToken), 0, receiver, "base", keccak256("msg4"));
    }
}
