import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const Myaccount = ({ account, users }) => {
  const [rcvdAccount, setRcvdAccount] = useState();
  const [nftNum, setNftNum] = useState();

  //nft 전송하기
  const getTransferNft = async () => {
    try {
      if (!contract) return;
      const response = await contract.methods
        .safeTransferFrom(account, rcvdAccount, nftNum)
        .transact();
    } catch (error) {
      console.error(error);
    }
  };

  //NFT 민팅
  const onClickMint = async () => {
    try {
      await contract.methods.mintNft().call();
    } catch (error) {
      console.error(error);
    }
  };

  // NFT 버닝
  const onClickBurn = async () => {
    try {
      await contract.methods.burnNFT(nftNum).call();
    } catch (error) {
      console.error(error);
    }
  };

  // 대량 민팅
  const onClickBatchMint = async () => {
    try {
      await contract.methods.batchMint(nftNum).call();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(nftNum);
    console.log(rcvdAccount);
  }, [nftNum, rcvdAccount]);

  return (
    <div className="h-screen bg-gradient-to-b from-pivory to-green-600">
      <div className="flex justify-center text-2xl font-bold pt-20 ">
        <div>This is admin page..</div>
      </div>
      <div className="flex justify-center mt-20">
        <input
          className="bg-gray-300 hover:bg-gray-400 m-1"
          name="address"
          placeholder="Metamask address"
          onChange={(e) => setRcvdAccount(e.target.value)}
          value={rcvdAccount}
        />
        <input
          className="bg-gray-300 hover:bg-gray-400 m-1"
          name="network"
          placeholder="NFT amount"
          onChange={(e) => setNftNum(e.target.value)}
          value={nftNum}
        />
        <button
          className="bg-gray-300 hover:bg-gray-600 p-1"
          onClick={getTransferNft}
        >
          Transact
        </button>
        <button
          className="bg-gray-300 ml-1 hover:bg-gray-600"
          onClick={onClickMint}
        >
          mint NFT
        </button>
        <button
          className="bg-gray-300 ml-1 hover:bg-gray-600"
          onClick={onClickBurn}
        >
          burn NFT
        </button>
        <button
          className="bg-gray-300 ml-1 hover:bg-gray-600"
          onClick={onClickBatchMint}
        >
          Batch Mint
        </button>
      </div>
    </div>
  );
};
export default Myaccount;
