import React from 'react';
import { cn } from '~/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { updatePasswordSchema, type UpdatePasswordSchemaData } from '~/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '~/stores/auth.store';
import { AUTH_ROUTES } from '../../routes.paths';
import { useNavigate } from 'react-router';

import { FormPasswordInput } from '~/components/common/form/FormPasswordInput';
import { LoadingButton } from '~/components/common/ui/LoadingButton';
import { PrivacyPolicy } from '../common/PrivacyPolicy';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface ChangePasswordFormProps extends React.ComponentProps<'div'> {
  token: string;
}

export function ResetPasswordForm({ className, token, ...props }: ChangePasswordFormProps) {
  const navigate = useNavigate();
  const { forgotPasswordConfirm } = useAuthStore();

  const methods = useForm<UpdatePasswordSchemaData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, control, formState } = methods;

  const { isSubmitting } = formState;

  // function onSubmit(values:<LoginFormData>){
  const onSubmit: SubmitHandler<UpdatePasswordSchemaData> = async (data) => {
    try {
      const response = await forgotPasswordConfirm({ token, newPassword: data.newPassword });
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
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Apple or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormPasswordInput<UpdatePasswordSchemaData>
                      control={control}
                      name="newPassword"
                      label="New Password"
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormPasswordInput<UpdatePasswordSchemaData>
                      control={control}
                      name="confirmPassword"
                      label="Confirm Password"
                    />
                  </div>
                  <LoadingButton label="Continue" type="submit" isLoading={isSubmitting} />
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <PrivacyPolicy />
    </div>
  );
}
