"use client";
import QuestionCategoryBadge from "@/app/components/QuestionCategoryBadge";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Question } from "@prisma/client";
import { Flex, ScrollArea } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import EditQuestionButton from "../edit/[id]/EditQuestionButton";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import DeleteQuestionButton from "../edit/[id]/DeleteQuestionButton";

interface Props {
  questions: Question[];
}

const QuestionsAccordion = ({ questions }: Props) => {
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
            <Flex justify="end" mt="3" gap="3">
              <DeleteQuestionButton questionId={question.id} />
              <EditQuestionButton questionId={question.id} />
            </Flex>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};

export default QuestionsAccordion;
