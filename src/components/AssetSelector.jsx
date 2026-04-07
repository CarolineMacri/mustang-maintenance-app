// src/components/AssetSelector.jsx//
import styles from './AssetSelector.module.css';

function formatAssetLabel(asset) {
  return `${asset.name} - ${asset.make} ${asset.model}`;
}

export default function AssetSelector({
  assets = [],
  selectedAssetId = '',
  onSelectAsset,
}) {
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
          value={hasAssets ? selectedAssetId : ''}
          onChange={(event) => onSelectAsset(Number(event.target.value))}
          disabled={!hasAssets}
        >
          {hasAssets ? (
            assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {formatAssetLabel(asset)}
              </option>
            ))
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
