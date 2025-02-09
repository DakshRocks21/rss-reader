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

/**
 * Extract the 'best' (largest) image from media groups, if present.
 */
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

/**
 * Extract the first image URL in the textual content that matches standard
 * image file extensions like jpg, jpeg, png, gif.
 */
function extractImageFromContent(content) {
  if (!content) return null;

  const urlMatch = content.match(/https?:\/\/[^\s"]+\.(jpg|jpeg|png|gif)/i);
  return urlMatch ? urlMatch[0] : null;
}

/**
 * Extract the enclosure URL if it's an image.
 */
function extractEnclosureImage(enclosure) {
  // `<enclosure url="..." type="image/jpeg" />`
  if (enclosure && enclosure.type?.startsWith("image/")) {
    return enclosure.url;
  }
  return null;
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
          extractEnclosureImage(item.enclosure) ||
          extractBestImage(item.mediaGroup) ||
          extractImageFromContent(item.content) ||
          extractImageFromContent(item["content:encoded"]);
      }

      return item;
    });

    return NextResponse.json(feed, { status: 200 });
  } catch (error) {
    console.log("Error fetching RSS feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSS feed", details: error.message },
      { status: 500 }
    );
  }
}
