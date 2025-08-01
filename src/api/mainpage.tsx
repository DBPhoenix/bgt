import React, { useState, useEffect, useRef } from "react";

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function SubTimer({ label }) {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    if (active) {
      interval.current = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [active]);

  return (
    <div className="flex items-center gap-4 mb-2 p-3 rounded-2xl shadow bg-white">
      <span className="font-semibold w-24">{label}</span>
      <span className="text-lg font-mono w-16">{formatTime(seconds)}</span>
      <button
        className={`px-3 py-1 rounded-xl shadow transition ${
          active ? "bg-red-200 hover:bg-red-300" : "bg-blue-200 hover:bg-blue-300"
        }`}
        onClick={() => setActive((a) => !a)}
      >
        {active ? "Pause" : "Start"}
      </button>
      <button
        className="px-2 py-1 bg-gray-100 rounded-xl ml-2 hover:bg-gray-200"
        onClick={() => { setSeconds(0); setActive(false); }}
      >
        Reset
      </button>
    </div>
  );
}

export default function TimerPage() {
  const [mainSeconds, setMainSeconds] = useState(0);
  const [mainActive, setMainActive] = useState(true);
  const interval = useRef(null);

  useEffect(() => {
    if (mainActive) {
      interval.current = setInterval(() => {
        setMainSeconds((sec) => sec + 1);
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [mainActive]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Main Timer</h1>
        <div className="text-6xl font-mono mb-4">{formatTime(mainSeconds)}</div>
        <button
          className={`mb-8 px-6 py-2 rounded-xl font-semibold shadow transition ${
            mainActive ? "bg-red-300 hover:bg-red-400" : "bg-green-300 hover:bg-green-400"
          }`}
          onClick={() => setMainActive((a) => !a)}
        >
          {mainActive ? "Pause" : "Resume"}
        </button>
        <div className="w-full">
          <SubTimer label="Sub Timer 1" />
          <SubTimer label="Sub Timer 2" />
          <SubTimer label="Sub Timer 3" />
        </div>
      </div>
    </div>
  );
}
