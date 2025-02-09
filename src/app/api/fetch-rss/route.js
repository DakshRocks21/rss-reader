// Written by Daksh

import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:group", "mediaGroup"],
      ["media:content", "mediaContent"],
    ],
  },
});

function extractBestImage(mediaGroup) {
  if (!mediaGroup || !Array.isArray(mediaGroup)) return null;

  const mediaImages = mediaGroup
    .filter((content) => content.$?.medium === "image")
    .sort(
      (a, b) =>
        (b.$?.width || 0) * (b.$?.height || 0) -
        (a.$?.width || 0) * (a.$?.height || 0)
    );

  return mediaImages[0]?.$?.url || null;
}

function extractImageFromContent(content) {
  if (!content) return null;

  const urlMatch = content.match(/https?:\/\/[^\s"]+\.(jpg|jpeg|png|gif)/i);
  return urlMatch ? urlMatch[0] : null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const feedUrl = searchParams.get("feedUrl");

  if (!feedUrl) {
    return NextResponse.json(
      { error: "Feed URL is required" },
      { status: 400 }
    );
  }

  try {
    const feed = await parser.parseURL(feedUrl);

    feed.items = feed.items.map((item) => {
      if (!item.image) {
        item.image =
          extractBestImage(item.mediaGroup) ||
          extractImageFromContent(item.content) ||
          extractImageFromContent(item["content:encoded"]); 
      }


      return item;
    });
    return NextResponse.json(feed, { status: 200 });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSS feed", details: error.message },
      { status: 500 }
    );
  }
}
