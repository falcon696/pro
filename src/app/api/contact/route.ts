import { NextResponse } from 'next/server';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY || 're_AWaWE5sZ_PCWiuKZef5MQGNgBrcbYmDXR';
    const contactEmail = process.env.CONTACT_EMAIL || 'falconxxx475@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@falcon-portfolio.example.com';

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Missing RESEND_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
        <h2 style="margin-bottom: 16px;">New Contact Form Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Message:</strong></p>
        <div style="padding: 12px; background: #f6f8fa; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [contactEmail],
        subject: 'New Contact Form Message',
        html,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to send email through Resend.', details: errorText },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected server error.', details: String(error) },
      { status: 500 }
    );
  }
}
