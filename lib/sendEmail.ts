// lib/sendEmail.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export default async function sendEmail({ to, subject, html }: EmailPayload) {
  try {
    if (!to || typeof to !== "string") {
      throw new Error(`Invalid email recipient: ${to}`);
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { success: false, error };
  }
}
