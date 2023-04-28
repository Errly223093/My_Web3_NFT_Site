import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import NftPage from "../components/NftPage";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const Nft = ({ account, users }) => {
  const [imgnum, setImgnum] = useState(1);
  const [rcvdAccount, setRcvdAccount] = useState();
  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNft] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [page, setPage] = useState(1);

  const imgUrl = `${process.env.REACT_APP_IMAGE_URL}/${imgnum}.png`;

  // 5초마다 이미지 값 증가
  useEffect(() => {
    let interval;
    if (imgnum < 21) {
      interval = setInterval(() => setImgnum(imgnum + 1), 5000000); /////// 일부러 늘려놓음
    }

    // no.21 되면 1로 돌아가기
    if (imgnum === 21) {
      setImgnum(imgnum - 20);
    }
    return () => clearInterval(interval);
  }, [imgnum]);

  // nft 전송하기
  const getTransferNft = async () => {
    try {
      if (!contract) return;
      const response = await contract.methods
        .safeTransferFrom(account, rcvdAccount, `${imgnum}`)
        .transact();
    } catch (error) {
      console.error(error);
    }
  };

  // nft 총량 가져오기
  const getTotalNft = async () => {
    try {
      const response = await contract.methods.totalNft().call();
      setTotalNft(response);
      setPage(parseInt(parseInt(response) - 1) / 10 + 1);
      // 페이지 구하는 공식
      // 10 - 1 = 9 / 10 = 0 + 1 = 1page
      // 31 - 1 = 30 / 10 = 3 + 1 = 4page
      // 975 - 1 = 974 / 10 = 97 + 1 = 98page
    } catch (error) {
      console.error(error);
    }
  };

  // 민팅량
  const getMintedNft = async () => {
    try {
      const response = await contract.methods.totalSupply().call();
      setMintedNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 내 nft 량
  const getMyNft = async () => {
    try {
      const response = await contract.methods.balanceOf(account).call();
      setMyNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalNft();
    getMintedNft();
  }, []);

  useEffect(() => {
    getMyNft();
  }, [account]);

  return (
    <>
      <div>
        <div className="bg-gradient-to-b from-pivory to-gray-800 pt-10">
          <div>
            <div className="flex">
              <img
                src={imgUrl}
                alt="NFT"
                className="w-40 h-40 ml-8 mb-4 mt-1 "
              />
              <Link to="https://testnets.opensea.io/collection/lovely-intp">
                <div className="mt-32 ml-4 border-2 border-pivory rounded-xl p-1 text-pivory">
                  Buy Now
                </div>
              </Link>
            </div>
            <div className=" text-pivory mr-52 pl-8">
              "INTP는 심리학적 평가 도구인 Myers-Briggs Type Indicator MBTI
              에서의 성격 유형 중 하나로, Introverted, Intuitive, Thinking,
              Perceiving의 네 가지 요소로 이루어진 네 글자 코드입니다. INTP 성격
              유형의 사람들은 논리적이고 분석적이며 호기심이 많다는 것으로
              묘사됩니다. 복잡한 문제를 분석하고 근본 원리를 이해하려는
              자연스러운 성향을 가지고 있습니다. 독립적인 사고를 하는 편이며
              상황을 도전적으로 바라보는 것을 좋아합니다. 가끔은 로봇, 자발적
              아싸, 사회 부적응자라고 불리기도 합니다."
            </div>
            <div className="flex">
              <div className=" m-8 gap-6 text-pivory">
                <div>총 민팅량</div>
                <div>{totalNft}</div>
              </div>
              <div className=" m-8 gap-6 text-pivory">
                <div>현재 민팅량</div>
                <div>{mintedNft}</div>
              </div>
              <div className=" m-8 gap-6 text-pivory">
                <div>내 소유량</div>
                <div>{myNft}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NftPage page={page} mintedNft={mintedNft} />
    </>
  );
};

export default Nft;
