//Puru and Daksh wrote this
"use client";

import { useEffect, useState } from "react";
import { SegmentedButton, SegmentedButtonSet } from "actify";
import { FaMoon, FaSun } from "react-icons/fa";


const ThemeControl = ({ initialTheme = "system", onThemeChange }) => {
  const [selectedColorMode, setSelectedColorMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme;
      }
    }


    return initialTheme === "system" ? "dark" : initialTheme;
  });

  useEffect(() => {
    if (selectedColorMode === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else if (selectedColorMode === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (selectedColorMode === "system") {
      document.body.classList.remove("dark", "light");
      document.documentElement.classList.remove("dark", "light");
      localStorage.removeItem("theme");
    }

    if (onThemeChange) {
      onThemeChange(selectedColorMode);
    }
  }, [selectedColorMode, onThemeChange]);

  return (
    <SegmentedButtonSet role="presentation" className="w-full" aria-label="Color mode">
      <div role="group" className="h-10 grid w-full grid-flow-col auto-rows-auto auto-cols-[1fr]">
        <SegmentedButton
          title="dark"
          data-value="dark"
          className="rounded-l-full text-on-primary-container"
          selected={selectedColorMode === "dark"}
          icon={<FaMoon />}
          onPress={() => setSelectedColorMode("dark")}
        />
        <SegmentedButton
          title="light"
          data-value="light"
          className="rounded-r-full text-on-primary-container"
          selected={selectedColorMode === "light"}
          icon={<FaSun />}
          onPress={() => setSelectedColorMode("light")}
        />
        {/* 
          If you want to support a system option in the UI, you can uncomment the code below.
          <SegmentedButton
            title="system"
            data-value="system"
            className="text-black"
            selected={selectedColorMode === "system"}
            onPress={() => setSelectedColorMode("system")}
          />
        */}
      </div>
    </SegmentedButtonSet>
  );
};

export default ThemeControl;
