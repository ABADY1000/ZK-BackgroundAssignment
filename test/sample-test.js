const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Hello", function () {
  it("Should return 1", async function () {
    
    let accounts = await ethers.getSigners();
    console.log(`Balance1: ${await accounts[0].getBalance()}`);

    
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy([
      "0xabcdfe0000000000000000000000000000000000000000000000000000000000",
      "0xbbcdfe0000000000000000000000000000000000000000000000000000000001",
      "0xcbcdfe0000000000000000000000000000000000000000000000000000000002",
      "0xdbcdfe0000000000000000000000000000000000000000000000000000000003"
    ]);
    await ballot.deployed();
  

    console.log(`Balance2: ${await accounts[0].getBalance()}`);

    expect(1).to.equal(1);
  });
});

// expect(await ballot.greet()).to.equal("Hello, world!");

// const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

// // wait until the transaction is mined
// await setGreetingTx.wait();

// expect(await greeter.greet()).to.equal("Hola, mundo!");