import { Flex, Text } from "@radix-ui/themes";
import QuestionActions from "./QuestionActions";
import QuestionsAccordion from "./QuestionsAccordion";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { CalloutMessage } from "@/app/components";
import prisma from "@/prisma/client";

const QuestionsPage = async () => {
  const questions = await prisma.question.findMany({
    orderBy: { category: "asc" },
  });

  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <Flex direction="column" gap="3">
        <Text size="5">Frequently Asked Questions</Text>
        <QuestionActions />
        <QuestionsAccordion questions={questions} />
      </Flex>
    );
  }

  return <CalloutMessage>Access denied. Please login!</CalloutMessage>;
};

export default QuestionsPage;
