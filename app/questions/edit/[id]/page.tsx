import dynamic from "next/dynamic";
import QuestionFormSkeleton from "./loading";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import CalloutMessage from "@/app/components/CalloutErrorMessage";

const QuestionForm = dynamic(
  () => import("@/app/questions/_components/QuestionForm"),
  {
    ssr: false,
    loading: () => <QuestionFormSkeleton />,
  }
);

interface Props {
  params: { id: string };
}

const EditQuestionPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const question = await prisma.question.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!question) notFound();

  if (session) {
    return <QuestionForm question={question} />;
  }

  return <CalloutMessage>Access Denied. Please login!</CalloutMessage>;
};

export default EditQuestionPage;
