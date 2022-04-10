import React, { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

import {
  dogeAbi,
  bitcoinAbi,
  solanaAbi,
  usdcAbi,
  dogeAddress,
  bitcoinAddress,
  solanaAddress,
  usdcAddress,
} from "../lib/constants";

export const RobinhoodContext = createContext();

export const RobinhoodProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formattedAccount, setFormattedAccount] = useState();
  const [coinSelect, setCoinSelect] = useState("DOGE");
  const [toCoin, setToCoin] = useState("");
  const [balance, setBalance] = useState("");

  const [amount, setAmount] = useState("");

  const { isAuthenticated, authenticate, user, logout, Moralis, enableWeb3 } =
    useMoralis();

  useEffect(async () => {
    if (isAuthenticated) {
      const account = user.get("ethAddress");
      let formatAccount = account.slice(0, 4) + "..." + account.slice(-4);
      setFormattedAccount(formatAccount);
      setCurrentAccount(account);
      const currentBalance = await Moralis.Web3API.account.getNativeBalance({
        chain: "rinkeby",
        address: currentAccount,
      });
      const balanceToEth = Moralis.Units.FromWei(currentAccount.balance);
      const formattedBalance = parseFloat(balanceToEth).toFixed(3);
      setBalance(formattedBalance);
    }
  }, [isAuthenticated, enableWeb3]);

  useEffect(() => {
    if (!currentAccount) return;
    (async () => {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: currentAccount,
        }),
      });

      const data = await response.json();
    })();
  }, [currentAccount]);

  const getContractAddress = () => {
    if (coinSelect === "BTC") return bitcoinAddress;
    if (coinSelect === "SOL") return solanaAddress;
    if (coinSelect === "USDC") return usdcAddress;
    if (coinSelect === "DOGE") return dogeAddress;
  };

  const getToAddress = () => {
    if (toCoin === "BTC") return bitcoinAddress;
    if (toCoin === "SOL") return solanaAddress;
    if (toCoin === "USDC") return usdcAddress;
    if (toCoin === "DOGE") return dogeAddress;
  };

  const getToAbi = () => {
    if (toCoin === "BTC") return bitcoinAbi;
    if (toCoin === "SOL") return solanaAbi;
    if (toCoin === "USDC") return usdcAbi;
    if (toCoin === "DOGE") return dogeAbi;
  };

  const mint = async () => {
    try {
      if (coinSelect === "ETH") {
        if (!isAuthenticated) return;
        await Moralis.enableWeb3();
        const contractAddress = getToAddress();
        const abi = getToAbi();

        let options = {
          contractAddress: contractAddress,
          functionName: "mint",
          abi: abi,
          params: {
            to: currentAccount,
            account: Moralis.Units.Token("50", "18"),
          },
        };
        //sendEth();
        const transaction = await Moralis.executeFunction(options);
        const receipt = await transaction.wait(4);
        console.log(receipt);
        //saveTransaction(receipt.transactionHash, amount, receipt.to)
      } else {
        swapTokens();
        //saveTransaction(receipt.transactionHash, amount, receipt.to)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    authenticate();
  };

  const signOut = () => {
    logout();
  };

  return (
    <RobinhoodContext.Provider
      value={{
        connectWallet,
        currentAccount,
        signOut,
        isAuthenticated,
        formattedAccount,
        setAmount,
        setCoinSelect,
        coinSelect,
        balance,
        amount,
        toCoin,
        setToCoin,
      }}
    >
      {children}
    </RobinhoodContext.Provider>
  );
};
