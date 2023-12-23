"use client";

import { CalloutInfoMessage } from "@/app/components";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Select,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { status, data: session } = useSession();
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
  const [sucessfullySubmitted, setSucessfullySubmitted] = useState(false);

  const statuses: { label: string; value?: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const categories = [
    { label: "Shipping", value: "SHIPPING" },
    { label: "Discount", value: "DISCOUNT" },
    { label: "Order", value: "ORDER" },
    { label: "Hours", value: "HOURS" },
    { label: "Address", value: "ADDRESS" },
    { label: "Refund", value: "REFUND" },
    { label: "Missing", value: "MISSING" },
    { label: "Damage", value: "DAMAGE" },
    { label: "Return", value: "RETURN" },
    { label: "Warranty", value: "WARRANTY" },
    { label: "Other", value: "OTHER" },
  ];

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else {
        await axios.post("/api/issues", data);
        await axios.post("/api/send-confirm-email", data);
        await axios.post("/api/send-received-email", data);
      }

      setSucessfullySubmitted(true);
      setTimeout(async () => {
        if (session?.user?.email === "liamnguyen.swe@gmail.com") {
          router.push("/issues/list");
        } else {
          router.push("/questions/list");
        }
        router.refresh();
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      setSucessfullySubmitted(false);
      setError("An unexpected error occurred.");
    }
  });

  if (sucessfullySubmitted) {
    return (
      <>
        <CalloutInfoMessage>
          Susucessfully Submitted the form. We will get back to you soon by your
          email in next 48 hours. Thank you!
        </CalloutInfoMessage>
      </>
    );
  }

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Grid gap="3">
          <Box>
            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.title}
                placeholder="What is the issue?"
                {...register("title")}
              />
            </TextField.Root>
          </Box>

          {issue && (
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
                    <Select.Group>
                      <Select.Label>Status</Select.Label>
                      {statuses.map((status) => (
                        <Select.Item
                          key={status.value}
                          disabled={issue?.status === status.value}
                          value={status.value!}
                        >
                          {status.label}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              )}
            />
          )}
          <Grid columns={{ initial: "1", md: "3" }} gap="5">
            <Controller
              name="category"
              control={control}
              defaultValue={issue?.category}
              render={({ field: { onChange } }) => (
                <Select.Root
                  defaultValue={issue?.category}
                  onValueChange={(value) => onChange(value)}
                >
                  <Select.Trigger placeholder="Category" />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Category</Select.Label>
                      {categories.map((category) => (
                        <Select.Item
                          key={category.value}
                          disabled={issue?.category === category.value}
                          value={category.value!}
                        >
                          {category.label}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              )}
            />

            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.customerEmail || undefined}
                placeholder="Email"
                {...register("customerEmail")}
              />
            </TextField.Root>

            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.orderNumber || undefined}
                placeholder="Order ANS-xxxx"
                {...register("orderNumber")}
              />
            </TextField.Root>
          </Grid>
        </Grid>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <ErrorMessage>{errors.customerEmail?.message}</ErrorMessage>
        <ErrorMessage>{errors.orderNumber?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Can you tell me more!" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button variant="classic" disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
