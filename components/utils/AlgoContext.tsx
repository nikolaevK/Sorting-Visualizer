import React, { createContext, useEffect, useState } from "react";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";

interface Props {
  children: React.ReactNode;
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

const AlgoContext: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState(initialValue);
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const randomNumArray = [];
    for (let i = 0; i < settings.arrayLength; i++) {
      randomNumArray.push(Math.floor(Math.random() * 540));
    }
    setItems(randomNumArray);
  }, [settings.arrayLength]);

  const sort = (name: string) => {
    switch (name) {
      case "InsertionSort":
        const [arr, animationArray] = insertionSort(items);
        animateDivs(arr as number[], animationArray as number[][]);
        break;
      case "MergeSort":
        const animArr: number[][] = [[]];
        const sorted = mergeSort(items, animArr);
        // console.log(sorted);
        // console.log(animArr);
        animateMerge(sorted, animArr);
        break;
    }
  };

  function animateMerge(arr: number[], animationArray: number[][]) {
    animationArray.forEach(([first, second], idx) => {
      const div = document.getElementById(`${second}`);

      if (!div) return;

      setTimeout(() => {
        div.style.backgroundColor = "#000000ed";
        div.style.height = `${Math.floor(first / 7)}%`;
        setTimeout(() => {
          div.style.backgroundColor = "rgb(168, 85, 247)";
          if (idx === animationArray.length - 1) {
            setItems(arr);
          }
        }, settings.delay * 3);
      }, settings.delay * idx * 3);
    });
  }

  function animateDivs(arr: number[], animationArray: number[][]) {
    animationArray.forEach(([first, second], idx) => {
      const div = document.getElementById(`${first}`);
      const div2 = document.getElementById(`${second}`);

      if (!div || !div2) return;

      setTimeout(() => {
        div.style.backgroundColor = "#000000ed";
        div2.style.backgroundColor = "#000000ed";
        const divHeight = div.style.height;
        div.style.height = div2.style.height;
        div2.style.height = divHeight;

        setTimeout(() => {
          div.style.backgroundColor = "rgb(168, 85, 247)";
          div2.style.backgroundColor = "rgb(168, 85, 247)";

          if (idx === animationArray.length - 1) {
            setItems(arr);
          }
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
};

export default AlgoContext;
