"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

// Form field types
type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

const topics = [
  "Full-time role",
  "Contract / consulting",
  "Design system",
  "Speaking",
  "Other",
];

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label
        htmlFor={id}
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6875rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         error ? "var(--status-error)" : "var(--text-muted)",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize:   "0.8125rem",
          color:      "var(--status-error)",
          margin:     0,
        }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (focused: boolean, error?: string): React.CSSProperties => ({
  fontFamily:      "var(--font-body)",
  fontSize:        "1rem",
  color:           "var(--text-primary)",
  backgroundColor: "var(--bg-surface)",
  border:          `1px solid ${error ? "var(--status-error)" : focused ? "var(--accent)" : "var(--border-strong)"}`,
  borderRadius:    "var(--radius-md)",
  padding:         "0.875rem 1rem",
  outline:         "none",
  width:           "100%",
  transition:      "border-color 150ms ease",
  boxSizing:       "border-box" as const,
});

export default function ContactPage() {
  const [form, setForm]     = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [focused, setFocused] = useState<keyof FormData | null>(null);
  const [state, setState]   = useState<FormState>("idle");
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleTopicClick(topic: string) {
    setSelectedTopic(topic);
    setForm((f) => ({ ...f, subject: topic }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <main className="page-gutter" style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>

      {/* Two-col layout */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
        gap:                 "clamp(4rem, 8vw, 8rem)",
        paddingTop:          "clamp(4rem, 8vw, 6rem)",
        paddingBottom:       "clamp(4rem, 8vw, 6rem)",
        alignItems:          "start",
      }}>

        {/* Left — intent */}
        <div style={{ position: "sticky", top: "96px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "var(--text-muted)",
              marginBottom:  "1.5rem",
            }}
          >
            Contact
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.5rem, 5vw, 5rem)",
              fontWeight:    300,
              lineHeight:    1.0,
              letterSpacing: "-0.03em",
              color:         "var(--text-primary)",
              margin:        "0 0 1.5rem",
            }}
          >
            Let's make something worth making.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              fontFamily:  "var(--font-body)",
              fontSize:    "1.0625rem",
              lineHeight:  1.7,
              color:       "var(--text-secondary)",
              margin:      "0 0 2.5rem",
              maxWidth:    "42ch",
            }}
          >
            I'm open to senior IC, staff, and consulting conversations.
            If you have a problem worth solving, I'd like to hear about it.
          </motion.p>

          {/* Response time note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "0.5rem",
            }}
          >
            <span style={{
              width:           "6px",
              height:          "6px",
              borderRadius:    "9999px",
              backgroundColor: "var(--status-success)",
              flexShrink:      0,
            }} />
            <span style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.04em",
              color:         "var(--text-muted)",
            }}>
              Usually responds within 1–2 business days
            </span>
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <AnimatePresence mode="wait">

            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding:         "3rem",
                  borderRadius:    "var(--radius-xl)",
                  border:          "1px solid var(--border-default)",
                  backgroundColor: "var(--bg-surface)",
                  textAlign:       "center",
                }}
              >
                <div style={{
                  width:           "48px",
                  height:          "48px",
                  borderRadius:    "9999px",
                  backgroundColor: "rgba(22,163,74,0.1)",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  margin:          "0 auto 1.5rem",
                  fontSize:        "1.5rem",
                }}>
                  ✓
                </div>
                <h2 style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "2rem",
                  fontWeight:    300,
                  letterSpacing: "-0.02em",
                  color:         "var(--text-primary)",
                  margin:        "0 0 0.75rem",
                }}>
                  Message sent.
                </h2>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize:   "1rem",
                  color:      "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin:     "0 0 2rem",
                }}>
                  Thanks for reaching out. I'll be in touch soon.
                </p>
                <Button href="/work" variant="ghost">Back to work</Button>
              </motion.div>
            ) : (

              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  display:         "flex",
                  flexDirection:   "column",
                  gap:             "1.5rem",
                  padding:         "2.5rem",
                  borderRadius:    "var(--radius-xl)",
                  border:          "1px solid var(--border-default)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                {/* Topic quick-select */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.6875rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color:         "var(--text-muted)",
                  }}>
                    I'm reaching out about
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTopicClick(t)}
                        style={{
                          fontFamily:      "var(--font-body)",
                          fontSize:        "0.8125rem",
                          fontWeight:      500,
                          padding:         "0.375rem 0.875rem",
                          borderRadius:    "var(--radius-full)",
                          border:          `1px solid ${selectedTopic === t ? "var(--accent)" : "var(--border-strong)"}`,
                          backgroundColor: selectedTopic === t ? "var(--accent-subtle)" : "transparent",
                          color:           selectedTopic === t ? "var(--accent)" : "var(--text-secondary)",
                          cursor:          "pointer",
                          transition:      "all 150ms ease",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {/* Name */}
                  <Field label="Name" id="name" error={errors.name}>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === "name", errors.name)}
                    />
                  </Field>

                  {/* Email */}
                  <Field label="Email" id="email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === "email", errors.email)}
                    />
                  </Field>
                </div>

                {/* Subject (free text, pre-filled by topic) */}
                <Field label="Subject" id="subject">
                  <input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle(focused === "subject")}
                  />
                </Field>

                {/* Message */}
                <Field label="Message" id="message" error={errors.message}>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project, role, or idea…"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle(focused === "message", errors.message),
                      resize:     "vertical",
                      lineHeight: 1.65,
                      minHeight:  "140px",
                    }}
                  />
                </Field>

                {/* Error state */}
                {state === "error" && (
                  <p style={{
                    fontFamily:      "var(--font-body)",
                    fontSize:        "0.875rem",
                    color:           "var(--status-error)",
                    backgroundColor: "rgba(220,38,38,0.06)",
                    padding:         "0.75rem 1rem",
                    borderRadius:    "var(--radius-md)",
                    margin:          0,
                  }}>
                    Something went wrong. Please try again in a moment.
                  </p>
                )}

                {/* Submit */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={state === "sending"}
                  >
                    {state === "sending" ? "Sending…" : "Send message →"}
                  </Button>
                </div>

                <p style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6875rem",
                  color:         "var(--text-muted)",
                  letterSpacing: "0.02em",
                  margin:        0,
                  textAlign:     "center",
                }}>
                  Your information is used only to respond to your message.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
