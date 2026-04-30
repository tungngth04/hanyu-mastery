import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  className = "",
  size = "md",
  variant = "primary",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ease-in-out";

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-base",
  };

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-[0.97]",
    outline:
      "border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.97]",
    ghost: "text-slate-600 hover:bg-slate-100 active:scale-[0.97]",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
