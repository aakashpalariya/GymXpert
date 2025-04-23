import React, { FC, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
  isEncType?: boolean; // should be boolean, not "false"
  encTypeVal?: string; // should be a string, not ""
}

const Form: FC<FormProps> = ({
  onSubmit,
  children,
  className,
  isEncType,
  encTypeVal
}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
      className={className}
      {...(isEncType && encTypeVal ? { encType: encTypeVal } : {})}
    >
      {children}
    </form>
  );
};

export default Form;
