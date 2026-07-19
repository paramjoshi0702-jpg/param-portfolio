import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = "paramjoshi0702@gmail.com";
const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") || "Portfolio <onboarding@resend.dev>";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!RESEND_API_KEY) {
    return json({ error: "Email service not configured." }, 503);
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return json({ error: "All fields are required." }, 400);
  }
  if (name.length > 100) {
    return json({ error: "Name is too long." }, 400);
  }
  if (!isValidEmail(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }
  if (message.length > 5000) {
    return json({ error: "Message is too long." }, 400);
  }

  const emailHtml = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0a0820; border: 1px solid rgba(124,58,237,0.3); border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 24px 32px;">
        <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700;">New Portfolio Message</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">Someone reached out via your portfolio website.</p>
      </div>
      <div style="padding: 28px 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding: 6px 0; width: 80px;">Name</td>
            <td style="color: #f4f4f5; font-size: 15px; font-weight: 600; padding: 6px 0;">${name.replace(/[<>&"]/g, "")}</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding: 6px 0;">Email</td>
            <td style="color: #c4b5fd; font-size: 15px; padding: 6px 0;">${email.replace(/[<>&"]/g, "")}</td>
          </tr>
        </table>
        <div style="margin: 18px 0 8px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</div>
        <div style="color: #e4e4e7; font-size: 15px; line-height: 1.6; padding: 16px; background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); white-space: pre-wrap;">${message.replace(/[<>&"]/g, "")}</div>
      </div>
      <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.08); color: #71717a; font-size: 12px;">
        Sent from paramjoshi0702-jpg/portfolio
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return json({ error: "Failed to send email. Please try again later." }, 502);
    }

    return json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return json({ error: "Failed to send email. Please try again later." }, 502);
  }
});
