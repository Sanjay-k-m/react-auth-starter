import React from 'react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { signupSchema, type SignupFormData } from '~/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '~/stores/auth.store';
import { AUTH_ROUTES } from '../../routes.paths';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { AppleIcon } from '~/assets/icons/components/AppleIcon';
import { GoogleIcon } from '~/assets/icons/components/GoogleIcon';
import { FormInput } from '~/components/common/form/FormInput';
import { FormPasswordInput } from '~/components/common/form/FormPasswordInput';
import { LoadingButton } from '~/components/common/ui/LoadingButton';
import { TextDivider } from '~/components/common/ui/TextDivider';
import { PrivacyPolicy } from '../common/PrivacyPolicy';
import type { AxiosError } from 'axios';
export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const { registerInitiate } = useAuthStore();
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit, control, formState } = methods;
  const { isSubmitting } = formState;
  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      const response = await registerInitiate(data);
      toast.success(response.message);
      navigate(AUTH_ROUTES.signupVerifyOtp(data.email), { replace: true });
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
          <CardDescription>SignUp with your Apple or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <AppleIcon />
                    Login with Apple
                  </Button>
                  <Button variant="outline" className="w-full">
                    <GoogleIcon />
                    Login with Google
                  </Button>
                </div>
                <TextDivider label=" Or continue with" />

                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormInput<SignupFormData>
                      name="email"
                      control={control}
                      label="Email"
                      placeholder="A@example.com"
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormPasswordInput<SignupFormData>
                      name="password"
                      control={control}
                      label="Password"
                      placeholder="Password"
                      forgotPasswordLink={AUTH_ROUTES.forgotPassword}
                    />
                  </div>
                  <LoadingButton type="submit" isLoading={isSubmitting} label="Sign Up" />
                </div>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to={AUTH_ROUTES.login} className="underline underline-offset-4">
                    Login
                  </Link>
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
