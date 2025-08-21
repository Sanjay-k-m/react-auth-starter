import React from 'react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '~/components/ui/input-otp';
import { FormProvider, useForm, } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '~/components/ui/form';
import { otpSchema, type OtpFormData } from '~/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '~/stores/auth.store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { AUTH_ROUTES } from '../../routes.paths';
import { Loader } from 'lucide-react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

interface VerifyOtpFormProps extends React.ComponentProps<'div'> {
  email: string;
}

export function VerifyOtpForm({ className, email, ...props }: VerifyOtpFormProps) {
  const navigate = useNavigate();
  const { verifyOtp } = useAuthStore();

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
      await verifyOtp(email, data.otp);
      await navigate(AUTH_ROUTES.logout, { replace: true });
      toast.success('Signup Success');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  // const onError: SubmitErrorHandler<OtpFormData> = (errors) => {
  //   if (errors.otp?.message) {
  //     toast.warning(errors.otp.message);
  //   }
  // };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Please enter the OTP sent to your email {email}.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onsubmit,
              // onError
            )} className="grid gap-6 justify-center">
              <FormField
                control={control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : 'Submit'}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
