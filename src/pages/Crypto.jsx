import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TfiFaceSad, TfiFaceSmile } from "react-icons/tfi";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { SiBinance } from "react-icons/si";
import { Link } from "react-router-dom";

const Crypto = ({ users, setUsers }) => {
  const [CryptoArray, setCryptoArray] = useState([]);
  const [mainCryptoArray, setMainCryptoArray] = useState([]);

  // 주소와 네트워크 이름 저장
  const [inputs, setInputs] = useState({
    address: "",
    network: "",
  });
  const { address, network } = inputs;

  // 클릭시 받아온 e 값을 아래로 넘겨줌
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //

  // 다음 id값 지정
  const nextId = useRef(3);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      address,
      network,
    };
    setUsers([...users, user]);
    setInputs({
      address: "",
      network: "",
    });
    console.log(nextId.current);
    nextId.current += 1;
  };

  // 바이낸스 24시간 정보 가져오기
  // 바이낸스 api 문서에서는 5분당 300회 요청 가능
  // 아래 코드처럼 전체 정보를 가져올땐 1번 = 40회
  const getCryptoPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.binance.com/api/v1/ticker/24hr"
      );
      setMainCryptoArray(response.data);
      setCryptoArray(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 매 1분마다 크립토 값 새로고침, 바이낸스 api는 5분당 7번 가져올 수 있음
  const [count, setCount] = useState(0);
  // 자동 새로고침 취소 기능 (미구현...)
  const [isrun, setIsrun] = useState(true);
  useEffect(() => {
    let intervalId;
    if (isrun) {
      intervalId = setInterval(() => setCount(count + 1), 60000);
      getCryptoPrice();
    }
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <div className="bg-gradient-to-b from-pivory to-sky-700 h-screen pt-10">
      <div className="flex justify-center text-4xl pt-4">
        Exchange - Binance
        <Link to="https://www.binance.com/">
          <SiBinance size={36} className="ml-1 bg-yellow-300 rounded-xl" />
        </Link>
      </div>
      <div className="flex justify-center text-2xl mt-5">
        {/* // BTC ETH 값 가져오기 */}
        {mainCryptoArray.map((v, i) => {
          if (v.symbol === "BTCUSDT" || v.symbol === "ETHUSDT")
            return (
              <Link to={`https://kr.tradingview.com/symbols/${v.symbol}/`}>
                <button
                  key={i}
                  className="bg-gray-400 border-3 border-red-200 rounded-xl p-2 m-3"
                >
                  <div>{v.symbol}</div>
                  <div>{v.lastPrice}$</div>
                  <div className="font-bold">
                    24h Change : {v.priceChangePercent}%
                  </div>
                </button>
              </Link>
            );
        })}
      </div>
      <div className="flex gap-20 mt-10 justify-center">
        <div>
          <div className="flex mb-6 text-4xl font-bold">
            Over +10% Changed In Last 24hr
            <FiTrendingUp size={35} className="ml-2 bg-blue-400 rounded-xl" />
          </div>

          <div className>
            {CryptoArray.map((v, i) => {
              if (v.priceChangePercent > 10)
                return (
                  // 트레이딩 뷰로 이동
                  <Link to={`https://kr.tradingview.com/symbols/${v.symbol}/`}>
                    <button
                      className="grid grid-cols-3 text-xl text-left pb-2 text-gray-700"
                      key={i}
                    >
                      <div className> Ticker : {v.symbol}</div>
                      <div className> Price : {v.lastPrice}$</div>
                      <div className>
                        ChangePercent : {v.priceChangePercent}%
                      </div>
                    </button>
                  </Link>
                );
            })}
          </div>
        </div>
        <div className="">
          <div className="flex mb-6 text-4xl font-bold">
            Over -10% Changed In Last 24hr
            <FiTrendingDown size={35} className="ml-2 bg-red-400 rounded-xl" />
          </div>
          <div className>
            {CryptoArray.map((v, i) => {
              if (v.priceChangePercent < -10)
                return (
                  // 트레이딩 뷰로 이동
                  <Link to={`https://kr.tradingview.com/symbols/${v.symbol}/`}>
                    <button
                      className="grid grid-cols-3 text-xl text-left pb-2 text-gray-700"
                      key={i}
                    >
                      <div className> Ticker : {v.symbol}</div>
                      <div className> Price : {v.lastPrice}$</div>
                      <div className>
                        ChangePercent : {v.priceChangePercent}%
                      </div>
                    </button>
                  </Link>
                );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-100 h-32"></div>
      <div className="flex justify-center flex-col">
        <div className="flex justify-center">Regist your wallet address !</div>
        <div className="flex justify-center">
          <input
            className="bg-gray-200 hover:bg-gray-300 m-1"
            name="address"
            placeholder="Wallet address"
            onChange={onChange}
            value={address}
          />
          <input
            className="bg-gray-200 hover:bg-gray-300 m-1"
            name="network"
            placeholder="Network"
            onChange={onChange}
            value={network}
          />
          <button
            className="bg-gray-200 hover:bg-gray-300 p-1"
            onClick={onCreate}
          >
            Regist !
          </button>
        </div>
        <div className="items-start">
          {users.map((v, i) => {
            return (
              <div key={i} className="flex justify-center font-bold">
                {v.network} : {v.address}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Crypto;
// https://bgeun2.tistory.com/28 ----> 등록하는방법 블로그
