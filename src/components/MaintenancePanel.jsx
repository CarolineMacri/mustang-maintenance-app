// src/components/MaintenancePanel.jsx

import PanelCard from './PanelCard';

export default function MaintenancePanel({ records = [] }) {
  return (
    <PanelCard>
      <PanelCard.Header>
        <h2>Maintenance Records</h2>
      </PanelCard.Header>

      <PanelCard.Body>
        {records.length > 0 ? (
          records.map((record) => <p key={record.id}>{record.description}</p>)
        ) : (
          <p>No maintenance records for this asset.</p>
        )}
      </PanelCard.Body>

      <PanelCard.Footer>
        <button type="button">Cancel</button>
        <button type="button">Save</button>
      </PanelCard.Footer>
    </PanelCard>
  );
}
