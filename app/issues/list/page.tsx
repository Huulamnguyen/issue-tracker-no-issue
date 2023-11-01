import authOptions from "@/app/auth/authOptions";
import { CalloutErrorMessage, CalloutInfoMessage } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  if (session) {
    return (
      <>
        <Flex direction="column" gap="3">
          <IssueActions />
          {issueCount > 0 ? (
            <IssueTable searchParams={searchParams} issues={issues} />
          ) : (
            <CalloutInfoMessage>
              Well done! There is no issue or create a new one
            </CalloutInfoMessage>
          )}
          <Pagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={issueCount}
          />
        </Flex>
      </>
    );
  }
  return (
    <CalloutErrorMessage>Access Denied. Please login!</CalloutErrorMessage>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
