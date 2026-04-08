// src/layout/AppLayout.jsx
import styles from './AppLayout.module.css';
import AppBrand from '../components/AppBrand';
import AssetSelector from '../components/AssetSelector';
import AssetPanel from '../components/AssetPanel';
import MaintenancePanel from '../components/MaintenancePanel';

export default function AppLayout({
  assets,
  selectedAsset,
  selectedAssetId,
  selectedMaintenanceRecords,
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
          <AssetPanel selectedAsset={selectedAsset} />
        </section>

        {/* RIGHT PANEL (2/3) */}
        <section className={`${styles.rightPanel} chrome`}>
          <MaintenancePanel records={selectedMaintenanceRecords} />

          {/* MODAL PLACEHOLDER */}
          {/* <div className={styles.modalBackdrop}>
            <div className={`${styles.modal} chrome`}>
              <p>Modal (add/edit record)</p>
            </div>
          </div> */}
        </section>
      </main>
    </div>
  );
}
