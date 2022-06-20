import { ReactNode } from 'react';

interface IContainer {
  children: ReactNode;
}

export function Container({ children }: IContainer) {
  return <div className="container">{children}</div>;
}
