import styles from './AssetReport.module.css';

function AssetReport({
  assets,
  maintenance,
  maintenanceStatuses,
  statusFilter = 'all',
  startDate = '',
  endDate = '',
}) {
  const sortedAssets = [...assets].sort((a, b) => a.make.localeCompare(b.make));
  const title =
    statusFilter.charAt(0).toUpperCase() +
    statusFilter.slice(1) +
    ' Asset Maintenance ' +
    (startDate ? `(${startDate.toString()} to ${endDate.toString()})` : '');
  return (
    <main className={styles.reportPage}>
      <section className={styles.reportPanel}>
        <header className={styles.reportHeader}>
          <h1>{title}</h1>

          <button onClick={() => window.print()}>Print</button>
        </header>

        <div className={styles.reportBody}>
          {sortedAssets.map((asset) => {
            const assetMaintenance = maintenance
              .filter((record) => String(record.assetId) === String(asset.id))
              .filter((record) => {
                const status = maintenanceStatuses.find(
                  (status) => status.id === record.statusId,
                );

                const matchesStatus =
                  statusFilter === 'all' || status?.name === statusFilter;

                const recordDate = new Date(record.date);

                const matchesStartDate =
                  !startDate || recordDate >= new Date(startDate);

                const matchesEndDate =
                  !endDate || recordDate <= new Date(endDate);

                return matchesStatus && matchesStartDate && matchesEndDate;
              })
              .sort((a, b) => new Date(b.date) - new Date(a.date));

            return (
              <section key={asset.id} className={styles.assetSection}>
                <h2 className={styles.assetHeading}>
                  {asset.asset} {asset.make} {asset.model}
                </h2>

                <table className={styles.reportTable}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetMaintenance.length > 0 ? (
                      assetMaintenance.map((record) => (
                        <tr key={record.id}>
                          <td>{record.date}</td>
                          <td>
                            {maintenanceStatuses.find(
                              (status) => status.id === record.statusId,
                            )?.name ?? 'Unknown'}
                          </td>
                          <td>{record.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No maintenance records</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default AssetReport;
