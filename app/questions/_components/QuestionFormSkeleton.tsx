import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const QuestionFormSkeleton = () => {
  return (
    <Box>
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default QuestionFormSkeleton;
