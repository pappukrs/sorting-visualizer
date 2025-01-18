'use client';
import { useState, useEffect } from "react";
import {
  bubbleSort,
  selectionSort,
  quickSort,
  insertionSort,
  mergeSort,
  heapSort,
} from "../lib/sortingAlgorithms";

const algorithms = [
  {
    name: "Bubble Sort",
    func: bubbleSort,
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Selection Sort",
    func: selectionSort,
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Quick Sort",
    func: quickSort,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
  },
  {
    name: "Insertion Sort",
    func: insertionSort,
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Merge Sort",
    func: mergeSort,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
  },
  {
    name: "Heap Sort",
    func: heapSort,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
  },
];

export default function SortingVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [compareAlgorithm1, setCompareAlgorithm1] = useState(algorithms[0]);
  const [compareAlgorithm2, setCompareAlgorithm2] = useState(algorithms[1]);
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [animations, setAnimations] = useState([]);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [compareResult, setCompareResult] = useState(null);

  const generateArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 300 + 50)
    );
    setArray(newArray);
    setAnimations([]);
    setCurrentIndices([]);
    setTimeTaken(null);
    setCompareResult(null);
  };

  const startSorting = () => {
    if (isSorting) return;
    const sortingFunction = selectedAlgorithm.func;
    const tempArray = [...array];

    const startTime = performance.now();
    const anims = sortingFunction(tempArray);
    const endTime = performance.now();

    setAnimations(anims);
    setTimeTaken((endTime - startTime).toFixed(2));
    setIsSorting(true);

    anims.forEach(([i, j, isSwap], index) => {
      setTimeout(() => {
        setCurrentIndices([i, j]);
        if (isSwap) {
          setArray((prevArray) => {
            const newArray = [...prevArray];
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            return newArray;
          });
        }
      }, index * 300);
    });

    setTimeout(() => {
      setIsSorting(false);
      setCurrentIndices([]);
    }, anims.length * 300);
  };

  const compareAlgorithms = () => {
    if (isSorting) return;

    const tempArray1 = [...array];
    const tempArray2 = [...array];

    const startTime1 = performance.now();
    compareAlgorithm1.func(tempArray1);
    const endTime1 = performance.now();

    const startTime2 = performance.now();
    compareAlgorithm2.func(tempArray2);
    const endTime2 = performance.now();

    setCompareResult({
      algo1: {
        name: compareAlgorithm1.name,
        timeTaken: (endTime1 - startTime1).toFixed(2),
        timeComplexity: compareAlgorithm1.timeComplexity,
        spaceComplexity: compareAlgorithm1.spaceComplexity,
      },
      algo2: {
        name: compareAlgorithm2.name,
        timeTaken: (endTime2 - startTime2).toFixed(2),
        timeComplexity: compareAlgorithm2.timeComplexity,
        spaceComplexity: compareAlgorithm2.spaceComplexity,
      },
    });
  };

  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Algorithms</h2>
        <ul className="space-y-2">
          {algorithms.map((algo) => (
            <li key={algo.name}>
              <button
                onClick={() => setSelectedAlgorithm(algo)}
                className={`block w-full text-left p-2 rounded ${
                  selectedAlgorithm.name === algo.name
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {algo.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Compare Functionality */}
        <div className="p-4 bg-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Sorting Visualizer</h1>
          </div>
          <div className="flex gap-4">
            <select
              className="p-2 bg-white border rounded"
              value={compareAlgorithm1.name}
              onChange={(e) =>
                setCompareAlgorithm1(
                  algorithms.find((algo) => algo.name === e.target.value)
                )
              }
            >
              {algorithms.map((algo) => (
                <option key={algo.name} value={algo.name}>
                  {algo.name}
                </option>
              ))}
            </select>
            <select
              className="p-2 bg-white border rounded"
              value={compareAlgorithm2.name}
              onChange={(e) =>
                setCompareAlgorithm2(
                  algorithms.find((algo) => algo.name === e.target.value)
                )
              }
            >
              {algorithms.map((algo) => (
                <option key={algo.name} value={algo.name}>
                  {algo.name}
                </option>
              ))}
            </select>
            <button
              onClick={compareAlgorithms}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Compare
            </button>
          </div>
        </div>

        {/* Comparison Results */}
        {compareResult && (
          <div className="p-4 bg-white shadow m-4 rounded">
            <h2 className="text-xl font-bold mb-4">Comparison Results</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold">{compareResult.algo1.name}</h3>
                <p>Time Taken: {compareResult.algo1.timeTaken} ms</p>
                <p>Time Complexity: {compareResult.algo1.timeComplexity}</p>
                <p>Space Complexity: {compareResult.algo1.spaceComplexity}</p>
              </div>
              <div>
                <h3 className="font-bold">{compareResult.algo2.name}</h3>
                <p>Time Taken: {compareResult.algo2.timeTaken} ms</p>
                <p>Time Complexity: {compareResult.algo2.timeComplexity}</p>
                <p>Space Complexity: {compareResult.algo2.spaceComplexity}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sorting Visualizer */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedAlgorithm.name}</h2>
          <div className="flex justify-center items-end h-64 gap-1 bg-white shadow rounded p-4">
            {array.map((value, index) => (
              <div
                key={index}
                className={`w-6 transition-all duration-300 ${
                  currentIndices.includes(index) ? "bg-red-500" : "bg-blue-500"
                }`}
                style={{ height: `${value}px` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-gray-200 flex justify-between">
          <button
            onClick={generateArray}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={isSorting}
          >
            Generate New Array
          </button>
          <button
            onClick={startSorting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isSorting}
          >
            Start Sorting
          </button>
        </div>
      </div>
    </div>
  );
}
