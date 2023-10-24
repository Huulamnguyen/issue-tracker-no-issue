"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import {
  Button,
  Callout,
  TextField,
  Select,
  Flex,
  Grid,
  Box,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Grid columns={{ initial: "1", lg: "8" }} gap="3">
          <Box className="md:col-span-7">
            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.title}
                placeholder="Title"
                {...register("title")}
              />
            </TextField.Root>
          </Box>
          {issue && (
            <Box width="auto">
              <Controller
                name="status"
                control={control}
                defaultValue={issue?.status}
                render={({ field: { onChange } }) => (
                  <Select.Root
                    defaultValue={issue?.status}
                    onValueChange={(value) => onChange(value)}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item
                        disabled={issue?.status === "OPEN"}
                        value="OPEN"
                      >
                        Open
                      </Select.Item>
                      <Select.Item
                        disabled={issue?.status === "IN_PROGRESS"}
                        value="IN_PROGRESS"
                      >
                        In Progress
                      </Select.Item>
                      <Select.Item
                        disabled={issue?.status === "CLOSED"}
                        value="CLOSED"
                      >
                        Closed
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </Box>
          )}
        </Grid>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
