import React, { forwardRef, useId, ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "default" | "error" | "success";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  errorMessage?: string;

  size?: InputSize;
  variant?: InputVariant;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  containerClassName?: string;
  inputClassName?: string;

  onValueChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      errorMessage,

      size = "md",
      variant = "default",

      startAdornment,
      endAdornment,

      containerClassName,
      inputClassName,

      disabled,
      required,
      id,

      onChange,
      onValueChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const baseInputClasses =
      "w-full rounded-sm border bg border-border-main place-holder:text-support-100 focus:outline-none focus:ring-1 transition";

    const sizeClasses: Record<InputSize, string> = {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    };

    const variantClasses: Record<InputVariant, string> = {
      default:
        "border-border-main focus:border-blue-500 focus:ring-blue-500",
      error:
        "border-red-500 focus:border-red-500 focus:ring-red-500",
      success:
        "border-green-500 focus:border-green-500 focus:ring-green-500",
    };

    const inputClasses = twMerge(
      clsx(
        baseInputClasses,
        sizeClasses[size],
        variantClasses[variant],
        disabled && "bg text-gray-500 cursor-not-allowed",
        startAdornment && "pl-9",
        endAdornment && "pr-9"
      ),
      inputClassName
    );

    return (
      <div className={twMerge("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}

        <div className="relative">
          {startAdornment && (
            <span className="absolute inset-y-0 left-3 flex items-center ">
              {startAdornment}
            </span>
          )}

          <input
            {...rest}
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={variant === "error"}
            onChange={handleChange}
            className={inputClasses}
          />

          {endAdornment && (
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {endAdornment}
            </span>
          )}
        </div>

        {description && !errorMessage && (
          <p className="text-xs text-gray-500">{description}</p>
        )}

        {errorMessage && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
