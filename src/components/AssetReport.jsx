import styles from './AssetReport.module.css';

function AssetReport({ assets, maintenance }) {
  return (
    <main className={styles.reportPage}>
      <section className={styles.reportPanel}>
        <header className={styles.reportHeader}>
          <h1>All Assets Report</h1>
          <p>Generated Report Preview</p>
        </header>

        <div className={styles.reportBody}>
          {assets.map((asset) => {
            const assetMaintenance = maintenance.filter(
              (record) => String(record.assetId) === String(asset.id),
            );

            return (
              <section key={asset.id} className={styles.assetSection}>
                <h2 className={styles.assetHeading}>
                  {asset.asset} {asset.make} {asset.model}
                </h2>

                <table className={styles.reportTable}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetMaintenance.length > 0 ? (
                      assetMaintenance.map((record) => (
                        <tr key={record.id}>
                          <td>{record.date}</td>
                          <td>{record.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No maintenance records</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            );
          })}
        </div>

        <footer className={styles.reportFooter}>
          <span>Total Assets: {assets.length}</span>
        </footer>
      </section>
    </main>
  );
}

export default AssetReport;
