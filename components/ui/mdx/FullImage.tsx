import LightboxImage from "./LightboxImage";

interface FullImageProps {
  src:      string;
  alt?:     string;
  caption?: string;
}

export default function FullImage({ src, alt, caption }: FullImageProps) {
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <LightboxImage
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 720px"
      />
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
