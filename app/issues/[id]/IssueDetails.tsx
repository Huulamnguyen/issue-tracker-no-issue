import {
  CustomCard,
  IssueStatusBadge,
  QuestionCategoryBadge,
} from "@/app/components";
import { Issue } from "@prisma/client";
import { Badge, Card, Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Flex className="space-x-3" my="2">
        <QuestionCategoryBadge category={issue.category} />
        <Heading size="4">{issue.title}</Heading>
      </Flex>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Badge size="1">Created at {issue.createdAt.toDateString()}</Badge>
        <Badge size="1">Last Updated at {issue.updatedAt.toDateString()}</Badge>
      </Flex>
      <Flex className="space-x-3" my="2">
        {issue.customerEmail && (
          <CustomCard label="Customer Email" value={issue.customerEmail} />
        )}
        {issue.orderNumber && (
          <CustomCard label="Order #" value={issue.orderNumber} />
        )}
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
