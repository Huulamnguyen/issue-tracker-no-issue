import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import QuestionFormSkeleton from "./loading";
import { AccessDeny } from "@/app/components";

const QuestionForm = dynamic(
  () => import("@/app/questions/_components/QuestionForm"),
  {
    ssr: false,
    loading: () => <QuestionFormSkeleton />,
  }
);

const NewQuestionPage = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user?.email === process.env.ADMIN) {
    return <QuestionForm />;
  }

  return <AccessDeny />;
};

export default NewQuestionPage;
