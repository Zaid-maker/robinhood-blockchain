require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [
        "4b8b7c94fe48602dad1925e786af56d5780355a5b0eef521cfe388033b9f502a",
      ],
    },
  },
};
