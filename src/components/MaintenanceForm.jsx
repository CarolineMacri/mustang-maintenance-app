//src/components/MaintenanceFrom.jsx

import { useEffect, useState } from 'react';
import Button from './Button';
import styles from './MaintenanceForm.module.css';

function getFormValues(record) {
  return {
    date: record.date ?? '',
    status: record.status ?? '',
    description: record.description ?? '',
    notes: record.notes ?? '',
  };
}

function MaintenanceForm({ record, onCancel, onSave }) {
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
    event.preventDefault;
    onSave({
      ...record,
      ...formValues,
    });
  }

  return (
    <div className={styles.backdrop}>
      <form className={`${styles.modal} chrome`} onSubmit={handleSubmit}>
        <h3>Edit Maintenance Record</h3>
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
          <input
            className={styles.input}
            type="text"
            name="status"
            value={formValues.status}
            onChange={handleChange}
          />
        </label>
        <label className={styles.field}>
          <span>Description</span>
          <input
            className={styles.input}
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </label>
        <label className={styles.field}>
          <span>Notes</span>
          <textarea
            className={styles.textarea}
            name="notes"
            value={formValues.notes}
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
