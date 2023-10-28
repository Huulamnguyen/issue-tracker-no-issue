import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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
    <ul className="flex space-x-6">
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
  );
};

export default NavLinks;
