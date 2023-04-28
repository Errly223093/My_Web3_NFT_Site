import React from "react";
import { SiDatadotai, SiArtifacthub } from "react-icons/si";
import { BsCoin } from "react-icons/bs";
import { GrGamepad } from "react-icons/gr";
import { CgCommunity } from "react-icons/cg";
import { FaBitcoin, FaUikit } from "react-icons/fa";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Header = ({ account, setAccount }) => {
  // 지갑 연결 및 지갑 주소 가져오기
  const onClickConnectWallet = async () => {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(account[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" bg-pivory flex justify-between items-center pl-2">
      <Link to="/">
        <button className="flex justify-between m-3">
          <FaUikit size={30} />

          <div className="ml-2 mt-1">BCS NFT</div>
        </button>
      </Link>
      <div className="flex gap-20">
        <div>
          <Link to="/Nft">
            <button className="flex">
              NFT <SiArtifacthub size={23} className="ml-2" />
            </button>
          </Link>
        </div>
        <div>
          <Link to="/Game">
            <button className="flex">
              Game
              <GrGamepad size={25} className="ml-2 pb-1" />
            </button>
          </Link>
        </div>
        <div>
          <Link to="/Crypto">
            <button className="flex">
              Crypto
              <FaBitcoin size={25} className="ml-2" />
            </button>
          </Link>
        </div>
        <Link to="/Community">
          <button className="flex">
            Community
            <CgCommunity size={28} className="ml-2" />
          </button>
        </Link>
      </div>
      {account ? (
        <div className="pr-4 font-bold">
          {account.substr(0, 4)}....
          {account.substr(account.length - 4, account.length)}
        </div>
      ) : (
        <button onClick={onClickConnectWallet} className="pr-6 font-bold">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Header;
