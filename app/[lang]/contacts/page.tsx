"use client";

import { useDictionary } from "@/components/contexts/dictionary-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendToDiscordHook } from "../actions";
import { toast } from "sonner";
import { Inputs } from "@/lib/types";

export default function ContactsIndexPage() {
  const dict = useDictionary();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    sendToDiscordHook(data).then((response) => {
      const isError = response !== null && !response.success;
      toast(isError ? dict.contacts.error : dict.contacts.success, {
        description: isError ? response.error : dict.contacts.success_desc,
        position: "top-center",
      });
      if (response.success) {
        reset();
      }
    });
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-1 sm:min-h-[85.5vh] min-h-[85vh] pt-10">
      <div className="mb-7 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{dict.contacts.title}</h1>
        <p className="text-muted-foreground">{dict.contacts.sub_title}</p>
      </div>
      <div className="border rounded-md flex flex-row flex-wrap">
        <div className="p-4 w-full border-b lg:w-2/3 lg:border-r lg:border-b-0">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row flex-wrap gap-4 w-full">
              <div className="space-y-2 lg:w-auto w-full lg:flex-1">
                <Label htmlFor="email">{dict.contacts.email_label}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="aria-[invalid='true']:!bg-destructive/20 aria-[invalid='true']:!border-destructive"
                  {...register("email", {
                    required: true,
                    maxLength: 320,
                    pattern:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              <div className="space-y-2 lg:w-auto w-full lg:flex-1">
                <Label htmlFor="name">{dict.contacts.name_label}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="X Æ A-12"
                  className="aria-[invalid='true']:!bg-destructive/20 aria-[invalid='true']:!border-destructive"
                  {...register("name", { required: true, maxLength: 100 })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
              </div>
            </div>
            <div className="space-y-2 flex-1 relative">
              <Label htmlFor="text">{dict.contacts.text_label}</Label>
              <Textarea
                id="text"
                placeholder={dict.contacts.text_placeholder}
                className="aria-[invalid='true']:!bg-destructive/20 aria-[invalid='true']:!border-destructive"
                {...register("text", { required: true, maxLength: 500 })}
                aria-invalid={errors.text ? "true" : "false"}
              ></Textarea>
            </div>
            <Button type="submit">{dict.contacts.submit}</Button>
          </form>
        </div>
        <div className="p-6 text-muted-foreground flex items-center justify-center flex-grow max-w-1/3">
          <pre className="whitespace-pre font-code">
            POST /some-api HTTP/1.1{"\r\n"}
            {JSON.stringify(
              {
                email: watch("email") || null,
                name: watch("name") || null,
                message: watch("text")
                  ? watch("text").length > 5
                    ? watch("text").slice(0, 5) + "..."
                    : watch("text")
                  : null,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
