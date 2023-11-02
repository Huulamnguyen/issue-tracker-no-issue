import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).default("OPEN"),
  customerEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .nullable()
    .optional(),
  category: z
    .enum([
      "SHIPPING",
      "DISCOUNT",
      "ORDER",
      "HOURS",
      "ADDRESS",
      "REFUND",
      "MISSING",
      "DAMAGE",
      "RETURN",
      "WARRANTY",
      "OTHER",
    ])
    .default("OTHER"),
  orderNumber: z.string().optional().nullable(),
});

export const questionSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  category: z
    .enum([
      "SHIPPING",
      "DISCOUNT",
      "ORDER",
      "HOURS",
      "ADDRESS",
      "REFUND",
      "MISSING",
      "DAMAGE",
      "RETURN",
      "WARRANTY",
      "OTHER",
    ])
    .default("OTHER"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).default("OPEN"),
  customerEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .nullable(),
  category: z
    .enum([
      "SHIPPING",
      "DISCOUNT",
      "ORDER",
      "HOURS",
      "ADDRESS",
      "REFUND",
      "MISSING",
      "DAMAGE",
      "RETURN",
      "WARRANTY",
      "OTHER",
    ])
    .default("OTHER"),
  orderNumber: z.string().optional().nullable(),
});
