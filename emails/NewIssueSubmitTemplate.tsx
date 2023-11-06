import Footer from "@/app/Footer";
import { Issue } from "@prisma/client";
import { Card, Text } from "@radix-ui/themes";
import {
  Body,
  Container,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";

const NewIssueSubmitTemplate = ({ issue }: { issue: Issue }) => {
  return (
    <Html>
      <Preview>New Issue Request - {issue.title}</Preview>
      <Tailwind>
        <Body className="min-h-screen flex items-center justify-center">
          <Container>
            <Text as="div" className="text-2xl font-semibold text-center mb-4">
              Email Confirmation
            </Text>
            <Text as="div" className="text-center text-gray-600 mb-6">
              Hey Admin, you have new issue request from {issue.customerEmail}.
            </Text>
            <Text as="div" className="text-center text-gray-600 mb-6">
              Please reply to the issue ASAP
            </Text>
            <Card mx="5">
              <Text as="div" size="2" weight="bold">
                Title: {issue.title}
              </Text>
              <Text as="div" size="2" weight="bold">
                Category: {issue.category} - Status: OPEN
              </Text>
              <Text as="div" size="2" color="gray">
                Description: {issue.description}
              </Text>
            </Card>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewIssueSubmitTemplate;
