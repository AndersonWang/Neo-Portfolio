interface YouTubeEmbedProps {
  url:      string;  // full YouTube URL or video ID
  caption?: string;
}

function extractVideoId(url: string): string {
  // Handle full URLs: youtube.com/watch?v=ID or youtu.be/ID
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : url; // fall back to treating input as raw ID
}

export default function YouTubeEmbed({ url, caption }: YouTubeEmbedProps) {
  const videoId = extractVideoId(url);

  return (
    <figure style={{ margin: "2.5rem 0" }}>
      {/* 16:9 responsive wrapper */}
      <div
        style={{
          position:     "relative",
          paddingBottom: "56.25%",
          height:        0,
          overflow:      "hidden",
          borderRadius:  "var(--radius-lg)",
          backgroundColor: "var(--bg-raised)",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={caption ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            top:      0,
            left:     0,
            width:    "100%",
            height:   "100%",
            border:   "none",
          }}
        />
      </div>

      {caption && (
        <figcaption
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.75rem",
            color:         "var(--text-muted)",
            letterSpacing: "0.02em",
            marginTop:     "0.75rem",
            textAlign:     "center",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
