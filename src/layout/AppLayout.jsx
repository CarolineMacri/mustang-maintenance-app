// src/layout/AppLayout.jsx
import styles from './AppLayout.module.css';
import AppBrand from '../components/AppBrand';
import AssetSelector from '../components/AssetSelector';

export default function AppLayout({
  assets,
  selectedAsset,
  selectedAssetId,
  onSelectAsset,
}) {
  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={`${styles.header} chrome`}>
        <AppBrand />
        <AssetSelector
          assets={assets}
          selectedAssetId={selectedAssetId}
          onSelectAsset={onSelectAsset}
        />
      </header>

      {/* MAIN CONTENT */}
      <main className={styles.main}>
        {/* LEFT PANEL (1/3) */}
        <section className={`${styles.leftPanel} chrome`}>
          <h2>Assets</h2>
          {selectedAsset ? (
            <>
              <p>{selectedAsset.name}</p>
              <p>
                {selectedAsset.make} {selectedAsset.model}
              </p>
            </>
          ) : (
            <p>No asset selected</p>
          )}
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
