// src/App.jsx////

import { useState, useEffect } from 'react';

import AppLayout from './layout/AppLayout';

import './styles/global.css';
import './styles/utilities.css';

function App() {
  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const assetsResponse = await fetch('http://localhost:3001/assets');
        const maintenanceResponse = await fetch(
          'http://localhost:3001/maintenance',
        );

        const assetsData = await assetsResponse.json();
        const maintenanceData = await maintenanceResponse.json();

        const normalizedAssets = assetsData.map((asset) => ({
          ...asset,
          id: Number(asset.id),
        }));

        const normalizedMaintenance = maintenanceData.map((record) => ({
          ...record,
          id: Number(record.id),
          assetId: Number(record.assetId),
        }));

        setAssets(normalizedAssets);
        setMaintenance(normalizedMaintenance);
        setSelectedAssetId(normalizedAssets[0]?.id ?? null);
      } catch (error) {
        alert('could not load asset and maintenance data');
        setAssets([]);
        setMaintenance([]);
        setSelectedAssetId(null);
      }
    }
    loadData();
  }, []);

  const selectedAsset = assets.find(
    (asset) => asset.id === selectedAssetId ?? null,
  );

  const selectedMaintenanceRecords =
    selectedAssetId === null
      ? []
      : maintenance.filter((record) => record.assetId === selectedAssetId);

  async function handleSaveAsset(updatedAsset) {
    try {
      const res = await fetch(
        `http://localhost:3001/assets/${updatedAsset.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAsset),
        },
      );
      if (!res.ok) {
        throw new Error('Save Failed');
      }

      const savedAssetData = await res.json();

      const savedAsset = {
        ...savedAssetData,
        id: Number(savedAssetData.id),
      };

      setAssets((currentAssets) =>
        currentAssets.map((asset) =>
          asset.id === savedAsset.id ? savedAsset : asset,
        ),
      );
    } catch (error) {
      alert('could not save asset');
    }
  }

  async function handleSaveMaintenance(updatedRecord) {
    try {
      const res = await fetch(
        `http://localhost:3001/maintenance/${updatedRecord.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRecord),
        },
      );
      if (!res.ok) {
        throw new Error('Save Failed');
      }

      const savedRecordData = await res.json();

      const savedRecord = {
        ...savedRecordData,
        id: Number(savedRecordData.id),
        assetId: Number(savedRecordData.assetId),
      };

      setMaintenance((currentMaintenance) =>
        currentMaintenance.map((record) =>
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
      onSelectAsset={setSelectedAssetId}
      onSaveAsset={handleSaveAsset}
      onSaveMaintenance={handleSaveMaintenance}
    />
  );
}

export default App;
