import { Flex, Text } from "@radix-ui/themes";
import QuestionActions from "./QuestionActions";
import QuestionsAccordion from "./QuestionsAccordion";

const QuestionsPage = () => {
  return (
    <Flex direction="column" gap="3">
      <Text size="5">Frequently Asked Questions</Text>
      <QuestionActions />
      <QuestionsAccordion />
    </Flex>
  );
};

export default QuestionsPage;
