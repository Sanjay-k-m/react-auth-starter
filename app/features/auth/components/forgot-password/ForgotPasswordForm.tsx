import React from 'react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { forgotPasswordSchema, type ForgotPasswordSchemaData } from '~/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '~/stores/auth.store';
import { AUTH_ROUTES } from '../../routes.paths';
import { useNavigate } from 'react-router';

import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Loader } from 'lucide-react';

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const { forgotPassword } = useAuthStore();

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
      await forgotPassword(data);
      navigate(AUTH_ROUTES.login, { replace: true });
      toast.success('Check your email for a link to reset your password.');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      console.log(error);
    }
  };
  // const onError: SubmitErrorHandler<ForgotPasswordSchemaData> = (errors) => {
  //   Object.entries(errors).forEach(([_, err]) => {
  //     if (err.message) toast.warning(err.message);
  //   });
  // };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to get a link to reset your password. </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit,
              //  onError
            )} className="grid gap-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        required
                        placeholder="A@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader className="animate-spin" /> : 'Submit'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
