import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  isLink?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  className,
  isLink = false,
  href = "#",
  onClick,
}: ButtonProps) => {
  return (
    <>
      {isLink ? (
        <Link
          onClick={onClick}
          href={href}
          className={clsx(
            "bg-white text-black py-3 px-10 rounded-3xl font-medium tracking-[2px] cursor-pointer border border-transparent xl:hover:border-white xl:hover:bg-transparent xl:hover:text-white transition-all duration-300",
            className
          )}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={clsx(
            "bg-white text-black py-3 px-10 rounded-3xl font-medium tracking-[2px] cursor-pointer border border-transparent xl:hover:border-white xl:hover:bg-transparent xl:hover:text-white transition-all duration-300",
            className
          )}
        >
          {children}
        </button>
      )}
    </>
  );
};
