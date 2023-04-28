import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Community() {
  const [content, setContent] = useState();
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState();

  const onClickSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!content) {
        alert("Please Input Qeustion !");
        return;
      }

      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/chat`,
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        }
      );
      setResult(response.data.result);
      setIsLoading(false);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_SECRET_KEY);
  }, []);

  return (
    <div className="bg-gradient-to-b from-pivory to-gray-800 h-screen pt-10">
      <div className="flex justify-center">
        <form>
          <input
            placeholder="Question"
            disabled={isLoading}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            className="ml-2 border-3 font-bold  border-pivory"
            type="submit"
            disabled={isLoading}
            onClick={onClickSubmit}
            value={isLoading ? "Searching..." : "Searching"}
          />
        </form>
      </div>
      <div className="flex justify-center items-center  text-2xl font-bold p-64">
        {result ? result : "Hello! How can I assist you today?"}
      </div>
    </div>
  );
}

export default Community;
