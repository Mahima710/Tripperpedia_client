import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  errorClass?: string;
  error?: boolean;
  errorMessage?: string;
  rounded?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      children,
      errorClass = "font-medium tracking-wide text-red-500 text-xs mt-1 ml-1",
      type = "text",
      errorMessage = "Please check your input",
      error = false,
      fullWidth = false,
      ...args
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${fullWidth ? "w-full" : ""}`}>
        <input
          ref={ref}
          type={type}
          className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
          {...args}
        />
        {error && (
          <p className="font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
