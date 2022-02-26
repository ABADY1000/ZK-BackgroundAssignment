const {ethers} = require('hardhat');

async function main(){

    const Simple = await ethers.getContractFactory('Simple');
    const simple = await Simple.deploy();
    await simple.deployed();

    console.log();
    console.log(`Simple contract is deployed to: ${simple.address}`);
    console.log();
}

main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });