import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  color = 'primary',
  size = 'medium',
  roundness = 'medium',
  withIcon,
  iconPosition = 'left',
  className = '',
  link = null,
  ...props
}) => {
  const baseClasses = 'flex items-center justify-center font-semibold focus:outline-none transition-transform';
  const colorClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
  };
  const sizeClasses = {
    small: 'text-sm w-8 h-8',
    medium: 'text-base w-12 h-12',
    large: 'text-lg w-16 h-16',
  };
  const roundnessClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full',
  };

  const classes = `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${roundnessClasses[roundness]} ${className}`;

  const content = (
    <>
      {withIcon && iconPosition === 'left' && (
        <span className="flex items-center justify-center">
          {withIcon}
        </span>
      )}
      {children && <span>{children}</span>}
      {withIcon && iconPosition === 'right' && (
        <span className="flex items-center justify-center">
          {withIcon}
        </span>
      )}
    </>
  );

  return link ? (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
      href={link}
      {...props}
    >
      {content}
    </motion.a>
  ) : (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  roundness: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'full']),
  withIcon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  link: PropTypes.string,
};

export default Button;

