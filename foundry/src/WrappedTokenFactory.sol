// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./BridgeBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedTokenFactory is Ownable {
    mapping(string => address) public wrappedTokens;
    string[] public allSymbols;

    event WrappedTokenDeployed(
        string indexed originalSymbol,
        string name,
        string symbol,
        address wrappedToken
    );

    constructor() Ownable(msg.sender) {}

    function deployWrappedToken(
        string memory name,
        string memory symbol,
        string memory originalSymbol
    ) external onlyOwner returns (address) {
        require(bytes(name).length > 0, "Name required");
        require(bytes(symbol).length > 0, "Symbol required");
        require(bytes(originalSymbol).length > 0, "Original symbol required");
        require(wrappedTokens[originalSymbol] == address(0), "Already exists");

        BridgeBase wrapped = new BridgeBase(name, symbol);

        wrapped.transferOwnership(msg.sender);
        wrappedTokens[originalSymbol] = address(wrapped);
        allSymbols.push(originalSymbol);

        emit WrappedTokenDeployed(originalSymbol, name, symbol, address(wrapped));

        return address(wrapped);
    }

    function getWrappedToken(string memory originalSymbol) external view returns (address) {
        return wrappedTokens[originalSymbol];
    }

    function getAllSymbols() external view returns (string[] memory) {
        return allSymbols;
    }
}
