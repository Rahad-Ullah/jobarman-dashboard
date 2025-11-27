import { z } from "zod";

export const addCategoryFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .nonempty({ message: "Name is required" }),
});
