// src/components/button.jsx

import styles from './Button.module.css';

function Button({
  children,
  type = 'button',
  className = '',
  role = 'secondary',
  size = 'medium',
  icon = null,
  iconOnly = false,
  ...props
}) {
  const classes = [
    styles.button,
    styles[role],
    styles[size],
    iconOnly ? styles.iconOnly : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={classes} {...props}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {!iconOnly && children ? (
        <span className={styles.label}>{children}</span>
      ) : null}
    </button>
  );
}

export default Button;
