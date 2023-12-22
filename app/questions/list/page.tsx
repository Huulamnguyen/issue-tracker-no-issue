import authOptions from "@/app/auth/authOptions";
import { CalloutInfoMessage } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Flex, Link, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import QuestionActions from "./QuestionActions";
import QuestionsAccordion from "./QuestionsAccordion";

const QuestionsPage = async () => {
  const session = await getServerSession(authOptions);

  const questions = await prisma.question.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <Flex direction="column" gap="2">
      <Text as="p" size={{ initial: "2", sm: "4" }}>
        Official Angelina Nail Supply&apos;s Support Center
      </Text>
      <CalloutInfoMessage>
        Can not find an answer. Submit the form below.
      </CalloutInfoMessage>
      <Box>
        <Button size={{ initial: "1", sm: "2" }} variant="outline">
          <Link href="/issues/new">Submit Form</Link>
        </Button>
      </Box>
      {session && session.user?.email === process.env.ADMIN && (
        <QuestionActions />
      )}
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
