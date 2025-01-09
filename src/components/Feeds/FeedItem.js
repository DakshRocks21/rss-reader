// Daksh wrote this
"use client"
import React from "react";
import ReactMarkdown from "react-markdown";

export default function FeedItem({ item, category }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 relative">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover rounded-t-md mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-md mb-4">
          <span className="text-gray-500 text-sm">No Image Available</span>
        </div>
      )}

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-blue-600 hover:underline block mb-2"
      >
        {item.title}
      </a>

      <div className="text-gray-700 text-sm leading-relaxed line-clamp-4">
        {item.content ? (
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        ) : (
          <ReactMarkdown>{item.contentSnippet || ""}</ReactMarkdown>
        )}
      </div>

      <span className="text-gray-500 text-xs block mt-2">
        {new Date(item.pubDate).toLocaleString()}
      </span>
      

      <span className="absolute top-2 right-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
        {category || "Uncategorized"}
      </span>
    </div>
  );
}
