import LightboxImage from "./LightboxImage";

interface ImagePairProps {
  src1:     string;
  src2:     string;
  alt1?:    string;
  alt2?:    string;
  caption?: string;
}

export default function ImagePair({ src1, src2, alt1, alt2, caption }: ImagePairProps) {
  const images = [
    { src: src1, alt: alt1 },
    { src: src2, alt: alt2 },
  ];

  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
        gap:                 "0.75rem",
        alignItems:          "start",  // don't stretch to equal height
      }}>
        {images.map(({ src, alt }, i) => (
          <LightboxImage
            key={i}
            src={src}
            alt={alt}
            sizes="(max-width: 768px) 100vw, 360px"
          />
        ))}
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
