import React from "react";
import {
  useForm,
  type FieldError,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { createConstituent } from "../api/constituents";
import { Plus } from "lucide-react";

interface FormFieldProps {
  id: "name" | "email" | "address";
  label: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<FormInputs>;
  error: FieldError | undefined;
}

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
}: FormFieldProps) => {
  const baseInputClasses =
    "block w-full text-sm rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 focus:outline-none";
  const errorInputClasses = "ring-red-500 focus:ring-red-600";

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, { required: `${label} is required` })}
          className={`${baseInputClasses} ${error ? errorInputClasses : ""}`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

interface FormInputs {
  name: string;
  email: string;
  address: string;
}

interface ConstituentFormProps {
  onSuccess: () => void;
}

export const ConstituentForm = ({ onSuccess }: ConstituentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: { name: "", email: "", address: "" },
  });
  const [serverError, setServerError] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setServerError(null);
    try {
      await createConstituent(data);
      onSuccess();
      reset();
    } catch {
      setServerError("An unknown error occurred. Please try again later 🥺");
    }
  };

  const primaryButtonClasses =
    "inline-flex items-center gap-1 bg-purple-800 text-white text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-purple-800 transition-colors";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-200 mb-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Add Constituent</h2>
        <p className="mt-1 text-sm text-gray-500">
          Add a new person to the newsletter list.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 gap-x-4">
          <FormField
            id="name"
            label="Full Name"
            placeholder="Jane Doe"
            register={register}
            error={errors.name}
          />
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="jane.doe@example.com"
            register={register}
            error={errors.email}
          />
          <FormField
            id="address"
            label="Street Address"
            placeholder="123 Main St, Anytown, USA"
            register={register}
            error={errors.address}
          />
        </div>

        {serverError && (
          <div className="text-center mt-4 border-t border-gray-200 pt-4">
            <p className="text-sm text-red-600">{serverError}</p>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={primaryButtonClasses}
          >
            <Plus className="-ml-1 w-4 h-4" />
            {isSubmitting ? "Submitting..." : "Add Constituent"}
          </button>
        </div>
      </form>
    </div>
  );
};
