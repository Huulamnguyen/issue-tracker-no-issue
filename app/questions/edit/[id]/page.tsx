import dynamic from "next/dynamic";
import QuestionFormSkeleton from "./loading";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { CalloutErrorMessage } from "@/app/components";

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

  if (session && session.user?.email === process.env.ADMIN) {
    return <QuestionForm question={question} />;
  }

  return <CalloutErrorMessage>Access Denied</CalloutErrorMessage>;
};

export default EditQuestionPage;
