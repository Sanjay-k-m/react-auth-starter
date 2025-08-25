import React from 'react';
import { cn } from '~/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { forgotPasswordSchema, type ForgotPasswordSchemaData } from '~/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '~/stores/auth.store';
import { AUTH_ROUTES } from '../../routes.paths';
import { useNavigate } from 'react-router';

import { toast } from 'sonner';
import { Form } from '~/components/ui/form';
import { LoadingButton } from '~/components/common/ui/LoadingButton';
import { FormInput } from '~/components/common/form/FormInput';
import { PrivacyPolicy } from '../common/PrivacyPolicy';
import type { AxiosError } from 'axios';

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const { forgotPasswordInitiate } = useAuthStore();

  const methods = useForm<ForgotPasswordSchemaData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, control, formState } = methods;

  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<ForgotPasswordSchemaData> = async (data) => {
    try {
      const response = await forgotPasswordInitiate(data);
      toast.success(response.message);
      navigate(AUTH_ROUTES.login, { replace: true });
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error) toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to get a link to reset your password. </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              <FormInput
                name="email"
                label="Email"
                control={control}
                placeholder="A@example.com"
                type="email"
              />
              <LoadingButton label="Continue" type="submit" isLoading={isSubmitting} />
            </form>
          </Form>
        </CardContent>
      </Card>
      <PrivacyPolicy />
    </div>
  );
}
