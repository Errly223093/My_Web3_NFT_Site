import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="bg-gradient-to-b from-pivory to-blue-900 h-screen">
      <div className="p-64 flex flex-col text-xl font-bold justify-center pt-20">
        <div className="font-bold text-3xl">What is NFT ?</div>
        <div>
          An NFT (Non-Fungible Token) is a unique digital asset that uses
          blockchain technology to verify ownership and authenticity. NFTs can
          represent a variety of digital items such as artwork, music, videos,
          and even tweets, and can be sold and traded like any other asset.
          Since NFTs are unique and cannot be replicated, they are highly valued
          by collectors and have gained popularity in the art world as a way to
          sell and display digital art.
        </div>
        <div className="mt-20 font-bold text-3xl">How to buy NFT ?</div>
        <div>
          1. Choose where to buy: You can buy NFTs from various marketplaces
          like OpenSea, Rarible, SuperRare, and more.{" "}
        </div>
        <div>
          2. Set up your digital wallet: NFTs are bought with cryptocurrency, so
          you need to set up a digital wallet like MetaMask or Coinbase Wallet.
        </div>
        <div>
          3. Fund your digital wallet: Buy cryptocurrency like Ethereum (ETH) or
          Bitcoin (BTC) from an exchange and transfer it to your digital wallet.
        </div>
        <div>
          4. Search for the NFT you want to buy: Browse the marketplace and find
          the NFT you want to buy. You can filter search results by categories,
          price, and more.
        </div>
        <div>
          5. Bid or Buy: If the NFT is on auction, you can place a bid. If it's
          a fixed price, you can buy it instantly. Make sure to check the
          details and confirm the price before placing a bid or buying.
        </div>
        <div>
          6. Transfer the NFT to your wallet: After buying the NFT, it will be
          transferred to your digital wallet. Make sure to keep your wallet
          secure since you hold the private key to your NFT.
        </div>
        <Link to="/Nft">
          <button className="text-4xl font-bold text-red-100 mt-20">
            Click to Show BCS NFT
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Main;
