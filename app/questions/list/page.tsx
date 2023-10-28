import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import QuestionActions from "./QuestionActions";
import QuestionsAccordion from "./QuestionsAccordion";

const QuestionsPage = async () => {
  const session = await getServerSession(authOptions);

  const questions = await prisma.question.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <Flex direction="column" gap="3">
      <Text size="5">Frequently Asked Questions</Text>
      {session && <QuestionActions />}
      <QuestionsAccordion questions={questions} />
    </Flex>
  );
};

export default QuestionsPage;
