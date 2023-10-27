import authOptions from "@/app/auth/authOptions";
import { questionSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = questionSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { title, description, category } = body;

  const question = await prisma.question.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!question)
    return NextResponse.json({ error: "Invalid question" }, { status: 404 });

  const updatedQuestion = await prisma.question.update({
    where: { id: question.id },
    data: {
      title,
      description,
      category,
    },
  });

  return NextResponse.json(updatedQuestion);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const question = await prisma.question.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!question)
    return NextResponse.json({ error: "Invalid question" }, { status: 404 });

  await prisma.question.delete({
    where: { id: question.id },
  });

  return NextResponse.json({});
}
