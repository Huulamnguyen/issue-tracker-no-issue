import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import QuestionActions from "./QuestionActions";
import QuestionsAccordion from "./QuestionsAccordion";
import { Metadata } from "next";
import { CalloutMessage } from "@/app/components";

const QuestionsPage = async () => {
  const session = await getServerSession(authOptions);

  const questions = await prisma.question.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <Flex direction="column" gap="3">
      <Text size="5" color="violet">
        Frequently Asked Questions
      </Text>
      <Text size="2">
        Official Angelina Nail Supply&apos;s Support Center. You can find a
        quick solution here.
      </Text>
      <Text size="2">
        Our support emails angelinanailsupply@gmail.com or
        info@angelinanailsupply.com
      </Text>
      {session && <QuestionActions />}
      <QuestionsAccordion questions={questions} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "View all questions",
};

export default QuestionsPage;
