"use client";

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
    <div className="bg-surface min-h-screen flex flex-col justify-center items-center">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center mt-10 h-[70vh]">
        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface animate-fade-up">
          Welcome to <span className="text-primary">RSSFeed</span>
        </h1>
        <p className="text-xl md:text-2xl text-on-surface-variant mt-4 animate-fade-up">
          Stay updated with the latest content from your favorite sources.
        </p>
        <Button
          href="/login"
          variant="filled"
          color="primary"
          className="mt-6 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200 z-0"
        >
          Get Started
        </Button>
      </div>

      <section className="max-w-4xl mx-auto my-12 p-6 bg-tertiary-container shadow-lg rounded-2xl">
        <h2 className="text-3xl font-semibold text-on-tertiary-container text-center mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion open={[, true]}>
          <AccordionItem >
            <AccordionHeader className="text-on-tertiary-container" >
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
      </section>

      {/* Footer */}
      <footer className="bg-secondary-container text-on-secondary-container py-4 text-center w-full">
        <p>© 2025 RSSFeed. All rights reserved.</p>
      </footer>
    </div>
  );
}
