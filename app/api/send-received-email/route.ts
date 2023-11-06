import authOptions from "@/app/auth/authOptions";
import NewIssueSubmitTemplate from "@/emails/NewIssueSubmitTemplate";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { issueSchema } from "../../validationSchemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const data = await resend.emails.send({
      from: "info@angelinanailsupply.com",
      to: ["info@angelinanailsupply.com", "angelinanailsupply@gmail.com"],
      subject: "New Issue Ticket Request ANS",
      react: NewIssueSubmitTemplate({ issue: body }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
