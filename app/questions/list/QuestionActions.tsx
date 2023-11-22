import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

const QuestionActions = () => {
  return (
    <Flex justify="end">
      <Button variant="classic">
        <Link href="/questions/new">New Question</Link>
      </Button>
    </Flex>
  );
};

export default QuestionActions;
