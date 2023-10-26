"use client";
import QuestionCategoryBadge from "@/app/components/QuestionCategoryBadge";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Question } from "@prisma/client";
import { ScrollArea } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

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
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};

export default QuestionsAccordion;
