import { Link } from "react-router-dom";

const Nft1 = ({ tokenId, metadata, mintedNft }) => {
  console.log(metadata);
  return (
    <div className="flex justify-center max-h-screen bg-gray-800">
      <div className="flex max-h-screen bg-gray-800 pb-10 pl-8">
        {parseInt(mintedNft) < tokenId && <div className="">Not Minted!</div>}
        <img className="" src={metadata.image} alt={metadata.name} />
        <div className="text-white pl-6 flex items-center gap-10">
          <div className="text-2xl ">INTP# {tokenId}</div>
          <Link to={`${tokenId}`}>
            <button
              disabled={parseInt(mintedNft) < tokenId}
              className="border-2 rounded-xl w-20 h-10"
            >
              Detail
            </button>
          </Link>
          <div>
            {metadata.attributes.map((v, i) => {
              return (
                <li key={i} className="flex gap-9">
                  <div>
                    {v.trait_type} : {v.value}
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nft1;
