"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

interface Props {
  children: string;
}

const CalloutMessage = ({ children }: Props) => {
  return (
    <Callout.Root color="violet">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default CalloutMessage;
