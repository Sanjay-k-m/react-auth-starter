import React from "react";
import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

interface FormPasswordInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    forgotPasswordLink?: string;
    showMessage?: boolean;
}

export function FormPasswordInput<T extends FieldValues>({
    name,
    control,
    label = "Password",
    placeholder,
    forgotPasswordLink,
    showMessage = true,
}: FormPasswordInputProps<T>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center">
                        <FormLabel htmlFor={field.name}>{label}</FormLabel>
                        {forgotPasswordLink && (
                            <Link
                                to={forgotPasswordLink}
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <FormControl>
                        <div className="relative">
                            <Input
                                id={field.name}
                                type={showPassword ? "text" : "password"}
                                placeholder={placeholder}
                                {...field}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </FormControl>

                    {showMessage && <FormMessage />}
                </FormItem>
            )}
        />
    );
}
