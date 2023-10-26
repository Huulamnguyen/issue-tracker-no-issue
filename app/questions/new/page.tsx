import dynamic from "next/dynamic";
import QuestionFormSkeleton from "./loading";

const QuestionForm = dynamic(
  () => import("@/app/questions/_components/QuestionForm"),
  {
    ssr: false,
    loading: () => <QuestionFormSkeleton />,
  }
);

const NewQuestionPage = () => {
  return <QuestionForm />;
};

export default NewQuestionPage;
