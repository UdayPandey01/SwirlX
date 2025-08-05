// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BridgeEth is Ownable {
    mapping(address => bool) public whitelistedTokens;
    mapping(bytes32 => bool) public processedMessages;

    event Lock(
        address indexed from,
        address indexed token,
        uint256 amount,
        address indexed to,
        string destinationChain
    );

    event Unlock(
        address indexed to,
        address indexed token,
        uint256 amount,
        string sourceChain,
        bytes32 messageId
    );

    constructor() Ownable(msg.sender) {}

    function addTokenToWhitelist(address token) external onlyOwner {
        require(token != address(0), "Invalid token");
        whitelistedTokens[token] = true;
    }

    function removeTokenFromWhitelist(address token) external onlyOwner {
        require(token != address(0), "Invalid token");
        whitelistedTokens[token] = false;
    }

    function lock(
        address token,
        uint256 amount,
        address receiver,
        string calldata destinationChain
    ) external {
        require(whitelistedTokens[token], "Token not whitelisted");
        require(amount > 0, "Amount must be greater than 0");
        require(receiver != address(0), "Receiver address cannot be zero");
        require(bytes(destinationChain).length > 0, "Destination chain required");

        ERC20(token).transferFrom(msg.sender, address(this), amount);

        emit Lock(msg.sender, token, amount, receiver, destinationChain);
    }

    function unlock(
        address token,
        uint256 amount,
        address receiver,
        string calldata sourceChain,
        bytes32 messageId
    ) external onlyOwner {
        require(whitelistedTokens[token], "Token not whitelisted");
        require(!processedMessages[messageId], "Already processed");
        require(receiver != address(0), "Receiver cannot be zero");
        require(amount > 0, "Amount must be greater than 0");

        processedMessages[messageId] = true;
        ERC20(token).transfer(receiver, amount);

        emit Unlock(receiver, token, amount, sourceChain, messageId);
    }
}
