// Daksh wrote this
import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { format, isValid } from "date-fns";

const parser = new Parser({
  customFields: {
    item: [
      ["media:group", "mediaGroup"],
      ["media:content", "mediaContent"],
    ],
  },
});


function extractBestImage(mediaGroup) {
  // i used fox news rss feed to test this code, it is NOT working :cry:
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
  const imgMatch = content?.match(/<img[^>]+src="([^">]+)"/i);
  return imgMatch ? imgMatch[1] : null;
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
      // Extract the best image from mediaGroup or fallback to content image if available
      if (!item.image) {
        item.image =
          extractBestImage(item.mediaGroup) ||
          extractImageFromContent(item.content);
      }

      // Removing this code so we can try to render the full content
      // // Truncate long fields.
      // for (const key in item) {
      //   if (typeof item[key] === "string" && item[key].length > 200) {
      //     item[key] = item[key].slice(0, 200) + "...";
      //   }
      // }

      // Validate and standardize publication date
      const date = new Date(item.pubDate);
      item.pubDate = isValid(date)
        ? format(date, "yyyy-MM-dd'T'HH:mm:ssXXX")
        : "Invalid Date";

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
