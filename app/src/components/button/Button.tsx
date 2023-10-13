import React, { FC } from 'react';
import { IButtonProps } from './Button.types';
import Link from 'next/link';
import { buttonStyles } from './Button.helpers';

const Button: FC<IButtonProps> = ({ label, type, disabled, navigate, style, onClick }) => {

  const buttonStyle = disabled ? buttonStyles['disabled'] : buttonStyles[style || 'primary'];

  return navigate ? (
    <Link href={navigate} type={type}
      className={buttonStyle}
      onClick={onClick}>
      {label}
    </Link>
  ) : (
    <button
      type={type}
      disabled={disabled}
      className={buttonStyle}
      onClick={onClick}
    >
      {label}
    </button>
  );
};


export default Button;
