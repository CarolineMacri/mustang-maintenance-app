// src/components/AssetSelector.jsx
import styles from './AssetSelector.module.css';

function formatAssetLabel(asset) {
  return `${asset.name} - ${asset.make} ${asset.model}`;
}

export default function AssetSelector({ assets = [] }) {
  const hasAssets = assets.length > 0;

  return (
    <div className={styles.selector}>
      <label htmlFor="asset-selector" className={styles.label}>
        Current Asset
      </label>

      <div className={styles.controlWrap}>
        <select
          id="asset-selector"
          className={styles.control}
          defaultValue={hasAssets ? formatAssetLabel(assets[0]) : ''}
          disabled={!hasAssets}
        >
          {hasAssets ? (
            assets.map((asset) => {
              const label = formatAssetLabel(asset);

              return (
                <option key={asset.id} value={label}>
                  {label}
                </option>
              );
            })
          ) : (
            <option value="">No assets available</option>
          )}
        </select>

        <span className={styles.arrow} aria-hidden="true">
          ▼
        </span>
      </div>
    </div>
  );
}
