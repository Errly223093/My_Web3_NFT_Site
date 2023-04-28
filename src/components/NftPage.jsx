import React, { useEffect, useState } from "react";
import axios from "axios";
import Nft1 from "./Nft1";

const NftPage = ({ page, mintedNft }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [nfts, setNfts] = useState();

  const onClickPage = (p) => () => {
    setSelectedPage(p);
    getNfts(p);
  };

  // nft tokenId
  const getNfts = async (p) => {
    try {
      let nftArray = [];

      setNfts(); // 값이 있는 상태에서 실행하면X, 일부러 값을 비워줌

      // 토큰ID 값 생성
      for (let i = 0; i < 10; i++) {
        const tokenId = i + 1 + (p - 1) * 10;
        // 3페이지라면, 3페이지 -1 = 2, 여기에 10 곱해서 20.
        // 20을 i + 1 문으로 1번씩 돌리면 21~30 까지의 토큰 id 를 적용할 수 있다.
        console.log(tokenId);
        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
        );

        nftArray.push({ tokenId, metadata: response.data });
      }
      setNfts(nftArray);
    } catch (error) {
      console.error(error);
    }
  };

  // 페이지 수 생성
  const pageComp = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button
          key={i}
          className={`ml-8 text-xl font-bold ${
            i + 1 === selectedPage ? "text-green-500" : "text-pivory"
          }`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1} <span className="text-base">페이지</span>
        </button>
      );
    }

    return pageArray;
  };

  // 렌더링 될때, 기본적으로 1페이지의 정보를 가져오기 위해 1이라는 값이 인풋
  useEffect(() => {
    getNfts(1);
  }, []);

  return (
    <div className="bg-gray-800 h-screen">
      {pageComp()}
      <div>
        <div>
          {nfts ? (
            nfts.map((v, i) => {
              return (
                <Nft1
                  key={i}
                  tokenId={v.tokenId}
                  mintedNft={v.mintedNft}
                  metadata={v.metadata}
                />
              );
            })
          ) : (
            <div className="text-2xl text-white">
              <img
                src={`${process.env.PUBLIC_URL}/images/byeonsache.png`}
                alt=""
              />
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftPage;
