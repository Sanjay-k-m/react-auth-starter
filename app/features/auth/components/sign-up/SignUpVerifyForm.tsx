import React from 'react';
import { cn } from '~/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormProvider, useForm } from 'react-hook-form';
import { otpSchema, type OtpFormData } from '~/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '~/stores/auth.store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { AUTH_ROUTES } from '../../routes.paths';
import { FormOTPInput } from '~/components/common/form/FormOTPInput';
import { LoadingButton } from '~/components/common/ui/LoadingButton';
import { PrivacyPolicy } from '../common/PrivacyPolicy';
import type { AxiosError } from 'axios';

interface VerifyOtpFormProps extends React.ComponentProps<'div'> {
  email: string;
}

export function SignUpVerifyForm({ className, email, ...props }: VerifyOtpFormProps) {
  const navigate = useNavigate();
  const { registerConfirm } = useAuthStore();

  const methods = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { handleSubmit, control, formState } = methods;
  const { isSubmitting } = formState;

  const onsubmit = async (data: OtpFormData) => {
    try {
      const response = await registerConfirm({ email, otp: data.otp });
      await navigate(AUTH_ROUTES.logout, { replace: true });
      toast.success(response.message);
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
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Please enter the OTP sent to your email {email}.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onsubmit)} className="grid gap-6 justify-center">
              <FormOTPInput control={control} name="otp" length={6} />
              <LoadingButton isLoading={isSubmitting} label="Continue" type="submit" />
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <PrivacyPolicy />
    </div>
  );
}
