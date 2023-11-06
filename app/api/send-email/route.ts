import { EmailTemplate } from "@/app/components";
import ConfirmationTemplate from "@/emails/ConfirmationTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "info@angelinanailsupply.com",
      to: ["liamnguyen.swe@gmail.com"],
      subject: "Hello world Testing Email",
      react: ConfirmationTemplate({ name: "Angelina" }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
