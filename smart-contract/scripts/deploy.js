const { ethers } = require("hardhat");

const main = async () => {
  const dogeFactory = await ethers.getContractFactory("Dogecoin");
  const dogeContract = await dogeFactory.deploy();
  console.log("Dogecoin deployed to", dogeContract.address);

  const bitcoinFactory = await ethers.getContractFactory("Btc");
  const bitcoinContract = await bitcoinFactory.deploy();
  console.log("Bitcoin deployed to", bitcoinContract.address);

  const solanaFactory = await ethers.getContractFactory("Solana");
  const solanaContract = await solanaFactory.deploy();
  console.log("Solana deployed to", solanaContract.address);

  const usdcFactory = await ethers.getContractFactory("Usdc");
  const usdcContract = await usdcFactory.deploy();
  console.log("Usdc deployed to", usdcContract.address);
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
