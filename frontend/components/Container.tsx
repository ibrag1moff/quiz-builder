import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div
      className={clsx("max-w-xl mx-auto mt-10 px-4", className)}
      id={id || ""}
    >
      {children}
    </div>
  );
};
