// Puru Wrote This

import { useState,useEffect } from "react";
export function setTheme(){
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
          document.body.classList.add(storedTheme);
          document.body.classList.remove(storedTheme === "dark" ? "light" : "dark");
        }
      }, []);
}