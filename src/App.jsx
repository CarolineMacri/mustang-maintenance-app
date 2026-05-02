// src/App.jsx////

import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import AppLayout from './layout/AppLayout';
import AssetReport from './components/AssetReport';

import './styles/global.css';
import './styles/utilities.css';

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

        setAssets(assetsData);
        setMaintenance(maintenanceData);
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
        alert(
          'Editing existing assets is still using the old handler - Next step!',
        );
        return;
      }

      const savedAsset = await window.mustangApi.addAsset(assetToSave);

      setAssets((currentAssets) => [...currentAssets, savedAsset]);

      setSelectedAssetId(savedAsset.id);
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

      const res = await fetch(
        isNewRecord
          ? `http://localhost:3001/maintenance`
          : `http://localhost:3001/maintenance/${recordToSave.id}`,
        {
          method: isNewRecord ? 'POST' : 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recordToSave),
        },
      );
      if (!res.ok) {
        throw new Error('Save Failed');
      }

      const savedRecord = await res.json();

      setMaintenance((currentMaintenance) =>
        isNewRecord
          ? [...currentMaintenance, savedRecord]
          : currentMaintenance.map((record) =>
              record.id === savedRecord.id ? savedRecord : record,
            ),
      );
    } catch (error) {
      alert('could not save maintenance record');
    }
  }

  async function handleDeleteMaintenance(recordId) {
    const shouldDelete = window.confirm('Delete this maintence record');

    if (!shouldDelete) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/maintenance/${recordId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Delete Failed');
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
      const res = await fetch(`http://localhost:3001/maintenanceStatuses`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name: statusName }),
      });

      if (!res.ok) {
        throw new Error('Save failed');
      }
      const savedStatus = await res.json();

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
