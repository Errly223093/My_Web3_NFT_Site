import { useEffect, useState } from "react";

const Game = () => {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [lapArray, setLapArray] = useState([]);

  const hour = Math.floor(time / 3600000)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((time / 60000) % 60)
    .toString()
    .padStart(2, "0");
  const second = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const msecond = Math.floor(time / 10) % 100;

  function formattedTime(time) {
    const hour = Math.floor(time / 3600000)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((time / 60000) % 60)
      .toString()
      .padStart(2, "0");
    const second = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const msecond = Math.floor(time / 10) % 100;
    return (
      <div>
        {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}:
        {second.toString().padStart(2, "0")}:
        {msecond.toString().padStart(2, "0")}
      </div>
    );
  }

  // 타이머
  useEffect(() => {
    let intervalId;
    // isStart 가 true. 즉 작동하고 있을때만 인터벌 시간 ++
    if (isStart) {
      intervalId = setInterval(() => setTime(time + 10), 10);
    }
    return () => clearInterval(intervalId);
  }, [isStart, time]);

  // 버튼기능
  const onClickStart = () => {
    setIsStart(!isStart);
  };

  const onClickReset = () => {
    setTime(0);
    setLapArray([]);
    setIsStart(false);
  };

  const onClickLap = () => {
    lapArray.push(time);
    console.log(lapArray);
    return lapArray;
  };

  return (
    <div className="bg-gradient-to-b from-pivory to-gray-800 min-h-screen flex flex-col items-center">
      <div className="flex justify-center flex-col mt-20 text-2xl">
        <div>Make 10 lap in 0.9 sec !</div>
        <div>Make 20 lap in 0.8 sec !</div>
        <div>Make 30 lap in 0.7 sec !</div>
      </div>
      {isStart === true ? (
        <div className="mt-20 text-black text-4xl">
          {hour}:{minute}:{second}:{msecond}
        </div>
      ) : (
        <div className="mt-20 text-black text-4xl">
          {hour}:{minute}:{second}:{msecond}
        </div>
      )}
      <div>
        {isStart === false ? (
          <button
            onClick={onClickStart}
            className="mt-10 mr-40 text-3xl p-1 rounded border-2 bg-green-300 border-green-100"
          >
            start
          </button>
        ) : (
          <>
            <button
              onClick={onClickStart}
              className="mt-10 mr-40 text-3xl p-1 rounded border-2 bg-red-300 border-green-100"
            >
              stop
            </button>
            <button
              onClick={onClickLap}
              className="t-10 mr-40 text-3xl p-1 rounded border-2 bg-gray-500 border-green-100"
            >
              Lap
            </button>
          </>
        )}
        <button
          className="mt-10 text-3xl p-1 rounded border-2 bg-blue-300 border-blue-100"
          onClick={onClickReset}
        >
          reset
        </button>
      </div>
      <div>
        {lapArray.map((v, i) => {
          return (
            <div className="flex justify-center text-left">
              <div className="mr-3">Lap {i + 1} : </div>
              <div>{formattedTime(v)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;

//        {hour === "NaN" ? "00" : hour}:{minute === "NaN" ? "00" : minute}:
// {second === "NaN" ? "00" : second}:{msecond}
