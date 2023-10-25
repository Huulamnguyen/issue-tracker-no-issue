import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { questionSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = questionSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newQuestion = await prisma.question.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
    },
  });

  return NextResponse.json(newQuestion, { status: 201 });
}
