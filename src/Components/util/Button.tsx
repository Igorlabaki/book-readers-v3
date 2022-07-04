import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<any> {
  title?: string;
  className?: string;
  icon?: ReactNode;
}

export function Button({ title, className, icon, ...rest }: Props) {
  return (
    <button {...rest} className={className}>
      {icon ? icon : null}
      <p>{title}</p>
    </button>
  );
}
