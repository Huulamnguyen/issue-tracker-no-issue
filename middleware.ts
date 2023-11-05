export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/issues/edit/:id+",
    "/questions/new",
    "/questions/edit/:id+",
    "/setting",
  ],
};
