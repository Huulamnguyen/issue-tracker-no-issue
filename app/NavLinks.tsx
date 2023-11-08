import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Container, DropdownMenu } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const NavLinks = () => {
  const { status } = useSession();
  const currentPath = usePathname();

  const protectedLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
    { label: "Questions", href: "/questions/list" },
    { label: "Setting", href: "/setting" },
  ];

  const publicLinks = [{ label: "Questions", href: "/questions/list" }];

  const displayLinks =
    status === "unauthenticated" ? publicLinks : protectedLinks;

  return (
    <>
      <ul className="hidden sm:flex space-x-6">
        {displayLinks.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "nav-link": true,
                "!text-zinc-900": link.href === currentPath,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sm:hidden">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button color="gray" variant="soft" size="1">
              <HamburgerMenuIcon width="12" height="12" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            {displayLinks.map((link) => (
              <Container key={link.href}>
                <DropdownMenu.Item>
                  <a
                    className={classnames({
                      "nav-link": true,
                      "!text-zinc-900": link.href === currentPath,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </DropdownMenu.Item>
              </Container>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  );
};

export default NavLinks;
