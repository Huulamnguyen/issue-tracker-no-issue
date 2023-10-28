import { Box, DropdownMenu, Text, Avatar, HoverCard } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { AccessibilityIcon } from "@radix-ui/react-icons";

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <Link className="nav-link" href="/api/auth/signin">
            <AccessibilityIcon height="20" width="20" />
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Text as="div" size="2" style={{ maxWidth: 300 }}>
            Admin Only
          </Text>
        </HoverCard.Content>
      </HoverCard.Root>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default AuthStatus;
