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

        <label>
          Status
          <select
            value={reportStatusFilter}
            onChange={(e) => setReportStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="lent">Lent</option>
          </select>
        </label>

        <label>
          Start
          <input
            type="date"
            value={reportStartDate}
            onChange={(e) => setReportStartDate(e.target.value)}
          ></input>
        </label>
        <label>
          End
          <input
            type="date"
            value={reportEndDate}
            onChange={(e) => setReportEndDate(e.target.value)}
          ></input>
        </label>

        <Button role="secondary" onClick={handleOpenFilteredAssetReport}>
          Asset Report
        </Button>

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
