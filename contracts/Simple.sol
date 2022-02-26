//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Start a new contract
contract Simple{

    // Storage global variable
    uint value;

    // Setter that store a given value in Storage value
    function setter(uint val) public{
        value = val;
    }

    // Getter that returns the value of Storage variable
    function getter() view public returns(uint){
        return value;
    }
}