import { useEffect, useState } from 'react';
import PanelCard from './PanelCard';
import styles from './AssetPanel.module.css';
import Button from './Button';

const emptyForm = {
  name: '',
  make: '',
  model: '',
  year: '',
  vinSerialNo: '',
  part1: '',
  part2: '',
  part3: '',
  notes: '',
};

function getFormValues(asset) {
  if (!asset) {
    return emptyForm;
  }
  return {
    name: asset.name ?? '',
    make: asset.make ?? '',
    model: asset.model ?? '',
    year: asset.year != null ? String(asset.year) : '',
    vinSerialNo: asset.vinSerialNo ?? '',
    part1: asset.part1 ?? '',
    part2: asset.part2 ?? '',
    part3: asset.part3 ?? '',
    notes: asset.notes ?? '',
  };
}

export default function AssetPanel({ selectedAsset }) {
  const [formValues, setFormValues] = useState(emptyForm);

  useEffect(() => {
    if (!selectedAsset) {
      setFormValues(emptyForm);
      return;
    }

    setFormValues(getFormValues(selectedAsset));
  }, [selectedAsset]);

  const isEmpty = !selectedAsset;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
  }

  function handleCancel() {
    setFormValues(getFormValues(selectedAsset));
  }

  function handleSave() {
    if (!selectedAsset) {
      return;
    }

    const updatedAsset = {
      ...selectedAsset,
      ...formValues,
      year: formValues.year === '' ? null : Number(formValues.year),
    };

    alert(`UpdatedAsset: \n${JSON.stringify(updatedAsset, null, 2)} `);
    onSave?.(updatedAsset);
  }

  return (
    <PanelCard>
      <PanelCard.Header>
        <h2>Asset</h2>
      </PanelCard.Header>

      <PanelCard.Body>
        {isEmpty ? (
          <div className={styles.emptyState}>
            <p>No asset selected</p>
            <p>Select an asset from the header to view it's details</p>
          </div>
        ) : (
          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Make</span>
              <input
                className={styles.input}
                type="text"
                name="make"
                value={formValues.make}
                onChange={handleChange}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Model</span>
              <input
                className={styles.input}
                type="text"
                name="model"
                value={formValues.model}
                onChange={handleChange}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Year</span>
              <input
                className={styles.input}
                type="number"
                name="year"
                value={formValues.year}
                onChange={handleChange}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>VIN / Serial Number</span>
              <input
                className={styles.input}
                type="text"
                name="vinSerialNo"
                value={formValues.vinSerialNo}
                onChange={handleChange}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Part 1</span>
              <input
                className={styles.input}
                type="text"
                name="part1"
                value={formValues.part1}
                onChange={handleChange}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Part 2</span>
              <input
                className={styles.input}
                type="text"
                name="part2"
                value={formValues.part2}
                onChange={handleChange}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Part 3</span>
              <input
                className={styles.input}
                type="text"
                name="part3"
                value={formValues.part3}
                onChange={handleChange}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Notes</span>
              <textarea
                className={styles.textarea}
                name="notes"
                value={formValues.notes}
                onChange={handleChange}
              />
            </label>
          </form>
        )}
      </PanelCard.Body>

      <PanelCard.Footer>
        <Button role="secondary" disabled={isEmpty} onClick={handleCancel}>
          Cancel
        </Button>
        <Button role="primary" disabled={isEmpty} onClick={handleSave}>
          Save
        </Button>
      </PanelCard.Footer>
    </PanelCard>
  );
}
