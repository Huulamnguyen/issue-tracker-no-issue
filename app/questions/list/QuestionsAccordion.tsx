"use client";
import QuestionCategoryBadge from "@/app/components/QuestionCategoryBadge";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Question } from "@prisma/client";
import { Flex, ScrollArea } from "@radix-ui/themes";
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
    <ScrollArea
      radius="medium"
      type="scroll"
      scrollbars="vertical"
      style={{ height: 650 }}
    >
      <Accordion selectionMode="multiple">
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
    </ScrollArea>
  );
};

export default QuestionsAccordion;
