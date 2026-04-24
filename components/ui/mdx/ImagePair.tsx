import Image from "next/image";

interface ImagePairProps {
  src1:   string;
  src2:   string;
  alt1?:  string;
  alt2?:  string;
  caption?: string;
}

export default function ImagePair({ src1, src2, alt1, alt2, caption }: ImagePairProps) {
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 "0.75rem",
      }}>
        {[{ src: src1, alt: alt1 }, { src: src2, alt: alt2 }].map(({ src, alt }, i) => (
          <div
            key={i}
            style={{
              position:        "relative",
              aspectRatio:     "4/3",
              borderRadius:    "var(--radius-lg)",
              overflow:        "hidden",
              backgroundColor: "var(--bg-raised)",
            }}
          >
            <Image
              src={src}
              alt={alt ?? ""}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
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
