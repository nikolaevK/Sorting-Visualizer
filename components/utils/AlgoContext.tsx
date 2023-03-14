import React, { createContext, useEffect, useState } from "react";
import { insertionSort } from "../algorithms/insertionSort";

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
        animateDivs(arr, animationArray);
        break;
      case "MergeSort":
        break;
    }
  };

  const animateDivs = (arr: number[], animationArray: number[][]) => {
    animationArray.forEach(([first, second], idx) => {
      const div1 = document.getElementById(`${first}`);
      const div2 = document.getElementById(`${second}`);

      if (!div1 || !div2) return;

      setTimeout(() => {
        div1.style.backgroundColor = "#f10f6211fo";
        div2.style.backgroundColor = "#f10f6211fo";
        const divHeight = div1.style.height;
        div1.style.height = div2.style.height;
        div2.style.height = divHeight;

        setTimeout(() => {
          div1.style.backgroundColor = "rgb(168, 85, 247)";
          div2.style.backgroundColor = "rgb(168, 85, 247)";

          if (idx === animationArray.length - 1) {
            setItems(arr);
          }
        }, settings.delay * 5);
      }, settings.delay * idx * 5);
    });
  };

  return (
    <itemsContext.Provider value={{ items, setItems }}>
      <settingContext.Provider value={{ sort, settings, setSettings }}>
        {children}
      </settingContext.Provider>
    </itemsContext.Provider>
  );
};

export default AlgoContext;
