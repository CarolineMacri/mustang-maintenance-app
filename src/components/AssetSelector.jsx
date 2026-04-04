// src/components/AssetSelector.jsx

import styles from './AssetSelector.module.css';

export default function AssetSelector() {
  return (
    <div className={styles.selector}>
      <span className={styles.label}>Current Asset</span>

      <button type="button" className={styles.control}>
        <span className={styles.value}>1967 Mustang Coupe</span>
        <span className={styles.arrow} aria-hidden="true">
          ▼
        </span>
      </button>
    </div>
  );
}
