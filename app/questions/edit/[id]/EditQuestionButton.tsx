import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditQuestionButton = ({ questionId }: { questionId: number }) => {
  return (
    <Button radius="full" variant="outline">
      <Link href={`/questions/edit/${questionId}`}>
        <Pencil2Icon />
      </Link>
    </Button>
  );
};

export default EditQuestionButton;
