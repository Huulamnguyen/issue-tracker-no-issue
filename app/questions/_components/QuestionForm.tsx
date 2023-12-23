"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { questionSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Grid,
  Select,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type QuestionFormData = z.infer<typeof questionSchema>;

const QuestionForm = ({ question }: { question?: Question }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

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
      if (question) axios.patch("/api/questions/" + question.id, data);
      else await axios.post("/api/questions", data);
      router.push("/questions/list");
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
        <Grid gap="3">
          <TextField.Root>
            <TextField.Input
              defaultValue={question?.title}
              placeholder="Question title"
              {...register("title")}
            />
          </TextField.Root>

          <Controller
            name="category"
            control={control}
            defaultValue={question?.category}
            render={({ field: { onChange } }) => (
              <Select.Root
                defaultValue={question?.category}
                onValueChange={(value) => onChange(value)}
              >
                <Select.Trigger
                  placeholder={
                    question ? question.category : "Choose a category"
                  }
                />
                <Select.Content>
                  {categories.map((category) => (
                    <Select.Item
                      key={category.value}
                      value={category.value}
                      disabled={question?.category === category.value}
                    >
                      {category.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </Grid>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={question?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button variant="classic" disabled={isSubmitting}>
          {question ? "Update Question" : "Submit New Question"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default QuestionForm;
