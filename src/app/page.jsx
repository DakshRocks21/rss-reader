"use client";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Icon,
} from "actify";
import { Avatar } from "actify";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-surface min-h-screen flex flex-col justify-center items-center">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center mt-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface animate-fade-up">
          Welcome to <span className="text-primary">RSSFeed</span>
        </h1>
        <p className="text-xl md:text-2xl text-on-surface-variant mt-4 animate-fade-up">
          Stay updated with the latest content from your favorite sources.
        </p>
        <Link
          href="/login"
          className="mt-6 bg-primary-container text-on-primary-container px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Get Started
        </Link>
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto my-12 p-6 bg-secondary-container shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-on-secondary-container text-center mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion open={[, true]}>
          <AccordionItem>
            <AccordionHeader className="text-on-secondary-container">
              What is RSSFeed?
            </AccordionHeader>
            <AccordionContent className="text-on-secondary-container">
              RSSFeed is a platform that helps you stay updated with the latest
              articles and blogs from your favorite sources.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader className="text-on-secondary-container">
              Is RSSFeed free to use?
            </AccordionHeader>
            <AccordionContent className="text-on-secondary-container">
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

      {/* Authors Section */}
      <section className="max-w-6xl min-w-[30rem] flex items-center justify-center flex-col my-12 p-6 bg-tertiary-container shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-on-tertiary-container text-center mb-6">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Author 1 */}
          <div className="flex flex-col items-center">
            <Avatar
              className="w-24 h-24"
              src="https://api.slingacademy.com/public/sample-photos/1.jpeg"
              alt="Daksh"
            />
            <h3 className="text-xl font-semibold mt-4 text-on-tertiary-container">
              Daksh Thapar
            </h3>
            <p className="text-on-tertiary-container text-center">
              Landing, Login, Home, Mobile
            </p>
          </div>
          {/* Author 2 */}
          <div className="flex flex-col items-center">
            <Avatar
              className="w-24 h-24"
              src="https://api.slingacademy.com/public/sample-photos/2.jpeg"
              alt="Gulati Puru Raj"
            />
            <h3 className="text-xl font-semibold mt-4 text-on-tertiary-container">
              Gulati Puru Raj
            </h3>
            <p className="text-on-tertiary-container text-center">Settings</p>
          </div>
          {/* Author 3 */}
          <div className="flex flex-col items-center">
            <Avatar
              className="w-24 h-24"
              src="https://api.slingacademy.com/public/sample-photos/3.jpeg"
              alt="Tan Chin Ray"
            />
            <h3 className="text-xl font-semibold mt-4 text-on-tertiary-container">
              Tan Chin Ray
            </h3>
            <p className="text-on-tertiary-container text-center">Interests</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-inverse-surface text-on-inverse-surface py-4 text-center w-full">
        <p>© 2025 RSSFeed. All rights reserved.</p>
      </footer>
    </div>
  );
}
