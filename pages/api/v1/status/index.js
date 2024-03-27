import database from "infra/database.js";

async function getStatus(req, res) {
  const updateAt = new Date().toISOString();
  //A query SHOW mostra dados do servidor do postgres - vamos consultar a propriedade server_version
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue =
    databaseMaxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnections.rows[0].count;
  console.log(databaseOpenedConnectionsValue);
  res.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default getStatus;
