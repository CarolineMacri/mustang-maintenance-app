// src/App.jsx
//
import { useState } from 'react';
import initialMaintenance from './data/maintenance.json';
import initialAssets from './data/assets.json';

import AppLayout from './layout/AppLayout';

import './styles/global.css';
import './styles/utilities.css';

function App() {
  const [assets, setAssets] = useState(initialAssets);
  // const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [selectedAssetId, setSelectedAssetId] = useState(
    initialAssets[0]?.id ?? null,
  );

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
