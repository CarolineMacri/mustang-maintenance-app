// src/App.jsx////

import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import AppLayout from './layout/AppLayout';
import AssetReport from './components/AssetReport';

import './styles/global.css';
import './styles/utilities.css';

function getSafeAsset(asset) {
  return {
    ...asset,
    name: asset.name ?? '',
    make: asset.make ?? '',
    model: asset.model ?? '',
    year: asset.year != null ? String(asset.year) : '',
    vinSerialNo: asset.vinSerialNo ?? '',
    part1: asset.part1 ?? '',
    part2: asset.part2 ?? '',
    part3: asset.part3 ?? '',
    notes: asset.notes ?? '',
  };
}

function getSafeMaintenance(record) {
  return {
    ...record,
    date: record.date ?? '',
    statusId: record.statusId ?? '',
    difficulty: record.difficulty ?? '',
    description: record.description ?? '',
    notes: record.notes ?? '',
  };
}

function App() {
  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [maintenanceStatuses, setMaintenanceStatuses] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [isCreatingAsset, setIsCreatingAsset] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const assetsData = await window.mustangApi.getAssets();
        const maintenanceData = await window.mustangApi.getMaintenance();
        const statusesData = await window.mustangApi.getMaintenanceStatuses();

        setAssets(assetsData.map(getSafeAsset));
        setMaintenance(maintenanceData.map(getSafeMaintenance));
        setMaintenanceStatuses(statusesData);
        setSelectedAssetId(assetsData[0]?.id ?? null);
      } catch (error) {
        alert('could not load asset and maintenance data');
        setAssets([]);
        setMaintenance([]);
        setMaintenanceStatuses([]);
        setSelectedAssetId(null);
      }
    }
    loadData();
  }, []);

  const selectedAsset =
    assets.find((asset) => String(asset.id) === String(selectedAssetId)) ??
    null;

  const selectedMaintenanceRecords =
    selectedAssetId === null
      ? []
      : maintenance
          .filter(
            (record) => String(record.assetId) === String(selectedAssetId),
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));

  function handleAddAsset() {
    setSelectedAssetId(null);
    setIsCreatingAsset(true);
  }

  async function handleSaveAsset(assetToSave) {
    try {
      const isNewAsset = assetToSave.id == null;

      if (!isNewAsset) {
        const savedAsset = await window.mustangApi.updateAsset(assetToSave);
        const safeSavedAsset = getSafeAsset(savedAsset);
        setAssets((currentAssets) =>
          currentAssets.map((asset) =>
            String(asset.id) === String(safeSavedAsset.id)
              ? safeSavedAsset
              : asset,
          ),
        );
        setSelectedAssetId(safeSavedAsset.id);
        setIsCreatingAsset(false);
        return;
      }

      const savedAsset = await window.mustangApi.addAsset(assetToSave);
      const safeSavedAsst = getSaveAsset(savedAsset);

      setAssets((currentAssets) => [...currentAssets, safeSavedAsset]);

      setSelectedAssetId(safeSavedAsset.id);
      setIsCreatingAsset(false);
    } catch (error) {
      console.error(error);
      alert('could not save asset');
    }
  }

  async function handleDeleteAsset(assetId) {
    const hasMaintenanceRecords = maintenance.some(
      (record) => String(record.assetId) === String(assetId),
    );

    if (hasMaintenanceRecords) {
      alert('Cannot delete and Asset that has maintenance records');
      return;
    }

    const shouldDelete = window.confirm('Delete this asset?');

    if (!shouldDelete) return;

    try {
      const result = await window.mustangApi.deleteAsset(assetId);

      if (!result.success) {
        throw new Error('Delete failed');
      }

      const nextAssets = assets.filter(
        (asset) => String(asset.id) !== String(assetId),
      );

      setAssets(nextAssets);
      setSelectedAssetId(nextAssets[0]?.id ?? null);
      setIsCreatingAsset(false);
    } catch {
      alert('Could not delete asset');
    }
  }

  async function handleSaveMaintenance(recordToSave) {
    try {
      const isNewRecord = recordToSave.id == null;

      const savedRecord = isNewRecord
        ? await window.mustangApi.addMaintenance(recordToSave)
        : await window.mustangApi.updateMaintenance(recordToSave);

      const safeSavedRecord = getSafeMaintenance(savedRecord);
      setMaintenance((currentMaintenance) =>
        isNewRecord
          ? [...currentMaintenance, safeSavedRecord]
          : currentMaintenance.map((record) =>
              record.id === safeSavedRecord.id ? safeSavedRecord : record,
            ),
      );
    } catch (error) {
      alert('could not save maintenance record', error);
    }
  }

  async function handleDeleteMaintenance(recordId) {
    const shouldDelete = window.confirm('Delete this maintence record');

    if (!shouldDelete) return;

    try {
      const result = await window.mustangApi.deleteMaintenance(recordId);

      if (!result.success) {
        throw new Error('Delete failed');
      }

      setMaintenance((currentMaintenance) =>
        currentMaintenance.filter((record) => record.id !== recordId),
      );
    } catch {
      alert('Could not delete maintenance record');
    }
  }

  async function handleAddMaintenanceStatus(statusName) {
    try {
      const savedStatus =
        await window.mustangApi.addMaintenanceStatus(statusName);

      setMaintenanceStatuses((currentStatuses) => [
        ...currentStatuses,
        savedStatus,
      ]);
      return savedStatus;
    } catch (error) {
      alert('Could not save maintenance statues');
      return null;
    }
  }
  function handleOpenAssetReport({
    statusFilter = 'all',
    startDate = '',
    endDate = '',
  } = {}) {
    const reportWindow = window.open('', '_blank');

    if (!reportWindow) {
      alert('could not open window');
      return;
    }

    const reportDocument = reportWindow.document;

    reportDocument.title = 'Asset Report';

    const root = reportDocument.createElement('div');
    root.id = 'root';
    reportDocument.body.appendChild(root);

    document
      .querySelectorAll('style, link[rel="stylesheet"]')
      .forEach((node) => {
        reportDocument.head.appendChild(node.cloneNode(true));
      });

    createRoot(root).render(
      <AssetReport
        assets={assets}
        maintenance={maintenance}
        maintenanceStatuses={maintenanceStatuses}
        statusFilter={statusFilter}
        startDate={startDate}
        endDate={endDate}
      />,
    );
  }

  return (
    <AppLayout
      assets={assets}
      selectedAsset={selectedAsset}
      selectedAssetId={selectedAsset ? selectedAssetId : ''}
      selectedMaintenanceRecords={selectedMaintenanceRecords}
      maintenanceStatuses={maintenanceStatuses}
      isCreatingAsset={isCreatingAsset}
      onAddAsset={handleAddAsset}
      onSelectAsset={setSelectedAssetId}
      onSaveAsset={handleSaveAsset}
      onDeleteAsset={handleDeleteAsset}
      onSaveMaintenance={handleSaveMaintenance}
      onDeleteMaintenance={handleDeleteMaintenance}
      onAddMaintenanceStatus={handleAddMaintenanceStatus}
      onOpenAssetReport={handleOpenAssetReport}
    />
  );
}

export default App;
