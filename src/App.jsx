import { BrowserRouter, Routes, Route, useActionData } from "react-router-dom";
import { useState } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Crypto from "./pages/Crypto";
import Nft from "./pages/Nft";
import Game from "./pages/Game";
import Community from "./pages/Community";
import Detail from "./pages/Detail";
import Myaccount from "./pages/Myaccount";

function App() {
  const [account, setAccount] = useState();
  const [users, setUsers] = useState([
    {
      id: 1,
      address: "0x9d8E21A936D09Ffdd2963B0795Af581849D849Ab",
      network: "Metamask",
    },
    {
      id: 2,
      address: "1DcdokjQ2JNnxYN3DV5sQPrgdFJZcFb7wP",
      network: "Binance Bitcoin",
    },
  ]);

  return (
    <BrowserRouter>
      <div>
        <Header account={account} setAccount={setAccount} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/Crypto"
            element={<Crypto users={users} setUsers={setUsers} />}
          />
          <Route
            path="/Nft"
            element={<Nft account={account} users={users} />}
          />
          <Route path="/Game" element={<Game />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/:tokenId" element={<Detail />} />
          <Route
            path="/Myaccount"
            element={<Myaccount account={account} users={users} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
