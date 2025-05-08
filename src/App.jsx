import { useState } from "react";
import "./index.css";

export default function App() {
  const [year, setYear] = useState(160);
  const [pressure, setPressure] = useState(30);
  const [em1Ratio, setEm1Ratio] = useState(30);
  const [himuRatio, setHimuRatio] = useState(70);
  const [status, setStatus] = useState("🌋 Volcano is stable");

  function nextTurn(action) {
    const newYear = year - 10;
    let newPressure = pressure;
    let newEm1 = em1Ratio;
    let newHimu = himuRatio;

    if (action === "release") {
      newPressure = Math.max(pressure - 15, 0);
    } else if (action === "seal") {
      newPressure = Math.min(pressure + 10, 100);
    } else if (action === "deepen") {
      newEm1 = Math.min(em1Ratio + 5, 100);
      newHimu = Math.max(himuRatio - 5, 0);
    }

    if (newPressure >= 80) {
      setStatus("⚠️ High pressure! Collapse risk is critical");
    } else if (newPressure <= 20) {
      setStatus("🟢 Pressure well released");
    } else {
      setStatus("🌋 Volcano is stable");
    }

    setYear(newYear);
    setPressure(newPressure);
    setEm1Ratio(newEm1);
    setHimuRatio(newHimu);
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-xl font-bold">Volcano Guardian: Fate of Fogo Island</h1>
        <p>Year: {year},000 BC</p>
        <p className="text-sm text-gray-600">{status}</p>
        <div className="mt-4">
          <label className="block mb-1">🌡️ Magma Pressure</label>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{ width: `${pressure}%` }}
            ></div>
          </div>
          <p className="mt-2">🧪 HIMU: {himuRatio}% | EM1: {em1Ratio}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button onClick={() => nextTurn("release")} className="bg-blue-500 text-white px-4 py-2 rounded">Release Magma</button>
        <button onClick={() => nextTurn("seal")} className="bg-yellow-500 text-white px-4 py-2 rounded">Seal Shallow Reservoir</button>
        <button onClick={() => nextTurn("deepen")} className="bg-green-600 text-white px-4 py-2 rounded">Deepen Mantle Channel</button>
      </div>
    </div>
  );
}
