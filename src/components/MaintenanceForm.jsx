//src/components/MaintenanceFrom.jsx

import { useEffect, useState } from 'react';
import Button from './Button';
import styles from './MaintenanceForm.module.css';

function getFormValues(record) {
  return {
    date: record.date ?? '',
    statusId: record.statusId ?? '',
    difficulty: record.difficulty ?? '',
    description: record.description ?? '',
    notes: record.notes ?? '',
  };
}

function MaintenanceForm({
  record,
  maintenanceStatuses,
  onAddMaintenanceStatus,
  onCancel,
  onSave,
}) {
  const [formValues, setFormValues] = useState(getFormValues(record));

  useEffect(() => {
    setFormValues(getFormValues(record));
  }, [record]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({
      ...record,
      ...formValues,
    });
  }
  async function handleStatusChange(event) {
    const { value } = event.target;
    if (value === '__add_new__') {
      const statusName = window.prompt('New maintenance status');

      if (!statusName?.trim()) {
        return;
      }
      const savedStatus = await onAddMaintenanceStatus(statusName.trim());

      if (savedStatus) {
        setFormValues((currentValues) => ({
          ...currentValues,
          statusId: savedStatus.id,
        }));
      }
      return;
    }
    setFormValues((currentValues) => ({ ...currentValues, statusId: value }));
  }

  return (
    <div className={styles.backdrop}>
      <form className={`${styles.modal} chrome`} onSubmit={handleSubmit}>
        <h3>
          {record.id == null
            ? 'Add Maintenance Record'
            : 'Edit Maintenance Record'}
        </h3>
        <label className={styles.field}>
          <span>Date</span>
          <input
            className={styles.input}
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field}>
          <span>Status</span>
          <select
            className={styles.input}
            name="statusId"
            value={formValues.statusId}
            onChange={handleStatusChange}
          >
            <option value="">Select Value</option>
            {maintenanceStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
            <option value="__add_new__">...add new status</option>
          </select>
        </label>
        <label className={styles.field}>
          <span>Difficulty</span>
          <input
            className={styles.input}
            type="text"
            name="difficulty"
            value={formValues.difficulty}
            onChange={handleChange}
          />
        </label>
        <label className={styles.field}>
          <span>Description</span>
          <input
            className={styles.input}
            type="text"
            name="description"
            value={formValues.description ?? ''}
            onChange={handleChange}
          />
        </label>
        <label className={styles.field}>
          <span>Notes</span>
          <textarea
            className={styles.textarea}
            name="notes"
            value={formValues.notes ?? ''}
            onChange={handleChange}
          />
        </label>

        <div className={styles.actions}>
          <Button role="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" role="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MaintenanceForm;
