// src/components/MaintenancePanel.jsx

import { useState } from 'react';
import PanelCard from './PanelCard';
import MaintenanceTable from './MaintenanceTable';
import MaintenanceForm from './MaintenanceForm';
import Button from './Button';

export default function MaintenancePanel({
  records = [],
  selectedAssetId,
  onSaveMaintenance,
  onDeleteMaintenance,
}) {
  const [selectedRecord, setSelectedRecord] = useState(null);

  function handleAdd() {
    setSelectedRecord({
      id: null,
      assetId: selectedAssetId,
      date: '',
      status: '',
      difficulty: '',
      description: '',
      notes: '',
    });
  }
  function handleEdit(record) {
    setSelectedRecord(record);
  }
  function handleCancel() {
    setSelectedRecord(null);
  }

  function handleSave(recordToSave) {
    onSaveMaintenance(recordToSave);
    setSelectedRecord(null);
  }

  return (
    <PanelCard>
      <PanelCard.Header>
        <h2>Maintenance Records</h2>
        <Button role="primary" icon="➕" onClick={handleAdd}>
          Add Record
        </Button>
      </PanelCard.Header>

      <PanelCard.Body>
        {records.length > 0 ? (
          <MaintenanceTable
            records={records}
            onEdit={handleEdit}
            onDelete={onDeleteMaintenance}
          />
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
