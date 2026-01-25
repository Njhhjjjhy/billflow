// Custom hook for using react-hook-form with Zod validation
// Provides type-safe form handling with automatic validation

import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

/**
 * useZodForm - Type-safe form hook with Zod validation
 *
 * @example
 * ```tsx
 * const form = useZodForm({
 *   schema: clientSchema,
 *   defaultValues: {
 *     display_name: "",
 *     email: "",
 *   },
 * });
 *
 * const onSubmit = form.handleSubmit((data) => {
 *   // data is fully typed based on schema
 *   console.log(data);
 * });
 * ```
 */
export function useZodForm<TFormData extends FieldValues>(
  props: Omit<UseFormProps<TFormData>, "resolver"> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: z.ZodType<TFormData, any, any>;
  }
): UseFormReturn<TFormData> {
  const { schema, ...formProps } = props;

  return useForm<TFormData>({
    ...formProps,
    // Type assertion needed due to Zod v4 type changes
    resolver: zodResolver(schema) as unknown as Resolver<TFormData>,
  });
}

/**
 * Type helper for form data based on schema
 */
export type FormData<T extends z.ZodType> = z.infer<T>;

/**
 * Type helper for form errors
 */
export type FormErrors<T extends FieldValues> = Partial<
  Record<keyof T, { message?: string }>
>;
