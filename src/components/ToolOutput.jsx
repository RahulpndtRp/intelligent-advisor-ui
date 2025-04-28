import React, { useState } from "react";

/* small grey shimmer */
const Skeleton = ({ h = "h-52 w-full" }) => (
  <div
    className={`${h} bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-400 text-sm`}
  >
    Loading…
  </div>
);

/* trim helper */
const trim = (t, n = 160) =>
  t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t;

/* label for each tool */
const TOOL_LABEL = {
  search_location: "📍 Location (Google Maps)",
  search_shopping: "🛒 Shopping result",
  search_news: "📰 News articles",
};

export default function ToolOutput({ tool }) {
  const { function_name, response } = tool;
  const label = TOOL_LABEL[function_name] || `🔧 ${function_name}`;

  /* ───────────────── card wrapper ───────────────── */
  return (
    <div className="border rounded-lg p-3 space-y-3">
      <p className="font-semibold text-sm">{label}</p>

      {/* ↓↓↓ actual content ↓↓↓ */}
      {function_name === "search_location" && <LocationBlock response={response} />}

      {function_name === "search_shopping" && <ShoppingBlock response={response} />}

      {function_name === "search_news" && <NewsBlock response={response} />}

      {/* fallback pretty-print */}
      {!["search_location", "search_shopping", "search_news"].includes(
        function_name
      ) && (
        <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

/* ───────── LOCATION ───────── */
function LocationBlock({ response }) {
  const q = encodeURIComponent(response.query);
  return (
    <>
      <iframe
        title="map"
        src={`https://maps.google.com/maps?q=${q}&output=embed`}
        className="w-full h-52 rounded-lg border"
        loading="lazy"
      />
      <a
        href={response.maps_url}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline text-xs"
      >
        Open in Google Maps
      </a>
    </>
  );
}

/* ───────── SHOPPING ───────── */
function ShoppingBlock({ response }) {
  const [imgOk, setImgOk] = useState(false);
  return (
    <div className="flex gap-4 items-start overflow-hidden">
      {!imgOk && <Skeleton h="h-24 w-24" />}
      <img
        src={response.image_url}
        alt={response.title}
        className={`w-24 h-24 object-contain shrink-0 ${imgOk ? "" : "hidden"}`}
        onLoad={() => setImgOk(true)}
      />
      <div>
        <a
          href={response.link}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          {response.title}
        </a>
        <p className="text-sm mt-1">{response.price}</p>
      </div>
    </div>
  );
}

/* ───────── NEWS ───────── */
function NewsBlock({ response }) {
  return (
    <ul className="space-y-4">
      {response.articles.map((a, i) => (
        <ArticleCard key={i} article={a} />
      ))}
    </ul>
  );
}

function ArticleCard({ article }) {
    const [loaded, setLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState(
      // raw URL, NOT URL-encoded
      `https://image.thum.io/get/ogimage/${article.link}`
    );
  
    return (
      <li className="rounded-lg overflow-hidden border">
        <a
          href={article.link}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col md:flex-row hover:bg-gray-50 transition"
        >
          {/* thumbnail */}
          <div className="md:w-60 shrink-0">
            {!loaded && <Skeleton />}
            <img
              src={imgSrc}
              alt=""
              className={`w-full h-44 object-cover ${loaded ? "" : "hidden"}`}
              onLoad={() => setLoaded(true)}
              onError={() => {
                // first attempt failed → fallback to screenshot mode
                if (!imgSrc.includes("/width/")) {
                  setImgSrc(
                    `https://image.thum.io/get/width/600/${article.link}`
                  );
                } else {
                  // second attempt failed → just hide skeleton
                  setLoaded(true);
                }
              }}
              loading="lazy"
            />
          </div>
  
          {/* text */}
          <div className="p-3 flex flex-col justify-between w-full">
            <div>
              <h4 className="font-semibold text-primary mb-1">
                {article.title}
              </h4>
              <p className="text-sm text-gray-700">
                {article.snippet ? article.snippet : trim(article.title)}
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-2">
              {article.source} • {article.date}
            </span>
          </div>
        </a>
      </li>
    );
  }