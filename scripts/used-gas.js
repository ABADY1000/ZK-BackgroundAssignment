// ethers
const {ethers} = require('hardhat');


async function main(){

    // Get all accounts (first account belongs to owner)
    let accounts = await ethers.getSigners();
    let owner = accounts[0];
    
    //----------------------------------------------------------//
    // ----------- First Contract (Original Ballot) ----------- //
    //----------------------------------------------------------//

    // Get contract and deploy it with three proposals
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy([
        "0xabcdef0000000000000000000000000000000000000000000000000000000000",
        "0xabcdef0000000000000000000000000000000000000000000000000000000001",
        "0xabcdef0000000000000000000000000000000000000000000000000000000002"
    ]);
    await ballot.deployed();
    console.log(`First Contract is deployed to address: ${ballot.address}`)

    // Get balance befor giving right to vote to 10 voters
    let initialBalance = await owner.getBalance();
    
    // Give rightToVote for 10 voters by calling "giveRightToVote" 10 times
    for(let i=1; i<11; i++){
        await ballot.giveRightToVote(await accounts[i].getAddress());
    }

    // Get balance after giving right to vote to 10 voters
    let finalBalance = await owner.getBalance();

    //-----------------------------------------------------------//
    // ----------- Second Contract (Modified Ballot) ----------- //
    //-----------------------------------------------------------//

    // Get contract and deploy it with three proposals
    const Ballot_mod = await ethers.getContractFactory("Ballot_mod");
    const ballot_mod = await Ballot_mod.deploy([
        "0xabcdef0000000000000000000000000000000000000000000000000000000000",
        "0xabcdef0000000000000000000000000000000000000000000000000000000001",
        "0xabcdef0000000000000000000000000000000000000000000000000000000002"
    ]);
    await ballot_mod.deployed();
    console.log(`Second Contract is deployed to address: ${ballot_mod.address}`)
    // Get balance befor giving right to vote to 10 voters
    let initialBalance2 = await owner.getBalance();
    
    // Get 10 voters in an array
    let new_accounts = await Promise.all(accounts.map(async (value)=> await value.getAddress()));
    let accounts10 =  new_accounts.slice(1, 11);

    // Give rightToVote for 10 voters by calling the modified "giveRightToVote" function only once
    await ballot_mod.giveRightToVote(accounts10);

    // Get balance after giving right to vote to 10 voters
    let finalBalance2 = await owner.getBalance();


    // console.log(`Initial balance : ${initialBalance}`);
    // console.log(`Fianl balance   : ${finalBalance}`);
    // console.log(`Initial balance2: ${initialBalance2}`);
    // console.log(`Fianl balance2  : ${finalBalance2}`);
    const b1 = initialBalance - finalBalance;
    const b2 = initialBalance2 - finalBalance2;
    console.log(`First contract gas     : ${ethers.utils.formatUnits(b1, 'gwei')} Gwei`);
    console.log(`Second contract gas    : ${ethers.utils.formatUnits(b2, 'gwei')} Gwei`);
    console.log(`Percentage of discount : ${((b1-b2)/b1*100).toFixed(2)}%`);
}

// Main function call
main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });