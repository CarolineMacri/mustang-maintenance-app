//src/components/MaintenancePanel.jsx

import styles from './MaintenancePanel.module.css';

export default function MaintenancePanel({ records = [] }) {
  return (
    <div className={styles.panel}>
      <h2>Maintenance Records</h2>

      {records.length > 0 ? (
        records.map((record) => (
          <p key={record.id} className={styles.record}>
            {record.description}
          </p>
        ))
      ) : (
        <p className={styles.empty}>No maintenance records for this asset.</p>
      )}
    </div>
  );
}
