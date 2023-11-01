import { Box, Text, Card } from "@radix-ui/themes";
import React from "react";

interface Props {
  label: string;
  value: string;
}

const CustomCard = ({ label, value }: Props) => {
  return (
    <Card>
      <Box>
        <Text as="div" size="1" weight="bold">
          {label}
        </Text>
        <Text as="div" size="1" color="gray">
          {value}
        </Text>
      </Box>
    </Card>
  );
};

export default CustomCard;
