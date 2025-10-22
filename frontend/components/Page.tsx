interface PageProps {
  className?: string;
  children: React.ReactNode;
}

export const Page = ({ className, children }: PageProps) => {
  return <main className={className}>{children}</main>;
};
