"use client";
import React, { useEffect, useState } from "react";
import { Signer } from "ethers";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "./util/constants";

function Welcome() {
  const [address, setaddress] = useState("");
  const [amount, setamount] = useState(0);
  const [wallet, setWallet] = useState("");
  const [signer, setSigner] = useState<Signer | undefined>(() => undefined);
  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const ContractAddress = contractAddress;
      const abi = contractABI;
      const contract = new ethers.Contract(ContractAddress, abi, signer);
      try {
        await contract.transfer(address, amount);
        // await contract.transfer({
        //   recipient: address,
        //   amount: amount,
        // });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  async function mint() {
    if (typeof window.ethereum !== "undefined") {
      const ContractAddress = contractAddress;
      const abi = contractABI;
      const contract = new ethers.Contract(ContractAddress, abi, signer);
      try {
        await contract.minttoken(address, amount);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
 useEffect(() => {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const user = provider.getSigner() as Signer;
   setSigner(() => user);
   getCurrentWalletConnected();
   addWalletListener();
 }, [wallet]);

  const handleSubmit = (e: any) => {
    execute();
    e.preventDefault();
  };

  const mintfs = () => {
    mint();
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err:any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts:any) => {
        setWallet(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWallet("");
      console.log("Please install MetaMask");
    }
  };

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(accounts[0]);
        console.log(accounts[0]);
      } catch (err:any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };
  return (
    <div className=" w-screen h-100 flex flex-col justify-center items-center">
      <span>Side Project </span>
      <span>Conect MetaMask & tranfer PSUC</span>
      <button
        className=" w-[50%] h-[50%] border bg-gray-300 "
        onClick={connectWallet}
      >
        connect wallet
      </button>
      <div className=" w-[50%] h-[20%]">
        <div className=" flex justify-center ">
          <div className=" px-4">Your address :</div>
          <span className="is-link has-text-weight-bold">
            {wallet && wallet.length > 0
              ? `Connected: ${wallet.substring(0, 6)}...${wallet.substring(38)}`
              : "Please connect the wallet"}
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col  justify-center items-center gap-2
        "
        >
          <label>
            address :
            <input
              type="text"
              className=" border border-3 border-black"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </label>

          <label>
            amount :
            <input
              type="number"
              className=" border border-3 border-black"
              value={amount}
              onChange={(e:any) => setamount(e.target.value)}
            />
          </label>

          {false ? (
            <></>
          ) : (
            <button
              type="submit"
              className=" w-20 border border-3 border-red-600"
            >
              Submit tranfer
            </button>
          )}
        </form>
      </div>
      <div className=" w-[50%] h-[20%]">
        <button
          onClick={mintfs}
          className=" w-20 border border-3 border-red-600"
        >
          MINT
        </button>
      </div>
    </div>
  );
}

export default Welcome;
