"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { contactSchema } from "../_schemas/contact";

export async function submitContact(_prev: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: contactSchema, async: false });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // TODO: replace with a real call into the Go API client.
  // await api.post("/contacts", z.object({ id: z.string() }), submission.value);

  return submission.reply({ resetForm: true });
}
