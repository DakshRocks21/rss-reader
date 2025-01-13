"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function FeedItem({ item, categories }) {
  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-300 relative transform hover:scale-105 duration-200">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center rounded-lg mb-4">
          <span className="text-gray-600 text-sm font-medium">
            No Image Available
          </span>
        </div>
      )}

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-semibold text-blue-600 hover:text-blue-800 hover:underline block mb-2"
      >
        {item.title}
      </a>

      <div className="text-gray-600 text-sm leading-relaxed line-clamp-4">
        {item.content ? (
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        ) : (
          <ReactMarkdown>{item.contentSnippet || ""}</ReactMarkdown>
        )}
      </div>

      <span className="text-gray-500 text-xs block mt-3">
        {new Date(item.pubDate).toLocaleString()}
      </span>

      {categories && (
        <div className="absolute top-2 right-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category+item.title}
              className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-md"
            >
              {category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
