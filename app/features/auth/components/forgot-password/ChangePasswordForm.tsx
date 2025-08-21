import React from 'react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import {
    FormProvider,
    useForm,
    type SubmitHandler,
} from 'react-hook-form';
import { updatePasswordSchema, type UpdatePasswordSchemaData } from '~/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '~/stores/auth.store';
import { AUTH_ROUTES } from '../../routes.paths';
import { useNavigate } from 'react-router';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';

interface ChangePasswordFormProps extends React.ComponentProps<'div'> {
    token: string
}

export function ChangePasswordForm({ className, token, ...props }: ChangePasswordFormProps) {
    const navigate = useNavigate();
    const { resetPassword } = useAuthStore();

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
            const response = await resetPassword({ token, newPassword: data.newPassword })
            toast.success(response.message);
            navigate(AUTH_ROUTES.login, { replace: true });
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    // const onError: SubmitErrorHandler<LoginFormData> = (errors) => {
    //   Object.entries(errors).forEach(([_, err]) => {
    //     if (err.message)
    //       console.log(err.message);
    //   });
    // };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your Apple or Google account</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(
                                onSubmit,
                                // onError
                            )}
                        >
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={control}
                                            name="newPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            name="confirmPassword"
                                            control={control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center">
                                                        <FormLabel htmlFor="password">Confirm Password</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader className="animate-spin" /> : 'Update Password'}
                                    </Button>
                                </div>
                            </div>
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
