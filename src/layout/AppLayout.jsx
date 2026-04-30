// src/layout/AppLayout.jsx
import { useState } from 'react';

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
  maintenanceStatuses,
  isCreatingAsset,
  onAddAsset,
  onSelectAsset,
  onSaveAsset,
  onDeleteAsset,
  onSaveMaintenance,
  onDeleteMaintenance,
  onAddMaintenanceStatus,
  onOpenAssetReport,
}) {
  const [reportStatusFilter, setReportStatusFilter] = useState('all');
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');

  function handleOpenFilteredAssetReport() {
    onOpenAssetReport({
      statusFilter: reportStatusFilter,
      startDate: reportStartDate,
      endDate: reportEndDate,
    });
  }

  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={`${styles.header} chrome`}>
        <AppBrand />
        <div className={styles.reportControls}>
          <label className={styles.reportField}>
            <span className={styles.reportLabel}>Status</span>
            <select
              className={styles.reportControl}
              value={reportStatusFilter}
              onChange={(e) => setReportStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="lent">Lent</option>
            </select>
          </label>

          <label className={styles.reportField}>
            <span className={styles.reportLabel}>Start</span>
            <input
              className={styles.reportControl}
              type="date"
              value={reportStartDate}
              onChange={(e) => setReportStartDate(e.target.value)}
            ></input>
          </label>
          <label className={styles.reportField}>
            <span className={styles.reportlabel}>End</span>
            <input
              className={styles.reportControl}
              type="date"
              value={reportEndDate}
              onChange={(e) => setReportEndDate(e.target.value)}
            ></input>
          </label>

          <Button role="secondary" onClick={handleOpenFilteredAssetReport}>
            Assets Report
          </Button>
        </div>
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
            onDelete={onDeleteAsset}
          />
        </section>

        {/* RIGHT PANEL (2/3) */}
        <section className={`${styles.rightPanel} chrome`}>
          <MaintenancePanel
            records={selectedMaintenanceRecords}
            selectedAssetId={selectedAssetId}
            maintenanceStatuses={maintenanceStatuses}
            onSaveMaintenance={onSaveMaintenance}
            onDeleteMaintenance={onDeleteMaintenance}
            onAddMaintenanceStatus={onAddMaintenanceStatus}
          />
        </section>
      </main>
    </div>
  );
}
