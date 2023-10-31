"use client";
import QuestionCategoryBadge from "@/app/components/QuestionCategoryBadge";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Question } from "@prisma/client";
import { Flex, ScrollArea, Card } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import DeleteQuestionButton from "../edit/[id]/DeleteQuestionButton";
import EditQuestionButton from "../edit/[id]/EditQuestionButton";

interface Props {
  questions: Question[];
}

const QuestionsAccordion = ({ questions }: Props) => {
  const { status } = useSession();

  return (
    <Card>
      <Accordion>
        {questions.map((question) => (
          <AccordionItem
            key={question.id}
            aria-label={question.title}
            title={question.title}
            startContent={
              <QuestionCategoryBadge category={question.category} />
            }
          >
            <ReactMarkdown>{question.description}</ReactMarkdown>
            {status === "authenticated" && (
              <Flex justify="end" mt="3" gap="3">
                <DeleteQuestionButton questionId={question.id} />
                <EditQuestionButton questionId={question.id} />
              </Flex>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default QuestionsAccordion;
