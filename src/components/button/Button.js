// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Button.module.css'

const Button = React.memo(({ className, disabled, onClick, children, variant }) => {
  return (
    <button className={`${styles.button} ${className}`} disabled={disabled} onClick={onClick} data-variant={variant}>{children}</button>
  );
})

export default Button
