// Puru Wrote This
// Used as a function to set the theme in each page
import { useState,useEffect } from "react";
export function setTheme(){
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");// gets the theme from local storage
        if (storedTheme) {
          document.body.classList.add(storedTheme);// Adds the new theme and removes old theme
          document.body.classList.remove(storedTheme === "dark" ? "light" : "dark");
        }
      }, []);
}