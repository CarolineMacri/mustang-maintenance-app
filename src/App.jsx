import { useState } from 'react';

import initialMaintenance from './data/maintenance.json';
import initialAssets from './data/assets.json';

import AppLayout from './layout/AppLayout';

import './styles/global.css';
import './styles/utilities.css';

function App() {
  const [assets, setAssets] = useState(initialAssets);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  console.log(assets);
  console.log(maintenance);

  return <AppLayout />;
}

export default App;
