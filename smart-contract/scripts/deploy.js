const { ethers } = require("hardhat");

const main = async () => {
  const dogeFactory = await ethers.getContractFactory("Dogecoin");
  const dogeContract = dogeFactory.deploy();
  console.log("Dogecoin Deployed to", dogeContract.address);

  const bitcoinFactory = await ethers.getContractFactory("Dogecoin");
  const bitcoinContract = bitcoinFactory.deploy();
  console.log("Bitcoin Deployed to", bitcoinContract.address);

  const solanaFactory = await ethers.getContractFactory("Dogecoin");
  const solanaContract = solanaFactory.deploy();
  console.log("Solana Deployed to", solanaContract.address);

  const usdcFactory = await ethers.getContractFactory("Dogecoin");
  const usdcContract = usdcFactory.deploy();
  console.log("USDC Deployed to", usdcContract.address);
};

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
