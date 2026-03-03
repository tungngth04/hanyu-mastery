import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = ({
  children,
  className = "",
  ...props
}: CardContentProps) => {
  return (
    <div className={`p-8 ${className}`} {...props}>
      {children}
    </div>
  );
};
