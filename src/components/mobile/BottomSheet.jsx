// Made by Daksh

"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


export default function BottomSheet({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed bottom-0 left-0 w-full bg-secondary-container rounded-t-lg shadow-lg z-50 max-h-3/4 overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center p-4 border-b text-on-primary-container ">
              <h2 className="font-semibold text-2xl">Filters</h2>
              <button onClick={onClose} aria-label="Close Bottom Sheet">
                <FaTimes className="text-on-secondary-container text-xl" />
              </button>
            </div>

            <div className="p-4">
              {children}
            </div>
            <div className="h-20"></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
