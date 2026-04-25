import { Resend } from "resend";
import { NextResponse } from "next/server";

interface ContactPayload {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

// Basic server-side validation
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim())    return "Name is required";
  if (!body.email?.trim())   return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
                             return "Invalid email address";
  if (!body.message?.trim()) return "Message is required";
  // Spam guard: reject suspiciously long inputs
  if (body.name.length    > 120) return "Name too long";
  if (body.email.length   > 254) return "Email too long";
  if (body.subject && body.subject.length > 200) return "Subject too long";
  if (body.message.length > 4000) return "Message too long";
  return null;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  const { name, email, subject, message } = body as ContactPayload;

  // CONTACT_EMAIL is the destination inbox — set in Vercel env vars, never in source
  const toEmail = process.env.CONTACT_EMAIL;
  if (!toEmail) {
    console.error("CONTACT_EMAIL env var not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY env var not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from:     "Portfolio Contact <onboarding@resend.dev>", // swap for verified domain later
      to:       [toEmail],
      replyTo:  email,
      subject:  subject
                  ? `[Portfolio] ${subject}`
                  : `[Portfolio] New message from ${name}`,
      text: `
Name:    ${name}
Email:   ${email}
Subject: ${subject || "—"}

${message}
      `.trim(),
      html: `
<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px">
  <p style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#9A9690;margin:0 0 24px">
    Portfolio Contact Form
  </p>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    <tr><td style="padding:8px 0;font-size:12px;color:#9A9690;width:80px">Name</td>
        <td style="padding:8px 0;font-size:15px;color:#0F0E0D">${name}</td></tr>
    <tr><td style="padding:8px 0;font-size:12px;color:#9A9690">Email</td>
        <td style="padding:8px 0;font-size:15px;color:#0F0E0D">${email}</td></tr>
    ${subject ? `<tr><td style="padding:8px 0;font-size:12px;color:#9A9690">Subject</td>
        <td style="padding:8px 0;font-size:15px;color:#0F0E0D">${subject}</td></tr>` : ""}
  </table>
  <div style="background:#F0EDE8;border-radius:8px;padding:20px 24px">
    <p style="font-size:15px;line-height:1.7;color:#2E2C28;margin:0;white-space:pre-wrap">${message}</p>
  </div>
  <p style="font-size:11px;color:#9A9690;margin:24px 0 0">
    Reply directly to this email to respond to ${name}.
  </p>
</div>
      `.trim(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
