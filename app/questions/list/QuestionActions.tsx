import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

import React from "react";

const QuestionActions = () => {
  return (
    <Flex justify="between">
      <Button>
        <Link href="/questions/new">New Question</Link>
      </Button>
    </Flex>
  );
};

export default QuestionActions;
