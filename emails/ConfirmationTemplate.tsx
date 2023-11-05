import React from "react";
import {
  Body,
  Container,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

const ConfirmationTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>
        Thank you for joining our waitlist and for your patience
      </Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="font-bold">{name}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationTemplate;
