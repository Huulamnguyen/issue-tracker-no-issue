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

const ConfirmationTemplate = ({ issue }: { issue: Issue }) => {
  return (
    <Html>
      <Preview>Thank you for submitting and for your patience</Preview>
      <Tailwind>
        <Body className="min-h-screen flex items-center justify-center">
          <Container>
            <Text as="div" className="text-2xl font-semibold text-center mb-4">
              Email Confirmation
            </Text>
            <Text as="div" className="text-center text-gray-600 mb-6">
              Thank you for submitting the request with us. We will reach out to
              you soon at your email {issue.customerEmail} with an update or
              solution in next 48 hours!
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
            <Text as="div" className="text-gray-600 my-6">
              If you have not received any responses from us in next 48 hours!
              Please remind us by replying to this email
            </Text>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationTemplate;
