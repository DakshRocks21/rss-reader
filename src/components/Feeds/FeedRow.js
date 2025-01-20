// Daksh wrote this

export default function FeedRow({ feed, type }) {
    const { publisher, title, contentSnippet, pubDate, link, image } = feed;
  
    const timeAgo = calculateTimeAgo(pubDate);
  
    if (type === "tiles") {
      return (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-xs">
          <div className="text-gray-600 mb-2">
            <span className="font-semibold text-red-700">{publisher}</span>
            <span className="mx-2">•</span>
            <span>{timeAgo}</span>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg font-medium text-black hover:underline"
          >
            {title}
          </a>
          <p className="mt-2 text-gray-700 text-sm">{contentSnippet}</p>
        </div>
      );
    }
  
    if (type === "list") {
      return (
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-row">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-24 h-24 object-cover rounded-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          )}
          <div className="ml-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-medium text-black hover:underline"
            >
              {title}
            </a>
            <div className="text-gray-600 mb-2 text-sm">
              <span className="font-semibold text-red-700">{publisher}</span>
              <span className="mx-2">•</span>
              <span className="">{timeAgo}</span>
            </div>
            <p className="mt-2 text-gray-700 text-sm">{contentSnippet}</p>
          </div>
        </div>
      );
    }

    if (type === "carousel") {
      return (
        <p>Carousel view not implemented yet</p>
      )
    }

    return (
      <p>Invalid view type</p>
    )

  }
  
  const calculateTimeAgo = (pubDate) => {
    const now = new Date();
    const published = new Date(pubDate);
    const diffMs = now - published;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minutes ago`;
    }
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffHours < 48) return "Yesterday";
    if (diffHours < 720) return `${Math.floor(diffHours / 24)} days ago`;
    return published.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  