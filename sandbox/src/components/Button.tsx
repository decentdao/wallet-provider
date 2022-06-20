import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function Button({ label, className, ...rest }: IButton) {
  return (
    <button
      className={`sandbox-button ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}
