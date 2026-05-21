"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitContact } from "../_actions/submit-contact";
import { contactSchema } from "../_schemas/contact";

export function ContactForm() {
  const [lastResult, formAction, pending] = useActionState(submitContact, null);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema, async: false });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      action={formAction}
      onSubmit={form.onSubmit}
      noValidate
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor={fields.name.id}>Name</Label>
        <Input
          id={fields.name.id}
          name={fields.name.name}
          defaultValue={fields.name.initialValue as string | undefined}
          aria-invalid={!fields.name.valid}
          aria-describedby={fields.name.errorId}
        />
        {fields.name.errors ? (
          <p id={fields.name.errorId} className="text-sm text-destructive">
            {fields.name.errors[0]}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={fields.email.id}>Email</Label>
        <Input
          id={fields.email.id}
          name={fields.email.name}
          type="email"
          defaultValue={fields.email.initialValue as string | undefined}
          aria-invalid={!fields.email.valid}
          aria-describedby={fields.email.errorId}
        />
        {fields.email.errors ? (
          <p id={fields.email.errorId} className="text-sm text-destructive">
            {fields.email.errors[0]}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={fields.message.id}>Message</Label>
        <textarea
          id={fields.message.id}
          name={fields.message.name}
          defaultValue={fields.message.initialValue as string | undefined}
          aria-invalid={!fields.message.valid}
          aria-describedby={fields.message.errorId}
          rows={5}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        {fields.message.errors ? (
          <p id={fields.message.errorId} className="text-sm text-destructive">
            {fields.message.errors[0]}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
