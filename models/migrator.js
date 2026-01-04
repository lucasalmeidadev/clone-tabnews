import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";

const defaultMigrationOption = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function listPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOption,
      dbClient,
    });
    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOption,
      dbClient,
      dryRun: false,
    });
    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migratror = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migratror;
