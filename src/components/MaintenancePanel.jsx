// src/components/MaintenancePanel.jsx

import { useState } from 'react';
import PanelCard from './PanelCard';
import MaintenanceTable from './MaintenanceTable';
import MaintenanceForm from './MaintenanceForm';

export default function MaintenancePanel({
  records = [],
  onSaveMaintenance = { onSaveMaintenance },
}) {
  const [selectedRecord, setSelectedRecord] = useState(null);

  function handleEdit(record) {
    setSelectedRecord(record);
  }
  function handleCancel() {
    setSelectedRecord(null);
  }

  function handleSave(updatedRecord) {
    alert(
      `Updated maintenance record \n${JSON.stringify(updatedRecord, null, 2)}`,
    );
  }

  return (
    <PanelCard>
      <PanelCard.Header>
        <h2>Maintenance Records</h2>
      </PanelCard.Header>

      <PanelCard.Body>
        {records.length > 0 ? (
          <MaintenanceTable records={records} onEdit={handleEdit} />
        ) : (
          <p>No maintenance records for this asset.</p>
        )}

        {selectedRecord ? (
          <MaintenanceForm
            record={selectedRecord}
            onCancel={handleCancel}
            onSave={onSaveMaintenance}
          />
        ) : null}
      </PanelCard.Body>
    </PanelCard>
  );
}
