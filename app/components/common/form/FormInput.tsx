import React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    control: Control<T>;
    type?: string;
    placeholder?: string;
    formMessage?: boolean
}

export function FormInput<T extends FieldValues>({
    name,
    label,
    control,
    type = 'text',
    placeholder,
    formMessage = true
}: FormInputProps<T>) {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    {formMessage && <FormMessage />}
                </FormItem>
            )}
        />
    );
}
