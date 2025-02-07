// Puru Wrote This

"use client";
import { useEffect } from "react";

export function useApplyStoredTheme() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
          document.body.classList.add(storedTheme);
          document.body.classList.remove(storedTheme === "dark" ? "light" : "dark");
        }
      }, []);
}
