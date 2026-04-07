import PanelCard from './PanelCard';

export default function AssetPanel({ selectedAsset }) {
  const isEmpty = !selectedAsset;

  return (
    <PanelCard>
      <PanelCard.Header>
        <h2>Asset</h2>
      </PanelCard.Header>

      <PanelCard.Body>
        {isEmpty ? (
          <>
            <p>No asset selected</p>
            <p>Field placeholder</p>
            <p>Field placeholder</p>
          </>
        ) : (
          <>
            <p>{selectedAsset.name}</p>
            <p>
              {selectedAsset.make} {selectedAsset.model}
            </p>
            <p>Field placeholder</p>
          </>
        )}
      </PanelCard.Body>

      <PanelCard.Footer>
        <button type="button">Cancel</button>
        <button type="button">Save</button>
      </PanelCard.Footer>
    </PanelCard>
  );
}
