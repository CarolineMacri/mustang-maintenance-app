// src/components/AppBrand.jsx

import styles from './AppBrand.module.css';

export default function AppBrand() {
  return (
    <div className={styles.brand}>
      <div className={styles.iconWrap} aria-hidden="true">
        <span className={styles.icon} role="img" aria-label="horse">
          🐎
        </span>
      </div>

      <div className={styles.textBlock}>
        <span className={styles.title}>Mustang Maintenance</span>
      </div>
    </div>
  );
}
