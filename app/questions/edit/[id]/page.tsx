import dynamic from "next/dynamic";
import QuestionFormSkeleton from "./loading";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

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
  const question = await prisma.question.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!question) notFound();

  return <QuestionForm question={question} />;
};

export default EditQuestionPage;
