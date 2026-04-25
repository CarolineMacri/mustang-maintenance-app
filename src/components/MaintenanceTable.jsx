// src/components/MaintenanceTable.jsx

import { useState } from 'react';
import styles from './MaintenanceTable.module.css';
import Button from './Button';

export default function MaintenanceTable({
  records,
  onEdit = (record) => alert('edit ' + record.description),
}) {
  const [expandedRecordId, setExpandedRecordId] = useState(null);

  function handleToggle(recordId) {
    setExpandedRecordId((currentId) =>
      currentId === recordId ? null : recordId,
    );
  }

  return (
    <div className={styles.table} role="table" aria-label="Maintenance records">
      <div className={styles.headerRow} role="row">
        <div role="columnheader">Date</div>
        <div role="columnheader">Status</div>
        <div role="columnheader">Difficulty</div>
        <div role="columnheader">Description</div>
        <div className={styles.arrowHeader} aria-hidden="true"></div>
        <div className={styles.editHeader} aria-hidden="true"></div>
      </div>
      <div className={styles.body}>
        {records.map((record) => {
          const isExpanded = expandedRecordId === record.id;
          const detailsId = `maintenance-notes-${record.id}`;

          return (
            <div key={record.id} className={styles.rowGroup}>
              <div className={styles.recordRow} role="row">
                <div role="cell">{record.date}</div>
                <div role="cell">{record.status}</div>
                <div role="cell">{record.difficulty}</div>
                <div role="cell">{record.description}</div>
                <div role="cell" className={styles.arrowCell}>
                  <Button
                    role="utility"
                    size="icon"
                    icon={isExpanded ? '▲' : '▼'}
                    onClick={() => handleToggle(record.id)}
                  ></Button>
                </div>
                <div role="cell" className={styles.editCell}>
                  <Button
                    role="utility"
                    size="icon"
                    icon="✎"
                    iconOnly
                    onClick={() => onEdit(record)}
                  ></Button>
                </div>
              </div>

              {isExpanded ? (
                <div id={detailsId} className={styles.notesRow} role="row">
                  <div className={styles.notesContent} role="cell">
                    <strong>Notes:</strong>{' '}
                    {record.notes?.trim()
                      ? record.notes
                      : 'No notes available for this record.'}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
