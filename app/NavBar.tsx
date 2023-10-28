"use client";

import { Container, Flex } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";
import AuthStatus from "./AuthStatus";
import NavLinks from "./NavLinks";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <AiFillBug />
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
