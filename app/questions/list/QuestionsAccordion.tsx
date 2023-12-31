"use client";

import QuestionCategoryBadge from "@/app/components/QuestionCategoryBadge";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Question } from "@prisma/client";
import { Card, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import DeleteQuestionButton from "../edit/[id]/DeleteQuestionButton";
import EditQuestionButton from "../edit/[id]/EditQuestionButton";

interface Props {
  questions: Question[];
}

const QuestionsAccordion = ({ questions }: Props) => {
  const { data: session } = useSession();

  return (
    <Card>
      <Accordion>
        {questions.map((question) => (
          <AccordionItem
            className="text-sm leading-relaxed"
            key={question.id}
            aria-label={question.title}
            title={question.title}
            startContent={
              <QuestionCategoryBadge category={question.category} />
            }
          >
            <ReactMarkdown className="text-sm leading-relaxed">
              {question.description}
            </ReactMarkdown>
            {session && session.user?.email === "liamnguyen.swe@gmail.com" && (
              <Flex justify="end" mt="3" gap="3">
                <EditQuestionButton questionId={question.id} />
                <DeleteQuestionButton questionId={question.id} />
              </Flex>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default QuestionsAccordion;
