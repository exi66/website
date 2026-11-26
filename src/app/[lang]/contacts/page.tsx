'use client';

import { useDictionary } from '@/components/contexts/dictionary-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { sendToDiscordHook } from '../actions';
import { toast } from 'sonner';
import { ContactForm } from '@/lib/types';
import { CONTACT_MAX_LENGTH, EMAIL_PATTERN } from '@/lib/contact';

const invalidFieldClassName = "aria-[invalid='true']:bg-destructive/20! aria-[invalid='true']:border-destructive!";

export default function ContactsIndexPage() {
  const dict = useDictionary();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const { email, name, text } = watch();

  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    const toastOptions = { position: 'top-center' } as const;
    try {
      const response = await sendToDiscordHook(data);
      if (response.success) {
        toast(dict.contacts.success, {
          ...toastOptions,
          description: dict.contacts.success_desc,
        });
        reset();
      } else {
        toast(dict.contacts.error, {
          ...toastOptions,
          description: dict.contacts.errors[response.error],
        });
      }
    } catch {
      toast(dict.contacts.error, {
        ...toastOptions,
        description: dict.contacts.errors.server,
      });
    }
  };

  const maxLength = (max: number) => ({
    value: max,
    message: dict.contacts.errors.too_long.replace('{max}', String(max)),
  });

  return (
    <div className="mx-auto flex min-h-[85vh] w-full flex-col gap-1 pt-2 sm:min-h-[85.5vh]">
      <div className="mb-7 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{dict.contacts.title}</h1>
        <p className="text-muted-foreground">{dict.contacts.sub_title}</p>
      </div>
      <div className="flex flex-row flex-wrap rounded-md border">
        <div className="w-full border-b p-4 lg:w-2/3 lg:border-r lg:border-b-0">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex w-full flex-row flex-wrap gap-4">
              <div className="w-full space-y-2 lg:w-auto lg:flex-1">
                <Label htmlFor="email">{dict.contacts.email_label}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  className={invalidFieldClassName}
                  {...register('email', {
                    required: dict.contacts.errors.required,
                    maxLength: maxLength(CONTACT_MAX_LENGTH.email),
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: dict.contacts.errors.email_invalid,
                    },
                  })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <FieldErrorMessage id="email-error" error={errors.email} />
              </div>
              <div className="w-full space-y-2 lg:w-auto lg:flex-1">
                <Label htmlFor="name">{dict.contacts.name_label}</Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="X Æ A-12"
                  className={invalidFieldClassName}
                  {...register('name', {
                    required: dict.contacts.errors.required,
                    maxLength: maxLength(CONTACT_MAX_LENGTH.name),
                    validate: (value) => value.trim().length > 0 || dict.contacts.errors.required,
                  })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <FieldErrorMessage id="name-error" error={errors.name} />
              </div>
            </div>
            <div className="relative flex-1 space-y-2">
              <Label htmlFor="text">{dict.contacts.text_label}</Label>
              <Textarea
                id="text"
                placeholder={dict.contacts.text_placeholder}
                rows={1}
                className={cn('min-h-0', invalidFieldClassName)}
                {...register('text', {
                  required: dict.contacts.errors.required,
                  maxLength: maxLength(CONTACT_MAX_LENGTH.text),
                  validate: (value) => value.trim().length > 0 || dict.contacts.errors.required,
                })}
                aria-invalid={errors.text ? 'true' : 'false'}
                aria-describedby={errors.text ? 'text-error' : undefined}
              />
              <FieldErrorMessage id="text-error" error={errors.text} />
            </div>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              {...register('website')}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? dict.contacts.sending : dict.contacts.submit}
            </Button>
          </form>
        </div>
        <div className="flex flex-grow items-center justify-center p-6 text-muted-foreground">
          <pre className="font-mono whitespace-pre">
            POST /some-api HTTP/1.1{'\r\n'}
            {JSON.stringify(
              {
                email: email || null,
                name: name || null,
                message: text ? (text.length > 5 ? text.slice(0, 5) + '...' : text) : null,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

function FieldErrorMessage({ id, error }: { id: string; error?: FieldError }) {
  if (!error?.message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {error.message}
    </p>
  );
}
