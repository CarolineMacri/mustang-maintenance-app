// src/App.jsx////

import { useState, useEffect } from 'react';

import AppLayout from './layout/AppLayout';

import './styles/global.css';
import './styles/utilities.css';

function App() {
  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [isCreatingAsset, setIsCreatingAsset] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const assetsResponse = await fetch('http://localhost:3001/assets');
        const maintenanceResponse = await fetch(
          'http://localhost:3001/maintenance',
        );

        const assetsData = await assetsResponse.json();
        const maintenanceData = await maintenanceResponse.json();

        setAssets(assetsData);
        setMaintenance(maintenanceData);
        setSelectedAssetId(assetsData[0]?.id ?? null);
      } catch (error) {
        alert('could not load asset and maintenance data');
        setAssets([]);
        setMaintenance([]);
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
      : maintenance.filter(
          (record) => String(record.assetId) === String(selectedAssetId),
        );

  function handleAddAsset() {
    setSelectedAssetId(null);
    setIsCreatingAsset(true);
  }

  async function handleSaveAsset(assetToSave) {
    try {
      const isNewAsset = assetToSave.id == null;

      const res = await fetch(
        isNewAsset
          ? 'http://localhost:3001/assets'
          : `http://localhost:3001/assets/${assetToSave.id}`,
        {
          method: isNewAsset ? 'POST' : 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(assetToSave),
        },
      );
      if (!res.ok) {
        throw new Error('Save Failed');
      }

      const savedAssetData = await res.json();

      const savedAsset = {
        ...savedAssetData,
      };

      setAssets((currentAssets) =>
        isNewAsset
          ? [...currentAssets, savedAsset]
          : currentAssets.map((asset) =>
              asset.id === savedAsset.id ? savedAsset : asset,
            ),
      );

      setSelectedAssetId(savedAsset.id);
      setIsCreatingAsset(false);
    } catch (error) {
      alert('could not save asset');
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

  return (
    <AppLayout
      assets={assets}
      selectedAsset={selectedAsset}
      selectedAssetId={selectedAsset ? selectedAssetId : ''}
      selectedMaintenanceRecords={selectedMaintenanceRecords}
      isCreatingAsset={isCreatingAsset}
      onAddAsset={handleAddAsset}
      onSelectAsset={setSelectedAssetId}
      onSaveAsset={handleSaveAsset}
      onSaveMaintenance={handleSaveMaintenance}
    />
  );
}

export default App;
