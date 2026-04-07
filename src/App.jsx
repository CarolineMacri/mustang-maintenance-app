// src/App.jsx//

import { useState, useEffect } from 'react';
import initialMaintenance from './data/maintenance.json';
import initialAssets from './data/assets.json';

import AppLayout from './layout/AppLayout';

import './styles/global.css';
import './styles/utilities.css';

function App() {
  const [assets, setAssets] = useState([]);
  // const [assets, setAssets] = useState([]);
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
    assets.find((asset) => asset.id === selectedAssetId) ?? null;

  return (
    <AppLayout
      assets={assets}
      selectedAsset={selectedAsset}
      selectedAssetId={selectedAsset ? selectedAssetId : ''}
      onSelectAsset={setSelectedAssetId}
    />
  );
}

export default App;
