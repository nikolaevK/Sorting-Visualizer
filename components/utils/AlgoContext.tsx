import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface Settings {
  algoName: string;
  arrayLength: number;
  delay: number;
}

const initialValue: Settings = {
  algoName: "merge sort",
  arrayLength: 25,
  delay: 15,
};

interface SettingContext {
  settings: Settings;
  setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
}

export const settingContext = createContext<SettingContext>({
  settings: initialValue,
});

const AlgoContext: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState(initialValue);

  return (
    <settingContext.Provider value={{ settings, setSettings }}>
      {children}
    </settingContext.Provider>
  );
};

export default AlgoContext;
