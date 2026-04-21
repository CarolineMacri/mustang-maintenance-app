import { useEffect, useState } from 'react';
import PanelCard from './PanelCard';
import styles from './AssetPanel.module.css';

const emptyForm = {
  name: '',
  make: '',
  model: '',
  part1: '',
  part2: '',
  part3: '',
};

export default function AssetPanel({ selectedAsset }) {
  const [formValues, setFormValues] = useState(emptyForm);

  useEffect(() => {
    if (!selectedAsset) {
      setFormValues(emptyForm);
      return;
    }

    setFormValues({
      name: selectedAsset.name,
      make: selectedAsset.make,
      model: selectedAsset.model,
      part1: selectedAsset.part1,
      part2: selectedAsset.part2,
      part3: selectedAsset.part3,
    });
  }, [selectedAsset]);

  const isEmpty = !selectedAsset;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
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
          </form>
        )}
      </PanelCard.Body>

      <PanelCard.Footer>
        <button type="button" disabled={isEmpty}>
          Cancel
        </button>
        <button type="button" disabled={isEmpty}>
          Save
        </button>
      </PanelCard.Footer>
    </PanelCard>
  );
}
