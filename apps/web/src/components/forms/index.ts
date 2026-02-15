// Form Components - Billflow
// Integrates with react-hook-form and Zod validation

// FormField wrapper
export { FormField } from "./FormField";
export type { FormFieldProps } from "./FormField";

// Form Input
export { FormInput, BaseInput } from "./FormInput";
export type { FormInputProps, BaseInputProps } from "./FormInput";

// Form Select
export { FormSelect } from "./FormSelect";
export type { FormSelectProps, SelectOption } from "./FormSelect";

// Form Textarea
export { FormTextarea } from "./FormTextarea";
export type { FormTextareaProps } from "./FormTextarea";

// Form Checkbox
export { FormCheckbox } from "./FormCheckbox";
export type { FormCheckboxProps } from "./FormCheckbox";

// Re-export react-hook-form essentials for convenience
export {
  useForm,
  useFormContext,
  FormProvider,
  Controller,
  useWatch,
  useFieldArray,
} from "react-hook-form";

// Re-export resolver
export { zodResolver } from "@hookform/resolvers/zod";
