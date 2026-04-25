// src/layout/AppLayout.jsx
import styles from './AppLayout.module.css';
import AppBrand from '../components/AppBrand';
import AssetSelector from '../components/AssetSelector';
import AssetPanel from '../components/AssetPanel';
import MaintenancePanel from '../components/MaintenancePanel';
import Button from '../components/Button';

export default function AppLayout({
  assets,
  selectedAsset,
  selectedAssetId,
  selectedMaintenanceRecords,
  isCreatingAsset,
  onAddAsset,
  onSelectAsset,
  onSaveAsset,
  onSaveMaintenance,
}) {
  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={`${styles.header} chrome`}>
        <AppBrand />
        <Button role="primary">Primary</Button>
        <Button role="secondary">Secondary</Button>
        <Button role="destructive">Destructive</Button>
        <div className={styles.headerRight}>
          <AssetSelector
            assets={assets}
            selectedAssetId={selectedAssetId}
            onSelectAsset={onSelectAsset}
          />
          <Button role="primary" icon="➕" onClick={onAddAsset}>
            Add Asset
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={styles.main}>
        {/* LEFT PANEL (1/3) */}
        <section className={`${styles.leftPanel} chrome`}>
          <AssetPanel
            selectedAsset={selectedAsset}
            isCreating={isCreatingAsset}
            onSave={onSaveAsset}
          />
        </section>

        {/* RIGHT PANEL (2/3) */}
        <section className={`${styles.rightPanel} chrome`}>
          <MaintenancePanel
            records={selectedMaintenanceRecords}
            onSaveMaintenance={onSaveMaintenance}
          />

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
