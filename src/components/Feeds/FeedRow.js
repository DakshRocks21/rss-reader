// Made by Daksh

import { Card, Button } from "actify";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeedRow({ feed, type }) {
  const { publisher, title, contentSnippet, pubDate, link, image } = feed;

  const timeAgo = formatTimeAgo(pubDate);

  if (type === "tiles" || type === "carousel") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="max-w-2xl bg-surface-container text-on-primary-container shadow-lg hover:shadow-xl rounded-xl transition-shadow duration-300">
          {image && (
            <Image
              src={image}
              alt={title}
              width={640}
              height={320}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          )}
          <div className="p-6 space-y-4">
            <p
              as="a"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              variant="h5"
              className="text-title-large text-primary font-bold hover:underline hover:text-primary-dark"
            >
              {title}
            </p>
            <p variant="body2" className="text-on-surface-variant">
              {contentSnippet}
            </p>
            <div className="flex justify-between items-center">
              <p variant="body2" className="text-primary">
                {publisher || "Unknown Publisher"}
              </p>
              <p variant="caption" className="text-on-surface-variant">
                {timeAgo}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  } else if (type === "list") {
    return (
      <motion.div
        className="bg-surface shadow-lg hover:shadow-xl rounded-xl transition-shadow duration-300 w-full flex flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            width={320}
            height={160}
            className="w-48 h-48 object-cover rounded-l-xl mr-4"
          />
        )}
        <div className="py-3 px-3 space-y-4 flex flex-col w-full">
          <p
            as="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            variant="h5"
            className="text-title-medium text-primary font-bold hover:underline hover:text-primary-dark"
          >
            {title}
          </p>
          <p variant="body2" className="text-on-surface-variant">
            {contentSnippet}
          </p>
          <div className="flex justify-between items-center">
            <p variant="body2" className="text-primary">
              {publisher || "Unknown Publisher"}
            </p>
            <p variant="caption" className="text-on-surface-variant">
              {timeAgo}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
}

const formatTimeAgo = (pubDate) => {
  const now = new Date();
  const published = new Date(pubDate);
  const diffMs = now - published;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffHours < 48) return "Yesterday";
  if (diffHours < 720) return `${Math.floor(diffHours / 24)} days ago`;
  return published.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
