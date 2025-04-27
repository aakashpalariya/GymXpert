import React, { FC, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void; // Make onSubmit optional
  children: ReactNode;
  className?: string;
  isEncType?: boolean;
  encTypeVal?: string;
}

const Form: FC<FormProps> = ({
  onSubmit,
  children,
  className,
  isEncType,
  encTypeVal
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // If onSubmit is provided, prevent the default form submission and call it
    if (onSubmit) {
      event.preventDefault();
      onSubmit(event);
    }
    // If onSubmit is not provided, the form will submit normally
  };

  return (
    <form
      onSubmit={handleSubmit} // Use handleSubmit to check for optional onSubmit
      className={className}
      {...(isEncType && encTypeVal ? { encType: encTypeVal } : {})}
    >
      {children}
    </form>
  );
};

export default Form;
