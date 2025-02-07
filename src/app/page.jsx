"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Button,
} from "actify";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function LandingPage() {
  return (
    // Animate the overall container on page load
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-surface min-h-screen flex flex-col justify-center items-center"
    >
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex-grow flex flex-col items-center justify-center p-6 text-center mt-10 h-[70vh]"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold text-on-surface"
        >
          Welcome to <span className="text-primary">RSSFeed</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-on-surface-variant mt-4"
        >
          Stay updated with the latest content from your favorite sources.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6"
        >
          <Button
            href="/login"
            variant="filled"
            color="primary"
            className="px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200 z-0"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="max-w-4xl mx-auto my-12 p-6 bg-tertiary-container shadow-lg rounded-2xl"
      >
        <h2 className="text-3xl font-semibold text-on-tertiary-container text-center mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion open={[, true]}>
          <AccordionItem>
            <AccordionHeader className="text-on-tertiary-container">
              What is RSSFeed?
            </AccordionHeader>
            <AccordionContent className="text-on-tertiary-container">
              RSSFeed is a platform that helps you stay updated with the latest
              articles and blogs from your favorite sources.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader className="text-on-tertiary-container">
              Is RSSFeed free to use?
            </AccordionHeader>
            <AccordionContent className="text-on-tertiary-container">
              Yes! RSSFeed is completely free to use, and you can follow as many
              sources as you like.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader className="text-on-secondary-container">
              How do I get started?
            </AccordionHeader>
            <AccordionContent className="text-on-secondary-container">
              Simply click the "Get Started" button above, create an account,
              and start following your favorite feeds!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="bg-secondary-container text-on-secondary-container py-4 text-center w-full"
      >
        <p>© 2025 RSSFeed. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  );
}
