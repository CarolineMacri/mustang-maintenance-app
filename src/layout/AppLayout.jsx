// src/layout/AppLayout.jsx
import styles from './AppLayout.module.css';
import AppBrand from '../components/AppBrand';
import AssetSelector from '../components/AssetSelector';

export default function AppLayout({ assets }) {
  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={`${styles.header} chrome`}>
        <AppBrand />
        <AssetSelector assets={assets} />
      </header>

      {/* MAIN CONTENT */}
      <main className={styles.main}>
        {/* LEFT PANEL (1/3) */}
        <section className={`${styles.leftPanel} chrome`}>
          <h2>Assets</h2>
          <p>Asset panel (add/edit/delete)</p>
        </section>

        {/* RIGHT PANEL (2/3) */}
        <section className={`${styles.rightPanel} chrome`}>
          <h2>Maintenance Records</h2>
          <p>Table placeholder</p>

          {/* MODAL PLACEHOLDER */}
          <div className={styles.modalBackdrop}>
            <div className={`${styles.modal} chrome`}>
              <p>Modal (add/edit record)</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
