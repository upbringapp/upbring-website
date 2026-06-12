import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const data = await resend.emails.send({
      from: "Upbring <hello@updates.upbringapp.com>",
      to: [email],
      subject: "Welcome to Upbring 🌱",
      text: `Hi,

Thank you for joining the Upbring early community.

We're building a place where curiosity grows and strong values flourish.

We're excited to share this journey with you and will keep you updated as we grow.

Warmly,

Upbring
https://upbringapp.com`,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}