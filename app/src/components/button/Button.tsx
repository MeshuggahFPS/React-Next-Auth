import React, { FC } from 'react';
import { IButtonProps } from './Button.types';
import Link from 'next/link';
import { buttonStyles } from './Button.helpers';

const Button: FC<IButtonProps> = ({ label, type, disabled, navigate, style, onClick }) => {

  const buttonStyle = disabled ? buttonStyles['disabled'] : buttonStyles[style || 'primary'];

  const buttonContent = (
    <button
      type={type}
      disabled={disabled}
      className={buttonStyle}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return navigate ? (
    <Link href={navigate}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};


export default Button;
