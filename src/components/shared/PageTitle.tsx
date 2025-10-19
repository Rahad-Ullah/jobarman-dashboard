const PageTitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return <h1 className={`text-4xl font-semibold text-primary ${className}`}>{children}</h1>;
};

export default PageTitle;
