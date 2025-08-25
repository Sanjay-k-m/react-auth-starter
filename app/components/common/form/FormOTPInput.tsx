import React from 'react';
import {type Control, type FieldValues, type Path } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from '~/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '~/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

interface FormOTPInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  length?: number; // default 6
  separator?: boolean; // whether to show separators
}

export function FormOTPInput<T extends FieldValues>({
  name,
  control,
  length = 6,
  separator = false,
}: FormOTPInputProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputOTP maxLength={length} pattern={REGEXP_ONLY_DIGITS} {...field}>
              {Array.from({ length }).map((_, i) => (
                <React.Fragment key={i}>
                  {/* Add separator in middle positions if enabled */}
                  {separator && i > 0 && i % 2 === 0 && <InputOTPSeparator />}
                  <InputOTPGroup>
                    <InputOTPSlot index={i} />
                  </InputOTPGroup>
                </React.Fragment>
              ))}
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
