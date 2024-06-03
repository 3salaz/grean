import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "",
  size = "medium",
  shape = "rounded",
  ...props
}) => {
  const variants = {
    primary: "bg-white text-grean hover:bg-grean hover:text-white",
    secondary: "bg-gray-500 text-white hover:bg-gray-700",
    alert: "bg-red-500 text-white hover:bg-red-700",
  };
  

  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const shapes = {
    rounded: "rounded-md",
    circle: "rounded-full",
    square: "rounded-none",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      className={`transition duration-300 ${variants[variant]} ${sizes[size]} ${shapes[shape]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
