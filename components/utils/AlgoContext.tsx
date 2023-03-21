import React, { createContext, ReactNode, useEffect, useState } from "react";
import { bubbleSort } from "../algorithms/bubbleSort";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";
import { radixSort } from "../algorithms/radixSort";
import { selectionSort } from "../algorithms/selectionSort";

interface AlgoContextProvider {
  children: ReactNode;
}

// State is going to be initially
const initialValue: Settings = {
  algoName: "MergeSort",
  arrayLength: 25,
  delay: 15,
};

interface Settings {
  algoName: string;
  arrayLength: number;
  delay: number;
}

interface SettingContext {
  settings: Settings;
  setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
  sort: (name: string) => void;
  traverse: (array: number[], algorithmName: string) => void;
}

interface ItemsContext {
  items: number[];
  nodes: number[];
  setItems?: React.Dispatch<React.SetStateAction<number[]>>;
}

// Setting global context to assign settings
export const settingContext = createContext<SettingContext>({
  settings: initialValue,
  sort: (name: string) => {},
  traverse: (array: number[], algorithmName: string) => {},
});

// Creating a random array of numbers to sort
export const itemsContext = createContext<ItemsContext>({
  items: [],
  nodes: [],
});

export function AlgoContext({ children }: AlgoContextProvider) {
  const [settings, setSettings] = useState(initialValue);
  const [items, setItems] = useState<number[]>([]);
  const [nodes, setNodes] = useState<number[]>([]);

  // setting items array depending on the input from the length slider
  // updates every time slider is moved
  useEffect(() => {
    // Items for sorting algorithms
    const randomNumArray = [];
    for (let i = 0; i < settings.arrayLength; i++) {
      randomNumArray.push(Math.floor(Math.random() * 513));
    }
    setItems(randomNumArray);

    // Nodes for graph traversal
    const nodesArray = [];
    for (let i = 0; i < 16; i++) {
      nodesArray.push(i);

      const div = document.getElementById(`${i}`);
      if (div) div.style.backgroundColor = "transparent";
    }
    setNodes(nodesArray);
  }, [settings.arrayLength, settings.delay, settings.algoName]);

  function sort(name: string) {
    switch (name) {
      case "InsertionSort":
        const { insertionArr, animationInsertionArray } = insertionSort(items);
        // arr is optional and sorted array for state change if needed
        // not needed for animation
        animationSwap(insertionArr, animationInsertionArray);
        break;
      case "MergeSort":
        const animArr: number[][] = [];
        const sorted = mergeSort(items, animArr);
        // sorted is needed for new sorted items array if needed
        // not needed for animation
        animateIndexChange(sorted, animArr);
        break;
      case "BubbleSort":
        const { bubbleArr, animationBubbleArray } = bubbleSort(items);
        animationSwap(bubbleArr, animationBubbleArray);
        break;
      case "SelectionSort":
        const { selectionArr, animationSelectionArray } = selectionSort(items);
        animationSwap(selectionArr, animationSelectionArray);
        break;
      case "QuickSort":
        const quickSortAnimationArr: number[][] = [];
        const quickSortArray = quickSort(items, quickSortAnimationArr);
        animationSwap(quickSortArray, quickSortAnimationArr);
        break;
      case "RadixSort":
        const { radixSortArray, animationRadixArray } = radixSort(items);
        animateIndexChange(radixSortArray, animationRadixArray);
        break;
    }
  }

  function animateIndexChange(arr: number[], animationArray: number[][]) {
    animationArray.forEach(([value, index], animIndex) => {
      const div = document.getElementById(`${index}`);

      if (!div) return;
      // changing the DOM but not the actual state
      setTimeout(() => {
        div.style.backgroundColor = "#000000ed";
        div.style.height = `${Math.floor(value / 7)}%`;
        setTimeout(() => {
          div.style.backgroundColor = "rgb(168, 85, 247)";
          // if (animIndex === animationArray.length - 1) {
          //   setItems(arr);
          // }
          // optional for a state change
        }, settings.delay * 3);
      }, settings.delay * animIndex * 3);
    });
  }

  function animationSwap(arr: number[], animationArray: number[][]) {
    animationArray.forEach(([first, second], idx) => {
      const div = document.getElementById(`${first}`);
      const div2 = document.getElementById(`${second}`);

      if (!div || !div2) return;
      // changing the DOM but not the actual state
      setTimeout(() => {
        div.style.backgroundColor = "#000000ed";
        div2.style.backgroundColor = "#000000ed";

        // swap hights since elements were swapped in InsertionSort
        const divHeight = div.style.height;

        div.style.height = div2.style.height;
        div2.style.height = divHeight;

        setTimeout(() => {
          div.style.backgroundColor = "rgb(168, 85, 247)";
          div2.style.backgroundColor = "rgb(168, 85, 247)";

          //   if (idx === animationArray.length - 1) {
          //     setItems(arr);
          //   }
          // optional for a state change
        }, settings.delay * 3);
      }, settings.delay * idx * 3);
    });
  }

  function traverse(array: number[], algorithmName: string) {
    switch (algorithmName) {
      case "BFS":
        animateBFS_DFS(array);
        break;
      case "DFS":
        animateBFS_DFS(array);
        break;
    }
  }

  function animateBFS_DFS(arrayBFS_DFS: number[]) {
    arrayBFS_DFS.forEach((value, idx) => {
      const div = document.getElementById(`${value}`);

      if (!div) return;

      setTimeout(() => {
        div.style.backgroundColor = "rgb(168, 85, 247)";

        setTimeout(() => {
          if (div.id === "0") {
            div.style.backgroundColor = "rgb(168, 85, 247)";
          } else {
            div.style.backgroundColor = "rgb(216 180 254)";
          }
        }, settings.delay * 10);
      }, settings.delay * idx * 10);
    });
  }

  return (
    <itemsContext.Provider value={{ items, nodes, setItems }}>
      <settingContext.Provider
        value={{ sort, traverse, settings, setSettings }}
      >
        {children}
      </settingContext.Provider>
    </itemsContext.Provider>
  );
}

export default AlgoContext;
