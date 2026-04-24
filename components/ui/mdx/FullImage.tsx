import Image from "next/image";

interface FullImageProps {
  src:      string;
  alt?:     string;
  caption?: string;
  aspect?:  string;  // e.g. "16/9", "4/3", "1/1"
}

export default function FullImage({ src, alt, caption, aspect = "16/9" }: FullImageProps) {
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <div style={{
        position:        "relative",
        width:           "100%",
        aspectRatio:     aspect,
        borderRadius:    "var(--radius-lg)",
        overflow:        "hidden",
        backgroundColor: "var(--bg-raised)",
      }}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {caption && (
        <figcaption style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.75rem",
          color:         "var(--text-muted)",
          letterSpacing: "0.02em",
          marginTop:     "0.75rem",
          textAlign:     "center",
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
