import { json } from '@sveltejs/kit';

// Use environment variable for Resend API key
const VITE_RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message || 'No additional message provided'}</p>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Website Contact <onboarding@resend.dev>', // Update with your verified domain
        to: ['info@mahilchiassociate.com'], // Update with your email
        subject: `New Contact Form Submission from ${name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Resend API error: ${errorData.message || res.statusText}`);
    }

    const data = await res.json();
    return json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}