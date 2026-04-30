// src/components/AppBrand.jsx//
import styles from './AppBrand.module.css';

export default function AppBrand() {
  return (
    <div className={styles.brand}>
      <div className={styles.stripeMark} aria-hidden="true">
        <span className={`${styles.stripe} ${styles.stripeBold}`}></span>
        <span className={`${styles.stripe} ${styles.stripeMedium}`}></span>
        <span className={`${styles.stripe} ${styles.stripeThin}`}></span>
      </div>

      <div className={styles.textBlock}>
        <span className={styles.title}>Mustang</span>
        <span className={styles.title}>Maintenance</span>
      </div>
    </div>
  );
}
