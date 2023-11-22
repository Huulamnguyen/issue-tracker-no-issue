"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

interface Props {
  children: string;
}

const CalloutInfoMessage = ({ children }: Props) => {
  return (
    <Callout.Root size={{ initial: "1", sm: "2" }} color="green">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default CalloutInfoMessage;
