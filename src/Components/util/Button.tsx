import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<any> {
  title?: string;
  className?: string;
  icon?: ReactNode;
  titleClassname?: string;
}

export function Button({
  title,
  className,
  icon,
  titleClassname,
  ...rest
}: Props) {
  return (
    <button {...rest} className={className}>
      {icon ? icon : null}
      <p className={titleClassname}>{title}</p>
    </button>
  );
}
