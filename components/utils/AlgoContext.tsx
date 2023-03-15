import React, { createContext, ReactNode, useEffect, useState } from "react";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";

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
}

interface ItemsContext {
  items: number[];
  setItems?: React.Dispatch<React.SetStateAction<number[]>>;
}

// Setting global context to assign settings
export const settingContext = createContext<SettingContext>({
  settings: initialValue,
  sort: (name: string) => {},
});

// Creating a random array of numbers to sort
export const itemsContext = createContext<ItemsContext>({
  items: [],
});

export function AlgoContext({ children }: AlgoContextProvider) {
  const [settings, setSettings] = useState(initialValue);
  const [items, setItems] = useState<number[]>([]);

  // setting items array depending on the input from the length slider
  // updates every time slider is moved
  useEffect(() => {
    const randomNumArray = [];
    for (let i = 0; i < settings.arrayLength; i++) {
      randomNumArray.push(Math.floor(Math.random() * 513));
    }
    setItems(randomNumArray);
  }, [settings.arrayLength]);

  function sort(name: string) {
    switch (name) {
      case "InsertionSort":
        const [arr, animationArray] = insertionSort(items);
        // arr is optional and sorted array for state change if needed
        // not needed for animation
        animateInsertionSort(arr as number[], animationArray as number[][]);
        break;
      case "MergeSort":
        const animArr: number[][] = [];
        const sorted = mergeSort(items, animArr);
        // sorted is needed for new sorted items array if needed
        // not needed for animation
        animateMerge(sorted, animArr);
        break;
    }
  }

  function animateMerge(arr: number[], animationArray: number[][]) {
    animationArray.forEach(([value, index], animIndex) => {
      const div = document.getElementById(`${index}`);

      if (!div) return;
      // changing the DOM but not the actual state
      setTimeout(() => {
        div.style.backgroundColor = "#000000ed";
        div.style.height = `${Math.floor(value / 7)}%`;
        setTimeout(() => {
          div.style.backgroundColor = "rgb(168, 85, 247)";
          //   if (idx === animationArray.length - 1) {
          //     setItems(arr);
          //   }
          // optional for a state change
        }, settings.delay * 3);
      }, settings.delay * animIndex * 3);
    });
  }

  function animateInsertionSort(arr: number[], animationArray: number[][]) {
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

  return (
    <itemsContext.Provider value={{ items, setItems }}>
      <settingContext.Provider value={{ sort, settings, setSettings }}>
        {children}
      </settingContext.Provider>
    </itemsContext.Provider>
  );
}

export default AlgoContext;
