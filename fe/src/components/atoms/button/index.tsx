interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  text = "text-white",
  icon,
  onClick,
  className = "",
  size = "md",
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={`${text} ${size} ${variant} px-4 py-2 rounded-lg font-semibold cursor-pointer ${className} bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20`}
      onClick={onClick}
      {...props}
    >
      {children}
      {icon && <span className="mr-2">{icon}</span>}
    </button>
  );
};

export default Button;
