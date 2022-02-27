//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Start a new contract
contract Simple{

    // Storage global variable
    uint value;

    // Setter that store a given value in Storage value
    // Since this function change value on chain,
    // it consts gas and needs some time to complete.
    function setter(uint val) public{
        value = val;
    }

    // Getter that returns the value of Storage variable
    // It is a view function, it is fast and free
    function getter() view public returns(uint){
        return value;
    }
}